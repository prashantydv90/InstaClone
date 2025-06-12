import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { getFollower } from "../Routes/LikeUnlike";

export const UserList = ({showList,user,setShowList,logedUser,setLogedUser,}) => {
  let [User, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const handleclick = (id) => {
    let isfollowing = logedUser.following.includes(id);
    setLogedUser((prev) => ({
      ...prev,
      following: isfollowing
        ? prev.following.filter((fid) => fid !== id) // remove
        : [...prev.following, id], // add
    }));
  };

  console.log("logedUser:", logedUser);
  useEffect(() => {
    axios
      .get(`http://localhost:1111/api/${user?._id}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        console.log("otheruser:", res.data.user);
      })
      .catch((err) => {
        console.log(err);
        alert("error while fetching otheruser data");
      });
  }, []);

  const filteredList = User?.[showList?.toLowerCase()]?.filter(
    (item) =>
      item?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80">
      <div className="flex justify-end"></div>
      <div className="w-30/100 h-2/3 bg-zinc-800 z-50 rounded-2xl text-white flex flex-col">
        <div className="w-full flex justify-center items-center h-[11%] border-b-1 font-medium border-zinc-700">
          <div className="w-1/4"></div>
          <div className="w-2/4 flex items-center justify-center">
            {showList}
          </div>
          <div
            className="flex w-1/4 justify-end items-center pr-4 "
            onClick={() => setShowList("")}
          >
            <RxCross2 className="font-bold text-2xl cursor-pointer text-end" />
          </div>
        </div>

        {!User?.[showList.toLowerCase()] ||
        User[showList.toLowerCase()].length === 0 ? (
          <div className="flex w-full h-[89%] justify-center items-center text-2xl font-bold text-white">
            No {showList}
          </div>
        ) : (
          <div className="h-[89%] flex flex-col">
            <div className="w-full px-4 pt-2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-2 px-3 py-1 rounded-md bg-zinc-700 text-white text-sm focus:outline-none placeholder:text-zinc-400"
              />
            </div>
            <div className="w-full flex-1 px-4 overflow-y-auto">
              {(searchTerm
                ? filteredList
                : User?.[showList.toLowerCase()]
              )?.map((item, index) => (
                <div className="w-full py-1.5 flex items-center ">
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        item?.profilePicture ||
                        "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                      }
                      onClick={() => {
                        navigate(`/profile/${item.username}`, {
                          state: { user: item },
                        });
                        setShowList("");
                      }}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover cursor-pointer"
                    />
                  </div>
                  <div className="flex-col flex text-[14px] ml-4  justify-center">
                    <span
                      className="font-medium leading-4 cursor-pointer"
                      onClick={() => {
                        navigate(`/profile/${item.username}`, {
                          state: { user: item },
                        });
                        setShowList("");
                      }}
                    >
                      {item?.username}
                    </span>
                    <span className="text-zinc-400 ">{item?.name}</span>
                  </div>
                  {item._id != logedUser._id && (
                    <div className="flex-1 justify-end flex">
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
        )}
      </div>
    </div>
  );
};
