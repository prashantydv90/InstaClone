import React, { useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { GoFileMedia } from "react-icons/go";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Create = ({toShow,setToShow,logedUser}) => {
  let navigate=useNavigate()
  let [postData,setPostData]=useState({
    image:null,
    caption:''
  })
  let [isNext,setIsNext]=useState(false)
  let [isUpload,setIsUpload]=useState(false)
  let [preview,setPreview]=useState(null)
  const fileref=useRef(null);
  const filehandle=()=>{
    fileref.current.click()
  }
  let file;
  const changehandle=(e)=>{
    console.log(e)
    let inputName=e.target.name;
    let inputValue=e.target.value;
    
    setIsUpload(true)
    
    let oldData={...postData};
    if(inputName=="image"){
      file=e.target.files[0]
      oldData[inputName]=file
      setPreview(URL.createObjectURL(file));
      console.log(`here is the file:`)
      console.log(file)
    }
    else{
      oldData[inputName]=inputValue
    }
    setPostData(oldData)
    console.log("postData:")
    console.log(postData);
    
  }

  let [isLoading,setIsLoading]=useState(false)
  const uploadingPost=()=>{
    setIsLoading(true);
    axios.post("http://localhost:1111/api/addpost",postData,{
      headers:{
        'Content-Type':'multipart/form-data'
      },
      withCredentials:true
    }).then((res)=>{
      console.log("Enter uploading function")
      console.log(res);
      setIsLoading(false);
      alert("Post uploaded")
      setToShow(false)
    }).catch((err)=>{
      console.log(err)
      alert("error while posting")
    })
    console.log('uploading complete')

  }


  return (
    <>
    {toShow && 
    <div className='fixed inset-0 flex justify-center items-center'>
      
      <div className='fixed inset-0 bg-black/70 z-40 text-white justify-end flex' 
      onClick={() => setToShow(false)}>
        <RxCross2 className='font-bold text-3xl mr-3 mt-3 cursor-pointer'/>
        
      </div>
      {!isNext &&
        <div className='h-7/10 w-25/100 bg-zinc-800 z-40 rounded-2xl'>

          {!isUpload && <UploadPost
          fileref={fileref}
          filehandle={filehandle}
          changehandle={changehandle}
          />}
          
          {isUpload && <PreviewPost 
          preview={preview} 
          setIsNext={setIsNext} 
          setIsUpload={setIsUpload}
          />}

        </div>
      }
      {isNext && <AddCaption 
      preview={preview} 
      setIsNext={setIsNext} 
      changehandle={changehandle}
      uploadingPost={uploadingPost}
      logedUser={logedUser}
      isLoading={isLoading}
      />}
    </div>
  }
  </>
  )
}

const UploadPost=({fileref,filehandle,changehandle})=>{
  return(
    <>
      <div className='h-10/100 text-white border-b-1 border-zinc-600 flex justify-center items-center'>Create new Post</div>
      <div className='flex flex-col items-center justify-center w-full h-90/100 bg-amber-'>
        <GoFileMedia className='text-white size-15 mb-4'/>
        <h1 className='text-white mb-4 text-xl'>Drag photos and videos here</h1>
        <input 
        type="file" 
        name="image"
        ref={fileref}
        onChange={changehandle}
        className='hidden'/>
        <button className='px-4 py-1 bg-blue-700 text-white rounded-[8px] cursor-pointer hover:bg-blue-500' onClick={filehandle}>Select from computer</button>
      </div>
    </>
  )
}

const PreviewPost=({preview,setIsNext,setIsUpload})=>{
  
  return(
    <>
      <div className='h-10/100 text-white border-b-1 border-zinc-600 flex justify-center items-center w-full'>
        <BiArrowBack className='size-7 cursor-pointer' onClick={()=>setIsUpload(false)}/>
        <h1 className='mx-14'>Create new post</h1>
        <div className='text-blue-700 cursor-pointer' onClick={()=>setIsNext(true)}>Next</div>
      </div>
      <div className='flex flex-col items-center justify-center w-full h-90/100  '>
        <img src={preview} alt="" className='object-cover h-full w-full rounded-b-2xl '/>
      </div>
    </>
  )
}

const AddCaption=({preview,setIsNext,changehandle,uploadingPost,logedUser,isLoading})=>{
  
  return(
    
    <div className='h-7/10 w-50/100 bg-zinc-800 z-40 rounded-2xl'>
      <div className='h-10/100 text-white border-b-1 border-zinc-600 flex justify-center items-center w-full'>
        <BiArrowBack className='size-7 cursor-pointer' onClick={()=>setIsNext(false)} />
        <h1 className='mx-53'>Create new post</h1>
        <div className='text-blue-700 cursor-pointer'
        onClick={uploadingPost}
        >{isLoading? (<AiOutlineLoading3Quarters className='animate-spin'/>) :('Share') }</div>
      </div>
      <div className='w-full h-90/100 flex'>
        <div className='flex flex-col items-center justify-center w-1/2 h-full'>
          <img src={preview} alt="" className='object-cover h-full w-full rounded-bl-2xl '/>
        </div>
        <div className='h-full w-1/2 px-4'>
          <div className=' h-2/10 flex items-center'>
            <img src={logedUser?.profilePicture || "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"} alt="" className='w-10 h-10 rounded-full object-cover object-center'/>
            <h1 className='text-white ml-2'>{logedUser.username}</h1>
          </div>
          <div className=' h-75/100'>
            <textarea name="caption" id="" 
            className='h-full w-full text-white outline-none overflow-y-auto resize-none'
            placeholder='Write your caption here...'
            onChange={changehandle}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

