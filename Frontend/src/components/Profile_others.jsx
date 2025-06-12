import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaVideo,
  FaEnvelope,
  FaHeart,
  FaPlusSquare,
  FaUser,
  FaRegHeart,
} from "react-icons/fa";
import { LiaFacebookMessenger } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { TbSquareRoundedPlus, TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { CgPlayButtonR } from "react-icons/cg";
import { HomeLeft } from "./home_page/HomeLeft";
import { BiGrid } from "react-icons/bi";
import { FiBookmark, FiCamera } from "react-icons/fi";
import axios from "axios";
import { PostShow } from "./PostShow";
import { useLocation, useNavigate } from "react-router-dom";
import { getFollower } from "../Routes/LikeUnlike";
import { UserList } from "./UserList";

export const ProfileOthers = ({ logedUser ,setLogedUser}) => {
  const location = useLocation();
  const { user } = location.state || {};
  let navigate=useNavigate();
  useEffect(() => {
  if (user?._id === logedUser?._id) {
    navigate('/profile');
  }
  }, [user, logedUser, navigate]);

  const [otherUser, setotheruser] = useState({});
  let [showPost, setShowPost] = useState(false);
  let [postdta, setpostdta] = useState({});
  const [isfollow, setisfollow] = useState(false);
  let [showList,setShowList]=useState('')
  const handleclick = () => {
    // setisfollow((prev) => !prev);
    setotheruser((prev) => {
      const isFollowing = prev.followers.some((f) => f._id === logedUser._id);
      return {
        ...prev,followers: isFollowing? prev.followers.filter((f) => f._id !== logedUser._id): [
              ...prev.followers,
              {
                _id: logedUser._id,
                username: logedUser.username,
                profilePicture: logedUser.profilePicture,
              },
            ],
      };
    });
  };

  useEffect(() => {
    axios
      .get(`https://instaclone-mmf6.onrender.com/api/${user?._id}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setotheruser(res.data.user);
        console.log("otheruser:", res);
      })
      .catch((err) => {
        console.log(err);
        alert("error while fetching otheruser data");
      });
  }, [user, isfollow]);
  return (
    <div className="w-auto bg-black flex">
      <div className=" h-screen w-[18.95%] fixed">
        <HomeLeft logedUser={logedUser} setLogedUser={setLogedUser}/>
      </div>

      <div className="bg-zinc-800 w-[0.05%] ml-[18.95%]" />

      <div className="w-[81%] px-[4%] ">
        <ProfileInfo
          otherUser={otherUser}
          logedUser={logedUser}
          handleclick={handleclick}
          setShowList={setShowList}
        />
        <div className="w-full bg-zinc-800 h-[2px]"></div>
        <PostSaved />
        <div className="w-full flex flex-wrap">
          <Posts
            otherUser={otherUser}
            setShowPost={setShowPost}
            setpostdta={setpostdta}
          />
        </div>
      </div>
      {showPost && (
        <PostShow
          postdta={postdta}
          setViewComment={setShowPost}
          logedUser={logedUser}
          setLogedUser={setLogedUser}
        />
      )}
      {showList && <UserList showList={showList} user={otherUser} setShowList={setShowList} logedUser={logedUser}/>}
    </div>
  );
};

// const ProfileLeft=()=>{
//   return (
//     <>
//       <div className='flex items-center h-[15%] pl-6 '>
//         <a href="" className='instagram-font-home'>Instagram</a>
//       </div>
//       {Items.map(i=>(
//         <div className='flex text-white h-13.5 items-center mx-3 pl-3 hover:bg-zinc-900 rounded-lg cursor-pointer'>
//           <div className='text-3xl mr-4'>{i.image}</div>
//           <p>{i.text}</p>
//         </div>
//       ))}
//     </>
//   )
// }

const ProfileInfo = ({ otherUser, logedUser, handleclick ,setShowList}) => {
  let navigate=useNavigate();
  return (
    <div className=" w-full flex py-8 items-center">
      <div className="w-32/100 h-auto  flex items-center justify-center ">
        <img
          src={
            otherUser?.profilePicture ||
            "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
          }
          alt=""
          className="w-40 h-40 rounded-full object-cover object-center cursor-pointer"
        />
      </div>

      <div className="flex flex-col justify-center h-full">
        <div className="flex">
          <h1 className="text-white text-[19px] mr-4">{otherUser.username}</h1>
          <button
            className={` ${
              otherUser.followers?.some((f) => f._id === logedUser._id)
                ? "bg-zinc-700 w-25 hover:bg-zinc-800"
                : "bg-blue-500 hover:bg-blue-700 w-21"
            } text-white  text-[15px] px-3 py-1.5 rounded-lg cursor-pointer`}
            onClick={() => {
              getFollower(otherUser?._id, handleclick());
            }}
          >
            {otherUser.followers?.some((f) => f._id === logedUser._id)
              ? "Following"
              : "Follow"}
          </button>

          {otherUser.followers?.some((f) => f._id === logedUser._id) && (
            <button className=" w-23 text-white bg-zinc-700 text-[15px] px-3 py-1.5 rounded-lg cursor-pointer ml-3 hover:bg-zinc-800"
            onClick={()=>navigate(`/messages/${otherUser._id}`)}>
              Message
            </button>
          )}
        </div>

        <div className="flex text-white mt-5">
          <div className="mr-8">{otherUser?.posts?.length} posts</div>
          <div className="mr-8 cursor-pointer" onClick={()=>setShowList('Followers')}>{otherUser?.followers?.length} followers</div>
          <div className="cursor-pointer" onClick={()=>setShowList('Following')}>{otherUser?.following?.length} following</div>
        </div>
        <div className="text-white pt-6 leading-tight">
          <div className="leading-tight">{otherUser.name}</div>
          <div className="text-[14px]">{otherUser.bio}</div>
        </div>
      </div>
    </div>
  );
};

const PostSaved = () => {
  return (
    <div className="w-full h-12  text-white flex items-center justify-center">
      <a href="" className="flex items-center text-[13px]">
        <BiGrid className="mr-1" />
        POSTS
      </a>
    </div>
  );
};

const Posts = ({ otherUser, setShowPost, setpostdta }) => {
  return (
    <>
      {otherUser.posts && otherUser.posts.length>0 ? (otherUser.posts?.map((post, index) => (
        <div
          key={index}
          className="w-[32.83%] h-100  mr-[4px] mb-[4px] cursor-pointer"
          onClick={() => {
            setShowPost(true);
            setpostdta(post);
          }}
        >
          <img
            src={post.image}
            alt=""
            className="object-cover h-100 w-full object-center"
          />
        </div>
      ))):(
              <div className=' h-79 w-full mr-[4px] mb-[4px] text-white flex flex-col justify-center items-center'>
                <div className='p-4 text-4xl outline-2 outline-white rounded-full'><FiCamera/></div>
                <div className='text-3xl font-extrabold mt-8'>No Posts Yet</div>
              </div>
            )}
    </>
  );
};
