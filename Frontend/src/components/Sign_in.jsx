import React, { useState } from 'react'
import axios from "axios"
import loginimage from '../assets/loginimg.png';
import { useNavigate } from 'react-router-dom';
import instagramfont from '../assets/instagramfont.png';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export const Sign_in = () => {
  let [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  let [signInData,setSignInData]=useState({
    email:"",
    username:"",
    password:"",
    name:""

  })

  let getValue=(e)=>{
    let inputName=e.target.name;
    let inputValue=e.target.value;
    let oldData={...signInData};
    oldData[inputName]=inputValue;
    setSignInData(oldData);
  }

  const saveData=(e)=>{
    e.preventDefault();
    setIsLoading(true);
    axios.post("https://instaclone-mmf6.onrender.com/api/register",signInData).then((res)=>{
      console.log(res.data);
      setIsLoading(false);
      setSignInData(
        {
          email:"",
          username:"",
          password:"",
          name:""
        }
      )
      navigate('/login');

    })
    .catch((err)=>{
      console.log(err);
      alert("error while sign in")
    })
  }
  
  return (
    <div className='bg-black h-screen w-screen flex'>
      <div className=' h-full w-[60%] flex justify-center items-center'>
        <img src={loginimage} alt="" className='w-[80%] h-auto'/>
      </div>

      <div className='h-full w-[40%]'>
        <div className=' w-2/3 h-full flex flex-col justify-center items-center'>
        <img src={instagramfont} alt="" className='h-12'/>
        <p className='text-white mt-4'>Sign up to see photos and videos</p>
        <p className='text-white'>from your friends</p>

        {/* signin form */}
        <div className="mt-4">
          <form className="flex w-70 flex-col" onSubmit={saveData}>
            <input
              type="text"
              placeholder="Mobile Number or Email"
              name="email"
              value={signInData.email}
              onChange={getValue}
              className="w-full rounded border border-neutral-600 bg-neutral-900
                        py-3 px-4 text-sm text-white placeholder:text-neutral-400
                        focus:border-neutral-400 focus:outline-none mb-2"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={signInData.password}
              onChange={getValue}
              className="w-full rounded border border-neutral-600 bg-neutral-900
                        py-3 px-4 text-sm text-white placeholder:text-neutral-400
                        focus:border-neutral-400 focus:outline-none mb-2"
            />

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={signInData.name}
              onChange={getValue}
              className="w-full rounded border border-neutral-600 bg-neutral-900
                        py-3 px-4 text-sm text-white placeholder:text-neutral-400
                        focus:border-neutral-400 focus:outline-none mb-2"
            />

            <input
              type="text"
              placeholder="Username"
              name="username"
              value={signInData.username}
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
              {isLoading? (<AiOutlineLoading3Quarters className='animate-spin text-2xl text-white'/>):
              'Log In'}
            </button>
          </form>
        </div>

          <h3 className='text-white mt-3'>Have an account?</h3>
          <a href="/login" className='text-blue-600'>Log in</a>
    
        </div>
      </div>
    </div>
  )
}
