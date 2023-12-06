import { useState } from 'react'
import {auth,googleprovider} from '../config/firebase.js'
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
export const Auth=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    console.log(auth?.currentUser?.email)
    const signin=async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }catch(err){
            console.error(err);
        }
        
    };
    const signinwithgoogle=async()=>{
        try{
            await signInWithPopup(auth,googleprovider);
        }catch(err){
            console.error(err);
        }
    }
    const logout=async()=>{
        try{
            await signOut(auth);
        }catch(err){
            console.error(err);
        }
    }
    return (
        <div>
            <input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button onClick={signin}>sign in</button>
            <button onClick={signinwithgoogle}>sign in with google</button>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}