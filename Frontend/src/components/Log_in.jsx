import React, { useState } from 'react'
import axios from "axios"
import loginimage from '../assets/loginimg.png';
import {useNavigate } from 'react-router-dom';
import instagramfont from '../assets/instagramfont.png';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export const Log_in = () => {
  let [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  let [logInData,setLogInData]=useState({
      email:"",
      password:"",
  
  })

  let getValue=(e)=>{
    let inputName=e.target.name;
    let inputValue=e.target.value;
    let oldData={...logInData};
    oldData[inputName]=inputValue;
    setLogInData(oldData);
  }

  let login=(e)=>{
    e.preventDefault();
    setIsLoading(true);
    axios.post("https://instaclone-mmf6.onrender.com/api/login",logInData,{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((res)=>{
      console.log(res);
      setIsLoading(false);
      setLogInData(
        {
        email:"",
        password:"",
        }
      )
      navigate('/home')
    }).catch((err)=>{
      console.log(err);
      alert("error while log in")
    })
  }

  return (
    <div className='bg-black h-screen w-screen flex'>
      <div className=' h-full w-[60%] flex justify-center items-center'>
        <img src={loginimage} alt="" className='w-[80%] h-auto'/>
      </div>

      <div className='h-full w-[40%]'>
        <div className='w-2/3 h-full flex flex-col justify-center items-center'>
        <img src={instagramfont} alt="" className='h-12'/>

        {/* login form */}
        <div className="mt-8">
          <form className="flex w-70 flex-col" onSubmit={login}>
            <input
              type="text"
              placeholder="Phone number, username, or email"
              name='email'
              value={logInData.email}
              onChange={getValue}
              className="w-full rounded border border-neutral-600 bg-neutral-900
                        py-3 px-4 text-sm text-white placeholder:text-neutral-400
                        focus:border-neutral-400 focus:outline-none mb-2"
            />

            <input
              type="password"
              placeholder="Password"
              name='password'
              value={logInData.password}
              onChange={getValue}
              className="w-full rounded border border-neutral-600 bg-neutral-900
                        py-3 px-4 text-sm text-white placeholder:text-neutral-400
                        focus:border-neutral-400 focus:outline-none mb-4"
            />

            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 font-semibold
                        text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer flex justify-center items-center"
            >
              {isLoading? (<AiOutlineLoading3Quarters className='animate-spin text-2xl text-white'/>):'Log In'}
            </button>
          </form>
        </div>

        <a href="" className='text-white mt-5'>Forgot password?</a>
        <div className='flex mt-5'>
          <h3 className='text-white'>Don't have an account?</h3>
          <a href="/signin" className='text-blue-600 translate-x-1.5'>Sign up</a>
        </div>
        </div>
      </div>
    </div>
  )
}



