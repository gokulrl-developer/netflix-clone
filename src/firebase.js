
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut} from "firebase/auth";
import {addDoc,getFirestore,collection} from "firebase/firestore"
import { toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signUp=async (name,email,password)=>{
    try{
    const res= await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await addDoc(collection(db,'user'),{
        uid:user.id,
        name,
        email,
        authProvider:'local'
    });
    }catch(error){
    console.log(error);
    toast(error.code);
    }
}
const login=async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);

    }catch(error){
  console.log(error);
  toast(error.code);
    }
}
 const logout=async ()=>{
    signOut(auth);
 }

 export {auth,login,db,signUp,logout};