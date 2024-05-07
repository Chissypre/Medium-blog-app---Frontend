import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID } from "./constant"

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID
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
