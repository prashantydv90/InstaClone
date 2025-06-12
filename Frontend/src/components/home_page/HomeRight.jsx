import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFollower, logout } from "../../Routes/LikeUnlike";
import { MdLogout } from "react-icons/md";

export const HomeRight = ({ suggUser, logedUser, setLogedUser }) => {
  // let [suggUser,setSuggUser]=useState([])
  // useEffect(()=>{
  //   axios.get("http://localhost:1111/api/suggested").then((res)=>{
  //     console.log(res.data.users);
  //     setSuggUser(res.data.users);
  //   }).catch((err)=>{
  //     console.log(err);
  //     alert("error while fetching data")
  //   })
  // },[])
  let [logeduser,setlogeduser]=useState(logedUser);
  const handleclick=(id)=>{
    let isfollowing=logedUser.following.includes(id);
    setLogedUser((prev)=>({
    ...prev,
    following: isfollowing
      ? prev.following.filter((fid) => fid !== id) // remove
      : [...prev.following, id], // add
  })
  
      
    )
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[18%] flex pl-5 items-center">
        <a href="/profile">
          {logedUser.profilePicture ? (
            <img
              src={logedUser.profilePicture}
              alt=""
              className="w-13 h-13 rounded-full object-cover object-center"
            />
          ) : (
            <img
              src="https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
              alt=""
              className="w-13 h-13 rounded-full object-cover object-center"
            />
          )}
          {/* <img src="https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg" alt="" className='w-13 h-13 rounded-full object-cover object-center'/> */}
        </a>
        <div className="ml-3">
          <a href="/profile" className="text-white">
            {logedUser.username}
          </a>
          <h6 className="text-zinc-400">{logedUser.name}</h6>
        </div>
        <div className="justify-end flex-1 flex text-blue-400 hover:text-zinc-50 cursor-pointer text-[14.5px] pr-5"
        onClick={()=>{logout(navigate)}}>
          {/* <MdLogout className="text-white text-5xl pr-5"/> */}
          Sign out
          </div>
        
      </div>

      <div className="pl-5 w-full overflow-y-auto min-h-[82%]">
        <h6 className="text-zinc-400">Suggested for you</h6>

        {suggUser
  .filter(user => !logeduser.following?.includes(user._id))
  .map((user, index) => (<div className="flex items-center my-4 w-full">
            <div
              onClick={() => navigate(`/profile/${user.username}`, { state: { user:user } })}
              className="cursor-pointer"
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt=""
                  className="w-13 h-13 rounded-full object-cover object-center"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                  alt=""
                  className="w-13 h-13 rounded-full object-cover object-center"
                />
              )}

              {/* <img src="https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg" alt="" className='w-13 h-13 rounded-full object-cover object-center'/> */}
            </div>
            <div className="ml-3">
              <div
                onClick={() => navigate(`/profile/${user.username}`, { state: { user } })}
                className="cursor-pointer"
              >
                <h6 className="text-white">{user.username}</h6>
              </div>
              <h6 className="text-zinc-400">{user.name}</h6>
            </div>
            <div className={`${logedUser?.following?.includes(user?._id)?'text-zinc-50':'text-blue-400'} flex-1 text-end pr-6 cursor-pointer text-[14px]`}
            onClick={()=>{getFollower(user?._id);handleclick(user?._id)}}>
              {logedUser?.following?.includes(user?._id)? 'Following':'Follow'}</div>
          </div>
        ))}
      </div>
    </>
  );
};
