import React, { useEffect, useState } from "react";
import { MsgLeft } from "./Message";
import axios from "axios";
import { getFollower } from "../Routes/LikeUnlike";
import { useNavigate } from "react-router-dom";

export const Search = ({ logedUser, showSearch, setSearchShow ,setLogedUser}) => {
  let navigate=useNavigate();
  let [allUser, setAllUser] = useState([]);
  let [searchTerm,setSearchTerm]=useState('')
  const handleclick = (id) => {
    let isfollowing = logedUser.following.includes(id);
    setLogedUser((prev) => ({
      ...prev,
      following: isfollowing
        ? prev.following.filter((fid) => fid !== id) // remove
        : [...prev.following, id], // add
    }));
  };
  useEffect(() => {
    axios
      .get("https://instaclone-mmf6.onrender.com/api/suggested", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setAllUser(res.data?.users || []);
      })
      .catch((err) => {
        console.log(err);
        alert("error while fetching data");
      });
  }, []);

  const filteredList = allUser?.filter(
    (item) =>
      item?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="fixed inset-0 flex">
      <div className="bg-black h-full w-[37%] flex">
        <div>
          <MsgLeft logedUser={logedUser} setSearchShow={setSearchShow} />
        </div>

        <div className="flex-1 h-full  text-white ">
          <div className="w-full h-25/100 border-b-1 border-zinc-700 pl-3 pr-4 pt-5">
            <h1 className="text-2xl font-bold ml-1.5">Search</h1>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 px-4 outline-none bg-zinc-700 rounded-[8px] mt-9"
            />
          </div>
          <div className="w-full h-75/100 pr-5 pl-5 overflow-y-auto">
            {(searchTerm? filteredList: allUser)?.map((item) => (
              <div className="flex w-full my-4" id={item._id}>
                <img
                  src={
                    item?.profilePicture ||
                    "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                  }
                  alt=""
                  className="w-11 h-11 rounded-full object-cover cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${item.username}`, {
                      state: { user: item },
                    });
                    setSearchShow(false);
                  }}
            />
                <div className="flex-col flex text-[14px] ml-3  justify-center">
                  <div className="font-medium leading-4 cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${item.username}`, {
                      state: { user: item },
                    });
                    setSearchShow(false);
                  }}
                  >
                    {item?.username}
                  </div>
                  <div className="text-zinc-400">{item?.name}</div>
                </div>
                {item._id != logedUser._id && (
                  <div className="flex-1 flex justify-end items-center pr-2">
                    <button
                      onClick={() => {
                        getFollower(item?._id);
                        handleclick(item?._id);
                      }}
                      className={` py-1 px-4 rounded-[7px] cursor-pointer text-[13.5px]
                              ${
                                logedUser?.following?.includes(item?._id)
                                  ? "bg-zinc-600 hover:bg-zinc-700"
                                  : "bg-blue-700 hover:bg-blue-800"
                              }`}
                    >
                      {logedUser?.following?.includes(item?._id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="bg-black/0 h-full flex-1"
        onClick={() => setSearchShow(false)}
      ></div>
    </div>
  );
};
