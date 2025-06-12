import React, { useState } from 'react'
import { FaHome, FaSearch, FaCompass, FaVideo, FaEnvelope, FaHeart, FaPlusSquare, FaUser, FaRegHeart } from 'react-icons/fa';
import { LiaFacebookMessenger } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { TbSquareRoundedPlus,TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { CgPlayButtonR } from "react-icons/cg";
import { Create } from '../Create';
import { useNavigate } from 'react-router-dom';
import instagramfont from '../../assets/instagramfont.png';
import { MdLogout } from "react-icons/md";
import { logout } from '../../Routes/LikeUnlike';
import { MsgLeft } from '../Message';
import { Search } from '../Search';

export const HomeLeft = ({logedUser,setLogedUser}) => {
  let navigate=useNavigate()
  let [showSearch,setSearchShow]=useState(false)
  let [toShow,setToShow]=useState(false)
  let [component,setComponent]=useState(null)
  const Items = [
    { id: 1, text: "Home", image: <GoHome />, route: '/home' ,cmpnt:null},
    { id: 2, text: "Search", image: <IoIosSearch />, route: '',cmpnt:null },
    { id: 3, text: "Explore", image: <IoCompassOutline />, route: '/home',cmpnt:null },
    // { id: 4, text: "Reels", image: <CgPlayButtonR />, route: '/home',cmpnt:null },
    { id: 5, text: "Messages", image: <LiaFacebookMessenger />, route: '/messages',cmpnt:null },
    { id: 6, text: "Notifications", image: <AiOutlineHeart />, route: '/home',cmpnt:null },
    { id: 7, text: "Create", image: <TbSquareRoundedPlus />, route:'/post',cmpnt:<Create
    toShow={toShow} setToShow={setToShow}
    />},
    {
      id: 8,
      text: "Profile",
      image: (
        <img
          src={logedUser?.profilePicture  || "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"}
          alt="profile"
          className='object-cover h-7 w-7 object-center rounded-full'
        />
      ),
      route: '/profile',
      cmpnt:null
    },
    { id: 9, text: "Logout", image: <MdLogout/>, route: '/home',cmpnt:null },
  ];
  
  const handleClick = (item) => {
    if (item.text === "Create") {
      setToShow(true);
    } else {
      navigate(item.route);
    }
    if(item.text==="Logout"){
      logout(navigate)
    }
    if(item.text==='Search') setSearchShow((prev)=>(!prev))
  };


  return (
    <> 
      <div className='flex items-center h-[15%] pl-6 '>
        {/* <a href="" className='instagram-font-home'>Instagram</a> */}
        <img src={instagramfont} alt="" className='h-8'/>
      </div>
      {Items.map((i,index)=>(
        <div onClick={()=>handleClick(i)} className='flex text-white h-14.5 items-center mx-3 pl-3 hover:bg-zinc-900 rounded-lg cursor-pointer' key={index}>
          <div className='text-3xl mr-4'>{i.image}</div>
          <p>{i.text}</p>
        </div>
        
      ))}
      <Create toShow={toShow} setToShow={setToShow} logedUser={logedUser} />
      {showSearch && (<Search logedUser={logedUser} showSearch={showSearch} setSearchShow={setSearchShow} setLogedUser={setLogedUser}/>)}
    </>
  )
}
