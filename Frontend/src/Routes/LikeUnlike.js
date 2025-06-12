import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';



export const getLike=(id)=>{
  axios.get(`https://instaclone-mmf6.onrender.com/api/${id}/like`,{withCredentials:true}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    alert("error in getting like")
  })
}

export const delLike=(id)=>{
  axios.get(`https://instaclone-mmf6.onrender.com/api/${id}/dislike`,{withCredentials:true}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    alert("error in getting like")
  })
}


export const addCmnt=(id,cmnt,initialCmnt,setcmnt,fetchcomments)=>{
  axios.post(`https://instaclone-mmf6.onrender.com/api/${id}/comment`,cmnt,{withCredentials:true}).then((res)=>{
    console.log(res);
    setcmnt(initialCmnt)
    // if(callback) callback();
    if(fetchcomments) fetchcomments();
  }).catch((err)=>{
    console.log(err);
    alert("error while storing cmnt")
  })
}

export const inputHandle=(e,cmnt,setcmnt)=>{
  let inputName=e.target.name;
  let inputValue=e.target.value
  let oldData={...cmnt};
  oldData[inputName]=inputValue;
  setcmnt(oldData);
}


export const getComment=(id)=>{
  axios.post(`https://instaclone-mmf6.onrender.com/api/${id}/comment/all`,{withCredentials:true}).then((res)=>{
    console.log(res);
    // cmntData=res.data
  }).catch((err)=>{
    console.log(err);
    alert("error while fetching comment")
  })
}

export const getFollower=(id)=>{
  axios.post(`https://instaclone-mmf6.onrender.com/api/followorunfollow/${id}`,{},{withCredentials:true}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    alert("error while storing follower")
  })
}


export const handleLike = async (postId,setPostData,logedUser) => {
    try {
      await getLike(postId);
      setPostData((prevData) =>
        prevData.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, logedUser] }
            : post
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  export const handleUnlike = async (postId,setPostData,logedUser) => {
    try {
      await delLike(postId);
      setPostData((prevData) =>
        prevData.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.filter((id) => id._id !== logedUser._id),
              }
            : post
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  export const logout= async (navigate)=>{
    axios.get('https://instaclone-mmf6.onrender.com/api/logout',{ withCredentials: true }).then((res)=>{
      console.log(res);
      // setLogedUser(null);
      navigate('/login');
    }).catch((err)=>{
      console.log(err);
      alert("error while doing logout");
    })
  }