import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { addCmnt, delLike, getLike, inputHandle } from "../Routes/LikeUnlike";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LikeList } from "./LikeList";
import { LuDot } from "react-icons/lu";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


export const PostShow = ({ setViewComment, postdta, logedUser,setpostdta ,setLogedUser}) => {
  const navigate=useNavigate()
  let [cmnt, setCmnt] = useState({
    text: "",
  });
  let initialcmnt = {
    text: "",
  };
  let [showList,setShowList]=useState('');
  let [postdet,setpostdet]=useState({})

  let [cmntData, setCmntData] = useState([]);

  const fetchcomments = () => {
    axios
      .post(
        `http://localhost:1111/api/${postdta._id}/comment/all`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log('all comments:',res.data.comments);
        setCmntData(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
        alert("error while fetching comment");
      });
  };

  useEffect(() => {
    fetchcomments();
  }, []);

  const handleLike = async () => {
    try {
      setpostdta((prevData) => ({
      ...prevData,
      likes: [...prevData.likes, logedUser],
    }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      setpostdta((prevData) => ({
      ...prevData,
      likes: prevData.likes.filter((id) => id._id !== logedUser._id),
    }));
    } catch (err) {
      console.log(err);
    }
  };

  console.log("postdta:", postdta);
  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w`;
  };


  return (
    <>
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-black/70 z-40 text-white justify-end flex"
        onClick={() => setViewComment(false)}
      >
        <RxCross2 className="font-bold text-3xl mr-3 mt-3 cursor-pointer" />
      </div>
      <div className="h-9/10 w-auto flex z-50 bg-zinc-900">
        <div className="h-full max-w-140 text-white">
          <img src={postdta.image} alt="" className="h-full object-cover" />
        </div>

        <div className="w-125  h-full flex flex-col">
          {/* userDetails */}
          <div className="w-full h-16 flex items-center px-3">
            <img
              src={
                postdta.author?.profilePicture ||
                "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover object-center"
            />
            <p className="text-white font-medium ml-2 ">
              {postdta.author?.username}
            </p>
            <div className="text-zinc-400 font-semibold text-[14px]  flex">
              <div className="items-center flex font-bold"><LuDot/></div>
              {getTimeAgo(postdta.createdAt)}
            </div>
          </div>

          {/* comments and captions */}
          <div className="w-full overflow-y-auto border-y-1 border-zinc-700 min-h-81 max-h-81">
            {/* Caption */}
            <div className="w-full h-auto flex px-3 py-3 ">
              <img
                src={
                  postdta.author?.profilePicture ||
                  "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                }
                alt=""
                className="w-10 h-10 rounded-full object-cover object-center "
              />
              <div className="ml-2">
                <p className="leading-tight">
                  <span className="text-white">{postdta.author?.username}</span>
                  <span className="text-zinc-300 ml-2 text-[14px]">
                    {postdta.caption}
                  </span>
                </p>
              </div>
            </div>

            {/* comments */}
            <div className="w-full  flex-1 overflow-y-auto">
              {cmntData.map((item, index) => (
                <div className="w-full h-auto  flex px-3 py-3 " key={index}>
                  <img
                    src={
                      item.author?.profilePicture ||
                      "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full object-cover object-center cursor-pointer "
                    onClick={() => {item.author._id===logedUser._id ? navigate('/profile'):navigate(`/profile/${item.author?.username}`, { state: { user:item.author } })}}
                  />
                  <div className="ml-2 flex-1">
                    <div className="leading-tight">
                      <span className="text-white cursor-pointer"
                      onClick={() => {item.author._id===logedUser._id ? navigate('/profile'):navigate(`/profile/${item.author?.username}`, { state: { user:item.author } })}}>
                        {item.author?.username}
                      </span>
                      <span className="text-zinc-300 ml-2 text-[14px]">
                        {item.text}{" "}
                      </span>
                      <div className="text-zinc-400 text-[12px] mt-0.5">
                        {dayjs(item.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* like-comment */}
          <div className="w-full  flex flex-wrap pb-2">
            <div className="w-1/2 h-13  flex items-center text-white text-2xl pl-2">
              {!postdta.likes.some((user)=>user._id===logedUser._id) && (
                <FaRegHeart
                  className="cursor-pointer mr-5 hover:text-zinc-400"
                  onClick={() => {getLike(postdta._id);handleLike()}}
                />
              )}
              {postdta.likes.some((user)=>user._id===logedUser._id) && (
                <FaHeart
                  className="cursor-pointer mr-5 text-red-600"
                  onClick={() => {delLike(postdta._id);handleUnlike()}}
                />
              )}
              <a href="" className="hover:text-zinc-400">
                <FaRegComment />
              </a>
            </div>
            <div className="w-1/2 h-13   flex items-center justify-end text-white text-2xl pr-2">
              <FiBookmark className="hover:text-zinc-400 cursor-pointer" />
            </div>
            <div className="text-white px-3 cursor-pointer" 
            onClick={()=>{setShowList('Likes');setpostdet(postdta)}}
            >{postdta.likes.length} Likes</div>
          </div>

          {/* add a comment */}
          <div className="w-full pl-2 pt-2 pb-3 border-t-1 border-zinc-700">
            <form
              action=""
              className="flex mt-1"
              onSubmit={(e) => {
                e.preventDefault();
                addCmnt(postdta._id, cmnt, initialcmnt, setCmnt, fetchcomments);
              }}
            >
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-90/100 border-none outline-none placeholder-zinc-400 overflow-y-auto resize-none text-white "
                autoComplete="off"
                name="text"
                value={cmnt.text}
                onChange={(e) => {
                  inputHandle(e, cmnt, setCmnt);
                }}
              />
              <button
                type="submit"
                className="cursor-pointer text-blue-700 ml-2"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {showList && (<LikeList logedUser={logedUser} showList={showList} user={postdet} setShowList={setShowList}
    setLogedUser={setLogedUser}/>)}
    </>
  );
};
