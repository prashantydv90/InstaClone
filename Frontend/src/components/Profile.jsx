import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaHome, FaSearch, FaCompass, FaVideo, FaEnvelope, FaHeart, FaPlusSquare, FaUser, FaRegHeart } from 'react-icons/fa';
import { LiaFacebookMessenger } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { TbSquareRoundedPlus, TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { CgPlayButtonR } from "react-icons/cg";
import { HomeLeft } from './home_page/HomeLeft';
import { BiGrid } from "react-icons/bi";
import { FiBookmark, FiCamera } from "react-icons/fi";
import axios from 'axios';
import { PostShow } from './PostShow';
import { UserList } from './UserList';

// const Items=[
//   {id:1,text:"Home",image:<GoHome/>},
//   {id:2,text:"Search",image:<IoIosSearch/>},
//   {id:3,text:"Explore",image:<IoCompassOutline/>},
//   {id:4,text:"Reels",image:<CgPlayButtonR/>},
//   {id:5,text:"Messages",image:<LiaFacebookMessenger/>},
//   {id:6,text:"Notifications",image:<AiOutlineHeart />},
//   {id:7,text:"Create",image:<TbSquareRoundedPlus/>},
//   {id:8,text:"Profile",image:<img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg" alt=""
//         className='object-cover h-7 w-7 object-center rounded-full'
//         />},
//   {id:9,text:"More",image:<HiMiniBars3/>},

// ]

export const Profile = ({ logedUser, setLogedUser }) => {
  let [showPost, setShowPost] = useState(false);
  let [postdta, setpostdta] = useState({})
  let [showList, setShowList] = useState('')
  console.log(logedUser)
  return (
    <div className='w-auto bg-black flex'>
      <div className=' h-screen w-[18.95%] fixed'>
        <HomeLeft logedUser={logedUser} setLogedUser={setLogedUser} />
      </div>

      <div className='bg-zinc-800 w-[0.05%] ml-[18.95%]' />

      <div className='w-[81%] px-[4%] '>
        <ProfileInfo logedUser={logedUser} setShowList={setShowList} setLogedUser={setLogedUser} />
        <div className='w-full bg-zinc-800 h-[2px]'></div>
        <PostSaved />
        <div className='w-full flex flex-wrap mb-10'>
          <Posts logedUser={logedUser} setShowPost={setShowPost} setpostdta={setpostdta}
          />

        </div>

      </div>
      {showPost && <PostShow postdta={postdta} setViewComment={setShowPost}
        logedUser={logedUser} setLogedUser={setLogedUser} />}
      {showList && <UserList showList={showList} user={logedUser} setShowList={setShowList} logedUser={logedUser}
        setLogedUser={setLogedUser} />}
    </div>

  )
}



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


const ProfileInfo = ({ logedUser, setShowList, setLogedUser }) => {
  const [imgEdit, setImgEdit] = useState(false)
  const [profileEdit, setProfileEdit] = useState(false)
  let [isLoading, setIsLoading] = useState(false);
  return (
    <div className=' w-full flex py-8 items-center'>
      <div className='w-32/100 h-auto  flex items-center justify-center '  >
        {isLoading ? (
          <div className=" flex items-center justify-center rounded-full bg-white w-40 h-40">
            <AiOutlineLoading3Quarters className="animate-spin text-black text-3xl" />
          </div>
        ):
        (
        <img src={logedUser?.profilePicture || "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"} alt="" className='w-40 h-40 rounded-full object-cover object-center cursor-pointer' onClick={() => setImgEdit(true)} />
        )
        }
      </div>
      {imgEdit && <Editphoto imgEdit={imgEdit} setImgEdit={setImgEdit} logedUser={logedUser} setLogedUser={setLogedUser} isLoading={isLoading} setIsLoading={setIsLoading} />}
      <div className='flex flex-col justify-center h-full'>
        <div className='flex'>
          <h1 className='text-white text-[19px] mr-4'>{logedUser.username}</h1>
          <button className=' text-white bg-zinc-700 text-[15px] px-3 py-1.5 rounded-lg cursor-pointer'
            onClick={() => setProfileEdit(true)}
          >Edit Profile</button>
          {profileEdit && <Editprofile setProfileEdit={setProfileEdit} setLogedUser={setLogedUser} />}
        </div>

        <div className='flex text-white mt-5'>
          <div className='mr-8'>{logedUser.posts.length} posts</div>
          <div className='mr-8 cursor-pointer' onClick={() => setShowList('Followers')}>{logedUser.followers.length} followers</div>
          <div className='cursor-pointer' onClick={() => setShowList('Following')}>{logedUser.following.length} following</div>

        </div>
        <div className='text-white pt-6 leading-tight'>
          <div className='leading-tight'>
            {logedUser.name}
          </div>
          <div className='text-[14px]'>
            {logedUser.bio}
          </div>
        </div>

      </div>
    </div>
  )
}

const PostSaved = () => {
  return (
    <div className='w-full h-12  text-white flex items-center justify-center'>
      <a href="" className='flex items-center text-[13px]'>
        <BiGrid className='mr-1' />
        POSTS
      </a>
      <a href="" className='flex items-center ml-15 text-[13px]'>
        <FiBookmark className='mr-1 ' />
        SAVED
      </a>
    </div>
  )
}

const Posts = ({ logedUser, setShowPost, setpostdta }) => {
  let [postData, setPostData] = useState([])
  useEffect(() => {
    axios.get("http://localhost:1111/api/userpost/all", {
      withCredentials: true
    }).then((res) => {
      // console.log(res);
      setPostData(res.data.posts);
      // console.log(`postdata: ${res.data.posts}`)


    }).catch((err) => {
      console.log(err);
      alert("error while fetching data")
    })
  }, [])
  return (
    <>
      {
        postData && postData.length > 0 ? (postData.map((post, index) => (
          <div key={index} className='w-[32.83%] h-100  mr-[4px] mb-[4px] cursor-pointer'
            onClick={() => { setShowPost(true); setpostdta(post) }}>

            <img src={post.image} alt=""
              className='object-cover h-100 w-full object-center'
            />
          </div>
        ))) : (
          <div className=' h-79 w-full mr-[4px] mb-[4px] text-white flex flex-col justify-center items-center'>
            <div className='p-4 text-4xl outline-2 outline-white rounded-full'><FiCamera /></div>
            <div className='text-3xl font-extrabold mt-8'>No Posts Yet</div>
          </div>
        )
      }
    </>
  )
}


// const Editphoto=({imgEdit,setImgEdit,logedUser})=>{
//   let [editedData,setEditedData]=useState(
//     {
//       bio:logedUser?.bio,
//       profilePicture:logedUser?.profilePicture
//     }
//   )
//   const fileInputRef=useRef(null);

//   const handleClick=()=>{
//     fileInputRef.current.click()
//   }

//   const handleFileChange=(e)=>{
//     const file=e.target.files[0];
//     const oldData={...editedData}
//     setEditedData((prev) => ({
//       ...prev,
//       profilePicture: file
//     }));
//     setEditedData(oldData);
//     console.log(file);
//     updateImage(file);
//   }

//   const updateImage=(form)=>{
//     const formData = new FormData();
//     formData.append("profilePicture",form);
//     formData.append("bio", editedData.bio);
//     axios.post("http://localhost:1111/api/profile/edit",formData,{
//       headers:{
//         'Content-Type':'multipart/form-data'
//       },
//       withCredentials:true
//     }).then((res)=>{
//       console.log("i am inside backend")  
//       console.log(res);
//       alert("profile updated");
//       // setEditedData=(
//       //   {
//       //     profilePicture:"",
//       //     bio:""
//       //   }
//       // )
//     }).catch((err)=>{
//       console.log(err)
//       alert("error while updating")
//     })
//   }

//   return(
//     <div className='fixed inset-0 z-40 flex items-center justify-center'>
//       <div className='fixed inset-0 z-50 bg-black/70' onClick={()=>setImgEdit(false)} ></div>
//       <div className='z-60 w-32/100 h-4/10 bg-zinc-800 rounded-2xl'>
//         <div className='w-full h-35/100 flex justify-center items-center text-white text-[20px]'>Change Profile Photo</div>
//         <div className='w-full h-65/100 flex flex-col'>
//           <input type="file"
//           accept='image/*'
//           ref={fileInputRef}
//           className='hidden'
//           onChange={handleFileChange}
//           />
//           <button className='flex-1 w-full border-t border-zinc-700 font-bold text-blue-700 text-[14px] cursor-pointer' onClick={handleClick}>Upload Photo</button>
//           <button className='flex-1 w-full border-t border-zinc-700 font-bold text-red-700 text-[14px] cursor-pointer'>Remove Current Photo</button>
//           <button className='flex-1 w-full border-t border-zinc-700 font-bold text-white text-[14px] cursor-pointer' onClick={()=>setImgEdit(false)}>Cancel</button>
//         </div>


//       </div>
//     </div>
//   )
// }




// const Editphoto = ({ imgEdit, setImgEdit, logedUser }) => {
//   const [editedData, setEditedData] = useState({
//     bio: logedUser?.bio || "",
//     profilePicture: logedUser?.profilePicture || ""
//   });
//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setEditedData((prev) => ({
//       ...prev,
//       profilePicture: file
//     }));

//     // Trigger upload immediately
//     updateImage(file);
//   };

//   const updateImage = (file) => {
//     const formData = new FormData();
//     formData.append("profilePicture", file);
//     formData.append("bio", editedData.bio);

//     axios.post("http://localhost:1111/api/profile/edit", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       },
//       withCredentials: true
//     }).then((res) => {
//       console.log("✅ Uploaded:", res.data);
//       setImgEdit(false);
//       alert("Profile updated");

//     }).catch((err) => {
//       console.error("❌ Upload failed:", err);
//       alert("Error uploading photo");
//     });
//   };

//   return (
//     <div className='fixed inset-0 z-40 flex items-center justify-center'>
//       <div className='fixed inset-0 z-50 bg-black/70' onClick={() => setImgEdit(false)}></div>
//       <div className='z-60 w-32/100 h-4/10 bg-zinc-800 rounded-2xl'>
//         <div className='w-full h-35/100 flex justify-center items-center text-white text-[20px]'>Change Profile Photo</div>
//         <div className='w-full h-65/100 flex flex-col'>
//           <input
//             type="file"
//             accept='image/*'
//             ref={fileInputRef}
//             className='hidden'
//             onChange={handleFileChange}
//           />
//           <button className='flex-1 w-full border-t border-zinc-700 font-bold text-blue-700 text-[14px] cursor-pointer' onClick={handleClick}>Upload Photo</button>
//           <button className='flex-1 w-full border-t border-zinc-700 font-bold text-red-700 text-[14px] cursor-pointer'>Remove Current Photo</button>
//           <button className='flex-1 w-full border-t border-zinc-700 font-bold text-white text-[14px] cursor-pointer' onClick={() => setImgEdit(false)}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };



const Editphoto = ({ imgEdit, setImgEdit, logedUser, setLogedUser, setIsLoading }) => {
  let [editedData, setEditedData] = useState(
    {
      bio: "",
      profilePicture: ""
    }
  )
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // const oldData={...editedData}
    // oldData[profilePicture]=file;
    // setEditedData(oldData);
    console.log("newediteddata")
    console.log(editedData)
    console.log(file);
    updateImage(file);
  }

  const updateImage = (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("bio", editedData.bio);
    setImgEdit(false)
    setIsLoading(true);
    axios.post("http://localhost:1111/api/profile/edit", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }).then((res) => {
      setIsLoading(false);
      console.log("i am inside backend")
      setLogedUser(res.data.user)
      alert("Photo Updated")
      console.log(res);
    }).catch((err) => {
      console.log(err)
      alert("error while updating")
    })
  }

  const removePhoto = () => {
    setIsLoading(true);
    setImgEdit(false)
    axios.post('http://localhost:1111/api/profile/delPhoto', null, { withCredentials: true }).then((res) => {
      setIsLoading(false)
      setLogedUser(res.data.user)
      alert('Photo removed')

    }).catch((err) => {
      console.log(err);
      alert('error while deleting photo')
    })
  }

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center'>
      <div className='fixed inset-0 z-50 bg-black/70' onClick={() => setImgEdit(false)} ></div>
      <div className='z-60 w-32/100 h-4/10 bg-zinc-800 rounded-2xl'>
        <div className='w-full h-35/100 flex justify-center items-center text-white text-[20px]'>Change Profile Photo</div>
        <div className='w-full h-65/100 flex flex-col'>
          <input type="file"
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden' />
          <button className='flex-1 w-full border-t border-zinc-700 font-bold text-blue-700 text-[14px] cursor-pointer' onClick={handleClick}>Upload Photo</button>
          <button className='flex-1 w-full border-t border-zinc-700 font-bold text-red-700 text-[14px] cursor-pointer' onClick={removePhoto}>Remove Current Photo</button>
          <button className='flex-1 w-full border-t border-zinc-700 font-bold text-white text-[14px] cursor-pointer' onClick={() => setImgEdit(false)}>Cancel</button>
        </div>


      </div>
    </div>
  )
}



