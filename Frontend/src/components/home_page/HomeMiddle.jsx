import React, { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { Await, useNavigate } from "react-router-dom";
import { PostShow } from "../PostShow";
import {
  addCmnt,
  delLike,
  getLike,
  handleLike,
  handleUnlike,
  inputHandle,
} from "../../Routes/LikeUnlike";
import { UserList } from "../UserList";
import { LikeList } from "../LikeList";
import { LuDot } from "react-icons/lu";

export const HomeMiddle = ({ logedUser ,setLogedUser}) => {
  let [postdta, setpostdta] = useState({});
  let [viewComment, setViewComment] = useState(false);
  let [showList,setShowList]=useState('');
  let [postdet,setpostdet]=useState({})

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mt-5">
        <HomePost
          logedUser={logedUser}
          setViewComment={setViewComment}
          setpostdta={setpostdta}
          setpostdet={setpostdet}
          setShowList={setShowList}
        />
      </div>
      {viewComment && (
        <PostShow
          setViewComment={setViewComment}
          postdta={postdta}
          logedUser={logedUser}
          setpostdta={setpostdta}
          setLogedUser={setLogedUser}
        />
      )}
      {showList && (<LikeList logedUser={logedUser} setLogedUser={setLogedUser} showList={showList} setShowList={setShowList} user={postdet}/>)}
    </>
  );
};

const HomeTop = () => {
  return (
    <div
      className=" flex w-full h-[23%] overflow-x-auto scrollbar-hidden
"
    >
      <Story />
    </div>
  );
};

const Story = () => {
  return (
    <a
      href=""
      className="w-21  flex flex-col items-center justify-center flex-shrink-0"
    >
      <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] rounded-full w-17 h-17 flex items-center justify-center">
        <img
          src="https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740"
          alt=""
          className="w-15.5 h-15.5 rounded-full object-cover object-center"
        />
      </div>

      <h6 className="text-white w-19 truncate overflow-hidden whitespace-nowrap text-[12px]">
        the_prashantydv
      </h6>
    </a>
  );
};

const HomePost = ({ setViewComment, setpostdta, logedUser,setpostdet ,setShowList}) => {
  let [cmnt, setCmnt] = useState({
    text: "",
  });
  let initialcmnt = {
    text: "",
  };
  let temp = false;
  let [postData, setPostData] = useState([]);
  let [authors, setAuthors] = useState({});
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


  useEffect(() => {
    axios
      .get("http://localhost:1111/api/all", {
        withCredentials: true,
      })
      .then(async (res) => {
        console.log(res);
        const posts = res.data.posts;
        setPostData(posts);
        console.log("postdata:", res.data.posts);
      })
      .catch((err) => {
        console.log(err);
        // alert("Session expired relogin")
        // navigate('/login')
      });
  },[cmnt]);
  console.log("date:",postData.map(p => ({ id: p._id, createdAt: p.createdAt })));
  const navigate=useNavigate()


  return (
    <>
      {postData.map((post, index) => (
        <div key={index} className="w-[70%] overflow-y-auto">
          {temp && <PostShow />}
          <div className="h-13 flex items-center pl-1">
            <div className="w-1/2">
              <div  className="flex items-center h-13 " >
                <img
                  src={post.author?.profilePicture}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover object-center cursor-pointer"
                  onClick={() => {post.author._id===logedUser._id ? navigate('/profile'):navigate(`/profile/${post.author?.username}`, { state: { user:post.author } })}}
                />

                <p className="text-white font-medium ml-2 text-[14px] cursor-pointer"
                onClick={() => {post.author._id===logedUser._id ? navigate('/profile'):navigate(`/profile/${post.author?.username}`, { state: { user:post.author } })}}>
                  {post.author?.username}
                </p>
                <div className="text-zinc-400 font-semibold text-[14px]  flex">
                  <div className="items-center flex font-bold"><LuDot/></div>
                  {getTimeAgo(post.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex justify-end w-1/2 pr-2">
              <a href="" className="text-white">
                <SlOptions />
              </a>
            </div>
          </div>

          <div className="w-full  flex justify-center items-center border-1 border-zinc-800">
            <img
              src={post.image}
              alt=""
              className="object-cover w-3/4 max-h-150 object-center"
            />
          </div>

          <div className="flex">
            <div
              className="w-1/2 h-13  flex items-center text-white text-2xl pl-2"
            >
              {!post.likes.some((user)=>user._id===logedUser?._id) && (
                <FaRegHeart
                  className="cursor-pointer mr-5 hover:text-zinc-400"
                  onClick={() => {
                    getLike(post._id), handleLike(post._id,setPostData,logedUser);
                  }}
                />
              )}
              {post.likes.some((user)=>user._id===logedUser?._id) && (
                <FaHeart
                  className="cursor-pointer mr-5 text-red-600"
                  onClick={() => {
                    delLike(post._id), handleUnlike(post._id,setPostData,logedUser);
                  }}
                />
              )}

              <div
                className="hover:text-zinc-400 cursor-pointer"
                onClick={() => {
                  setViewComment(true);
                  setpostdta(post);
                }}
              >
                <FaRegComment />
              </div>
            </div>
            <div className="w-1/2 h-13   flex items-center justify-end text-white text-2xl pr-2">
              <FiBookmark className="hover:text-zinc-400 cursor-pointer" />
            </div>
          </div>

          <div className="w-full  pl-2 text-white text-[14.5px] pb-3">
            <div onClick={()=>{setShowList('Likes');setpostdet(post)}} className="cursor-pointer">{post.likes.length} likes</div>
            <div className="flex w-full pr-2 leading-tight my-1">
              <p className="leading-tight">
                <span className="mr-1 font-medium">
                  {post.author?.username}{" "}
                </span>
                <span className="text-zinc-100 text-[14px]">
                  {post.caption}{" "}
                </span>
              </p>
            </div>

            <div
              className="text-zinc-400 cursor-pointer"
              onClick={() => {
                setViewComment(true);
                setpostdta(post);
              }}
            >
              View {post.comments.length} comment
            </div>

            <form
              action=""
              className="flex mt-1"
              onSubmit={(e) => {
                e.preventDefault();
                addCmnt(post._id, cmnt, initialcmnt, setCmnt);
              }}
            >
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-90/100 border-none outline-none placeholder-zinc-400 overflow-y-auto resize-none "
                name="text"
                value={cmnt.text}
                onChange={(e) => {
                  inputHandle(e, cmnt, setCmnt);
                }}
                autoComplete="off"
              />
              <button type="submit" className="cursor-pointer text-blue-700">
                Post
              </button>
            </form>
          </div>
          <div className="w-full bg-zinc-800 h-[1px] mt-3"></div>
        </div>
      ))}
    </>
  );
};
