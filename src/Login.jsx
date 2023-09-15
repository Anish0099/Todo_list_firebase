import React, { useEffect, useState } from 'react'
import { signOut, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, getAuth } from './config/firebase'
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react"
import Log_in_animation from "./log_in_sign_in.json";




export const Login = () => {
    const history = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    
    

    const signUp = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            history('/todolist')


        } catch (err) {
            console.error(err);
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            history('/todolist')
        } catch (err) {
            console.error(err);
        }
    };

    const login = async () => {

        try{
        
        await signInWithEmailAndPassword(auth, email, password);
        history('/todolist')
        }
            catch(err) {
                console.error(err)
            };

    }







    return (
        <div className="App container mx-auto  relative bg-[#1E1E1E] h-screen w-screen" >
            <div className='absolute top-[20%] left-[30%] h-[400px] w-[600px] bg-[#2C2C2C] p-10'>



                <div className='flex flex-col justify-center items-center'>
                   <div className='flex justify-center items-center gap-2'>
                    <Lottie className='w-[100px] mb-2 ml-3' animationData={Log_in_animation}/>
                    <h1 className='text-[35px] text-white mb-5 mr-10'>Registration</h1>
                    </div>

                    <input className="w-[400px] h-[35px] bg-[rgb(217,217,217)] rounded-lg focus:outline-0 font-thin p-2" onChange={(e) => setEmail(e.target.value)} placeholder='Type email..' /><br /><br />

                    <input onChange={(e) => setPassword(e.target.value)} className='w-[400px] h-[35px] bg-[#D9D9D9] rounded-lg focus:outline-0 font-thin p-2' placeholder='Type password' type='password' /><br /><br />
                    <div className='flex justify-center items-center'>
                        <button className='bg-[#1E1E1E] w-[90px] h-[35px] rounded-lg text-white items-center ' onClick={signUp}>Sign up</button>
                        <button className='bg-[#1E1E1E] ml-3 w-[190px] h-[35px] rounded-lg text-white items-center ' onClick={signInWithGoogle}>Sign in with google</button>
                        <button className='bg-[#1E1E1E] ml-3 w-[190px] h-[35px] rounded-lg text-white items-center ' onClick={login}>Log In</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;







