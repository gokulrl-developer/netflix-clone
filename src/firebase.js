
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut} from "firebase/auth";
import {addDoc,getFirestore,collection} from "firebase/firestore"
import { toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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