const Editprofile = ({ setProfileEdit, setLogedUser }) => {
  let [profileData, setProfileData] = useState({
    bio: "",
    profilePicture: null
  })
  let [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    let inputname = e.target.name;
    let inputvalue = e.target.value;
    let oldData = { ...profileData }
    if (inputname == "profilePicture") {
      let file = e.target.files[0];
      // console.log(file)
      oldData[inputname] = file;
    }
    else {
      oldData[inputname] = inputvalue;
    }
    setProfileData(oldData);
  }

  const updateData = (e) => {
    e.preventDefault()
    setIsLoading(true);
    axios.post("http://localhost:1111/api/profile/edit", profileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }).then((res => {
      setIsLoading(false);
      setLogedUser(res.data.user)
      alert("profile Updated")
      setProfileEdit(false)
    })).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <div className='fixed inset-0 bg-black/70 z-40 flex justify-end text-white'
        onClick={() => setProfileEdit(false)}
      >
        <RxCross2 className='font-bold text-3xl mr-3 mt-3 cursor-pointer' />
      </div>
      <div className='flex flex-col z-50  w-1/3 bg-zinc-800 rounded-2xl justify-center items-center text-white'>
        <div className='text-white w-full h-11 flex justify-center items-center text-[18px] border-b font-bold border-zinc-600'>
          Edit Profile
        </div>
        <form action="" className='w-9/10 h-9/10 flex flex-col py-4'>

          <label htmlFor="" className='font-bold mb-1'>Photo</label>
          <input
            type="file"
            name='profilePicture'
            onChange={handleChange}
            className='border-1 border-zinc-600 mb-4 px-2 rounded-md ' />

          <label htmlFor="" className='font-bold mb-1'>Name</label>
          <input type="text"
            name='name'
            onChange={handleChange}
            className='border-1 border-zinc-600 mb-4 px-2 rounded-md h-10'
          />

          <label htmlFor="" className='font-bold mb-1'>Username</label>
          <input type="text"
            name='username'
            onChange={handleChange}
            className='border-1 border-zinc-600 mb-4 h-10 px-2 rounded-md '
          />

          <label htmlFor="" className='font-bold mb-1'>Bio</label>
          <textarea
            name="bio"
            id=""
            onChange={handleChange}
            className='w-full h-16 border-1 border-zinc-600  overflow-y-auto p-1 rounded-md'></textarea>

          <div className='w-full flex justify-center items-center mt-9'>
            <button className='bg-blue-700 w-90/100 h-10 rounded-[8px] flex justify-center items-center cursor-pointer' onClick={updateData}>
              {isLoading ? (<AiOutlineLoading3Quarters className='animate-spin text-2xl font-bold' />) : ('Submit')}</button>
          </div>

        </form>

      </div>
    </div>
  )
}