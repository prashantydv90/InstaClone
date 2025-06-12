import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const TextAreaExample = () => {
  let [temp,settemp]=useState(0) 
  const handleclick=()=>{
    let olddata=temp;
    olddata++
    settemp(olddata);
  }
  useEffect(()=>{
    if (temp >= 100) return; 
    settemp(prev => prev + 1);
  })
  console.log("count",temp)
  return (
    <div className='inset-0 fixed flex-col flex justify-center items-center'>
    <div >
      {temp}
    </div>
    
    {temp==1 ? (<div>hello</div>) : (<div>muh me lelo</div>)}
  
    <button className='bg-amber-300'
    onClick={handleclick}>click me</button>
    </div>
    
  );
};

export default TextAreaExample;
