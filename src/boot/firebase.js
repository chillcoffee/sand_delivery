import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut   } from "firebase/auth";
import { getDatabase, ref, onValue, update,remove, onChildAdded, onChildChanged,onChildRemoved, set } from 'firebase/database'
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect  } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB3eCNbJTtTfvTLY-5gpocmfAVMP6DgANA",
    authDomain: "sand-delivery-55985.firebaseapp.com",
    databaseURL: "https://sand-delivery-55985-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sand-delivery-55985",
    storageBucket: "sand-delivery-55985.appspot.com",
    messagingSenderId: "540600162344",
    appId: "1:540600162344:web:7dc668d840446fc5993d1d"
  }


const app = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(app)
const firebaseDb = getDatabase()
const provider = new GoogleAuthProvider()
const googleAuth = getAuth()

export { firebaseAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut}
export { firebaseDb, ref, onValue, update, onChildAdded, onChildChanged, onChildRemoved,set, remove }
export { provider, signInWithPopup, googleAuth,signInWithRedirect }


