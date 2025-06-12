import React, { useEffect, useState } from 'react'
import { HomeLeft } from './HomeLeft'
import { HomeRight } from './HomeRight'
import { HomeMiddle } from './HomeMiddle'
import axios from "axios"
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ProfileOthers } from '../Profile_others'


export const Home = ({setLogedUser,logedUser}) => {
  const navigate=useNavigate();
  let [suggUser,setSuggUser]=useState([])
  let [isSU,setisSU]=useState(false)
  
  useEffect(()=>{
    axios.get("http://localhost:1111/api/suggested",{
      withCredentials:true
    }).then((res)=>{
      console.log(res);
      setSuggUser(res.data?.users || []);
      setLogedUser(res.data.loggedUser);
      

    }).catch((err)=>{
      console.log(err);
      alert("Session expired relogin")
      navigate('/login')
    })
  },[])
  return (
    <>
    <div className='flex h-screen w-auto bg-black'>
      <div className=' h-full w-[18.95%]'>
        <HomeLeft  logedUser={logedUser} setLogedUser={setLogedUser}/>
      </div>

      <div className='bg-zinc-800 h-screen w-[0.05%]'/>


      <div className=' min-h-full w-[52%] mr-[1%] overflow-y-auto scrollbar-hidden'>
        <HomeMiddle logedUser={logedUser} setisSU={setisSU} setLogedUser={setLogedUser}/>
      </div>
      <div className='overflow-y-auto w-[28%] '>
        <HomeRight suggUser={suggUser} logedUser={logedUser} setisSU={setisSU} setLogedUser={setLogedUser}/>
        <Routes path="/profiles" element={<ProfileOthers setisSU={setisSU} isSU={isSU} />} />
      </div>
    </div>
    </>
  )
}
