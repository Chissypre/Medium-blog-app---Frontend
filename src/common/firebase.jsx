import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAjDcn0fukG2GtEgRkOXLXO47LZCGZjcSM",
  authDomain: "react-blogwebapp.firebaseapp.com",
  projectId: "react-blogwebapp",
  storageBucket: "react-blogwebapp.appspot.com",
  messagingSenderId: "460084867602",
  appId: "1:460084867602:web:c97c58d828630f72499ecb"
};


const app = initializeApp(firebaseConfig);

//Google auth

const provider =new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result)=>{
        user = result.user
    })
    .catch((err)=>{
        console.log(err)
    })
    return user
}
