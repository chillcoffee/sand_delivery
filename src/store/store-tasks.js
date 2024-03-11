import Vue from 'vue'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import {uid, Notify} from 'quasar'
import { firebaseDb, firebaseAuth, ref, onValue, onChildAdded, onChildChanged,onChildRemoved,set,update, remove } from 'boot/firebase'

const state = {
    tasks: {
    //   'ID1': {
    //     address: 'Home',
    //     name: 'Clear Defend',
    //     product: 'Screensand',
    //     completed: false,
    //     dueDate: '2023/11/17',
    //     dueTime: '10:00'
    //   },
    //   'ID2': {
    //     address: 'ASU',
    //     name: 'Ela Ris Resentes',
    //     product: '3/4 Sand',
    //     completed: false,
    //     dueDate: '2023/11/18',
    //     dueTime: '13:00'      
    //   },
    //   'ID3': {
    //     address: 'CravePure Dampit',
    //     name: 'Ruffa Resentes',
    //     product: 'Mixed',
    //     completed: true,
    //     dueDate: '2023/11/19',
    //     dueTime: '14:30'      
    //   }
    },
    search: '',
    sort: 'name',
    tasksDownloaded: false
    
  }
  
  const mutations = {
    updateTask(state, payload){
      Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state,id){
      Vue.delete(state.tasks, id)
    },
    addTask(state, payload){
      Vue.set(state.tasks,payload.id, payload.task)
    },
    clearTasks(state){
      state.tasks = {}
    },
    setSearch(state, value){
      state.search = value
    },
    setSort(state, value){
      state.sort = value
    },
    setTasksDownloaded(state, value){
      state.tasksDownloaded = value
    }
  }
  
  const actions = {
    updateTask( {dispatch}, payload) {
      dispatch('fbUpdateTask', payload)
    },
    deleteTask({dispatch}, id){
      dispatch('fbDeleteTask', id)
    },
    addTask({dispatch}, task){
      let taskId = uid()
      let payload = {
        id: taskId,
        task: task
      }
      dispatch('fbAddTask', payload)
    },
    setSearch({commit}, value){
      commit('setSearch', value)
    },
    setSort({commit}, value){
      commit('setSort', value)
    },
    fbReadData({commit}){
      let userId = firebaseAuth.currentUser.uid
      //userId = 'BzFJmdbZyBQOK8RhYV4eRKN7n942'
      let userTasks = ref(firebaseDb, 'tasks/'+userId)

      //initial check for data
      if(userTasks){
        onValue(userTasks, snapshot=>{
          commit('setTasksDownloaded', true)
      }, error => {
          if (error){
            console.log('error: line 94', error.message )
              //showErrorMessage('error dito line 93 '+error.message)
              this.$router.replace('/auth').catch(err => {})
          }
      })
      }
      

      onChildAdded(userTasks, (snapshot) =>{
        let task = snapshot.val()
          let payload ={
              id: snapshot.key,
              task: task
          }
          commit('addTask', payload)
      })

      onChildChanged(userTasks, (snapshot) =>{
        let task = snapshot.val()
        let payload ={
            id: snapshot.key,
            updates: task
        }
        commit('updateTask', payload)
      })

      onChildRemoved(userTasks, (snapshot) =>{
        let taskId = snapshot.key
        commit('deleteTask', taskId)
      })
    },
    fbAddTask({}, payload){
      let userId = firebaseAuth.currentUser.uid           
      let taskRef = ref(firebaseDb,'tasks/'+userId+'/'+payload.id)
      set(taskRef, payload.task, error => {
        if (error){
            console.log('error: ', error.message)
            showErrorMessage(error.message)    
        }else{
          Notify.create('Added new delivery!')
        }
      })
      
    },
    fbUpdateTask({}, payload){
      let userId = firebaseAuth.currentUser.uid
      let userTasks = ref(firebaseDb, "tasks/" + userId + "/" + payload.id)
      update(userTasks, payload.updates, error => {
          if (error){
              showErrorMessage(error.message)
          }else{
            let keys = Object.keys(payload.updates)
            if(!(keys.includes('completed') && keys.length ==1)){
              Notify.create('Updated delivery!')
            }
            
          }
      })      
    },
    fbDeleteTask({}, taskId){
      let userId = firebaseAuth.currentUser.uid
      let userTasks = ref(firebaseDb, 'tasks/' + userId + '/' + taskId)
      remove(userTasks, error => {
          if (error){
              showErrorMessage(error.message)
          }else{
            Notify.create('Cancelled delivery!')
          }
      })
    }


  
  }
  
  const getters = {
    tasksSorted: (state) => {
      let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks)

      keysOrdered.sort((a,b) => {
        let taskAProp = state.tasks[a][state.sort].toLowerCase(),
            taskBProp = state.tasks[b][state.sort].toLowerCase()
        if(taskAProp > taskBProp) return 1
        else if (taskAProp < taskBProp) return -1
        else return 0
      })

      keysOrdered.forEach((key) => {
        tasksSorted[key] = state.tasks[key]
      })

      return tasksSorted
    },
    taskFiltered: (state, getters) => {
      let tasksSorted = getters.tasksSorted
      let taskFiltered = {}
      if(state.search){
        //populate empty object
        Object.keys(tasksSorted).forEach(function(key) {
          let task = tasksSorted[key],
            taskNameLower = task.name.toLowerCase(),
            searchLower = state.search.toLowerCase()
          if( taskNameLower.includes(searchLower)){
            taskFiltered[key] = task
          }
        })
        return taskFiltered
      }
      return tasksSorted
    },
    tasksTodo: (state, getters) => {
      let taskFiltered = getters.taskFiltered
      let tasks = {}
      Object.keys(taskFiltered).forEach(function(key) {
        let task = taskFiltered[key]
        if(!task.completed){
          tasks[key]=task
        }
      })
      return tasks
    },
    tasksCompleted: (state, getters) => {
      let taskFiltered = getters.taskFiltered
      let tasks = {}
      Object.keys(taskFiltered).forEach(function(key) {
        let task = taskFiltered[key]
        if(task.completed){
          tasks[key]=task
        }
      })
      return tasks
    }
  }
  
  export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
  
  }