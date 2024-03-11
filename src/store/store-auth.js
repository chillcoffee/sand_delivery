import { firebaseAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut } from 'boot/firebase'
import { LocalStorage,Loading, Notify } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import { signInWithPopup, provider, googleAuth, signInWithRedirect  } from 'boot/firebase'


const state = {
  loggedIn: false
  

}
  
const mutations = {
  setLoggedIn(state, value){
    state.loggedIn = value
  }
}

const actions = {
  registerUser({}, payload){
    Loading.show()
    createUserWithEmailAndPassword(firebaseAuth,payload.email, payload.password)
    .then(response => {
      console.log('response: ', response)
    })
    .catch(error=>{
      showErrorMessage(error.message)
    })
  },
  loginUser({}, payload){
    Loading.show()
    signInWithEmailAndPassword(firebaseAuth,payload.email, payload.password)
    .then(response => {
      //console.log('response: ', response)
    })
    .catch(error=>{
      showErrorMessage("Email and/or password is incorrect.")
    })
  },
  loginGoogleUser({},payload){
    Loading.show()
    signInWithRedirect(googleAuth, provider)
  },
  logoutUser({}, payload){
    console.log('logout')
    signOut(firebaseAuth)
    signOut(googleAuth).then(() => {
      console.log('Sign-out successful.')
    }).catch((error) => {
      console.log('Signout error.')
    })
  },
  handleAuthStateChange({commit, dispatch}){
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user: ', user)
      Loading.hide()
      
      if (user != null) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
        dispatch('tasks/fbReadData',null, { root: true})
      }
      else { //user logs out
        commit('tasks/clearTasks', null, {root: true})
        commit('tasks/setTasksDownloaded', false, {root: true})
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => {})
      }
    })
  }
}

const getters = {
  

}
  
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters

}