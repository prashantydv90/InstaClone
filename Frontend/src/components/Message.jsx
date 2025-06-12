import React, { useDebugValue, useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdLogout } from "react-icons/md";
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
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Create } from "./Create";
import axios from "axios";
import { RiMessengerLine } from "react-icons/ri";
import { LuDot } from "react-icons/lu";
import socket from "../Routes/Socket";
import { useParams } from "react-router-dom";
import { logout } from "../Routes/LikeUnlike";
import { Search } from "./Search";

export const Message = () => {
  dayjs.extend(relativeTime);
  const { receiverId } = useParams()
  // const receiverId='682edce163422041057be540';
  let navigate = useNavigate();
  let [recUser, setRecUser] = useState({});
  let [logedUser, setLogedUser] = useState({});
  let [suggUser, setSuggUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1111/api/suggested", {
        withCredentials: true,
      })
      .then((res) => {
        const userId = res.data.loggedUser?._id;
        localStorage.setItem("userId", userId);
        setLogedUser(res.data.loggedUser);
        setSuggUser(res.data?.users || []);
        if (receiverId) {
          const foundUser = res.data?.users?.find((user) => user._id === receiverId);
          setRecUser(foundUser);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("error while fetching data");
      });
  }, []);
  console.log('sugguser::', suggUser);
  console.log('recUser::', recUser);

  let [showSearch, setSearchShow] = useState(false)

  return (
    <div className="inset-0 fixed bg-black flex ">
      <div className="bg-black h-screen border-r-[1px] border-zinc-800 w-20">
        <MsgLeft logedUser={logedUser} setSearchShow={setSearchShow} />
      </div>

      <div className="h-full w-90 border-r-[1px] border-zinc-800">
        <Users
          logedUser={logedUser}
          suggUser={suggUser}
          setRecUser={setRecUser}
        />
      </div>

      <div className="h-full  flex-1 flex flex-col">
        <MsgBox logedUser={logedUser} recUser={recUser} />
      </div>
      {showSearch && (<Search logedUser={logedUser} showSearch={showSearch} setSearchShow={setSearchShow} setLogedUser={setLogedUser} />)}
    </div>
  );
};

export const MsgLeft = ({ logedUser, setSearchShow }) => {
  let navigate = useNavigate();
  let [toShow, setToShow] = useState(false);
  let [component, setComponent] = useState(null);
  const Items = [
    { id: 1, text: "Home", image: <GoHome />, route: "/home", cmpnt: null },
    {
      id: 2,
      text: "Search",
      image: <IoIosSearch />,
      route: "",
      cmpnt: null,
    },
    {
      id: 3,
      text: "Explore",
      image: <IoCompassOutline />,
      route: "/home",
      cmpnt: null,
    },
    // {
    //   id: 4,
    //   text: "Reels",
    //   image: <CgPlayButtonR />,
    //   route: "/home",
    //   cmpnt: null,
    // },
    {
      id: 5,
      text: "Messages",
      image: <LiaFacebookMessenger />,
      route: "/messages",
      cmpnt: null,
    },
    {
      id: 6,
      text: "Notifications",
      image: <AiOutlineHeart />,
      route: "/home",
      cmpnt: null,
    },
    {
      id: 7,
      text: "Create",
      image: <TbSquareRoundedPlus />,
      route: "/post",
      cmpnt: <Create toShow={toShow} setToShow={setToShow} />,
    },
    {
      id: 8,
      text: "Profile",
      image: (
        <img
          src={
            logedUser?.profilePicture ||
            "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
          }
          alt="profile"
          className="object-cover h-7 w-7 object-center rounded-full"
        />
      ),
      route: "/profile",
      cmpnt: null,
    },
    {
      id: 9,
      text: "Logout",
      image: <MdLogout />,
      route: "",
      cmpnt: null,
    },
  ];

  const handleClick = (item) => {
    if (item.text === "Create") {
      setToShow(true);
    } else {
      navigate(item.route);
    }
    if (item.text === "Logout") {
      logout(navigate)
    }
    if (item.text === 'Search') setSearchShow((prev) => (!prev))
  };

  return (
    <>
      <div className="flex items-center h-[15%] pl-6 ">
        <a href="">
          <FaInstagram className="text-white text-3xl" />
        </a>
      </div>
      {Items.map((i, index) => (
        <div
          onClick={() => handleClick(i)}
          className="flex text-white h-14.5 items-center mx-3 pl-3 hover:bg-zinc-900 rounded-lg cursor-pointer w-13.5"
          key={index}
        >
          <div className="text-3xl mr-4">{i.image}</div>
        </div>
      ))}
      <Create toShow={toShow} setToShow={setToShow} logedUser={logedUser} />
    </>
  );
};

const Users = ({ logedUser, suggUser, setRecUser }) => {
  const navigate = useNavigate();
  let [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users); // users = array of userIds who are online
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, []);
  return (
    <>
      <div className="text-white text-2xl font-bold h-20 px-5 flex items-center border-b-[1px] border-zinc-800">
        <h1 className="cursor-pointer" onClick={() => navigate("/profile")}>
          {logedUser.username}
        </h1>
      </div>

      <div className=" h-full w-full">
        <div className="w-full px-5 text-white h-7/100 font-bold flex items-center">
          Messages
        </div>
        <div className=" h-80/100 overflow-y-auto w-full pb-4">
          {suggUser.map((user, index) => (
            <div
              className="flex w-full h-18 items-center cursor-pointer px-5 hover:bg-zinc-900"
              key={index}
              onClick={() => { setRecUser(user); navigate(`/messages/${user._id}`) }}
            >
              <img
                src={
                  user.profilePicture ||
                  "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                }
                alt=""
                className="h-15 w-15 rounded-full object-cover object-center  "

              />
              <div className="flex flex-col  ml-2">
                <h1 className="text-white text-[18px]">{user.name}</h1>
                <h2 className={onlineUsers.includes(user._id) ? "text-green-400" : 'text-red-600'}>{onlineUsers.includes(user._id) ? 'Online' : 'Offline'}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const MsgBox = ({ logedUser, recUser }) => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState({
    message: "",
  });

  const [allmsg, setAllmsg] = useState([]);
  const handlechange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let olddata = { ...msg };
    olddata[inputName] = inputValue;
    setMsg(olddata);
  };
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [allmsg]);

  const sendMsg = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:1111/api/send/${recUser?._id}`, msg, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMsg({ message: "" });
      })
      .catch((err) => {
        console.log(err);
        alert("error while sending msg");
      });
  };


  useEffect(() => {
    if (recUser?._id) {
      axios
        .get(`http://localhost:1111/api/all/${recUser?._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("msgdata:", res);
          setAllmsg(res.data.messages);
        })
        .catch((err) => {
          console.log(err);
          alert("error while fetching msgs");
        });
    }
  }, [recUser, msg]);

  useEffect(() => {
    const handleNewMessage = (newMsg) => {
      // Only push if it's relevant to the current chat
      if (
        newMsg.senderId === recUser?._id ||
        newMsg.receiverId === logedUser?._id
      ) {
        setAllmsg((prev) => [...prev, newMsg]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  });

  console.log("messages:", allmsg);





  return (
    <>
      {!recUser?._id ? (
        <div className="h-full w-full justify-center items-center flex flex-col text-white">
          <div className="p-4 outline-3 outline-white rounded-full">
            <RiMessengerLine className="text-7xl" />
          </div>
          <div className="text-2xl mt-4 mb-0.5">Your messages</div>
          <div className="text-zinc-400">Send a message to start a chat.</div>
        </div>
      ) : (
        <>
          {/* header */}
          <div className="w-full h-20 items-center px-3 flex border-b-[1px] border-zinc-800">
            <img
              src={
                recUser?.profilePicture ||
                "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
              }
              alt=""
              className="h-12 w-12 rounded-full object-cover object-center cursor-pointer"
              onClick={() => navigate(`/profile/${recUser?.username}`, { state: { user: recUser } })}
            />
            <div className="ml-2 leading-5">
              <h1 className="text-white text-[18px] font-semibold">
                {recUser?.name}
              </h1>
              <h2 className="text-zinc-400 text-[13px]">
                {recUser?.username}
              </h2>
            </div>
          </div>

          {/* msgbox */}
          <div className="w-full px-3 h-106 pb-2 overflow-y-auto">
            <div className="w-full flex flex-col justify-center items-center h-60  ">
              <img
                src={
                  recUser?.profilePicture ||
                  "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                }
                alt=""
                className="h-23 w-23 rounded-full object-cover object-center"

              />
              <div className="leading-5.5  flex flex-col items-center h-14 justify-center mt-2">
                <div className="text-white text-[20px] font-semibold">
                  {recUser?.name}
                </div>
                <div className="text-zinc-400 text-[15px] flex items-center">
                  {recUser?.username}
                  <LuDot />
                  Instagram
                </div>
              </div>
              <button className="px-3.5 text-white bg-zinc-800 rounded-[7px] py-1.5 mt-2 text-[15px] cursor-pointer hover:bg-zinc-600"
                onClick={() => navigate(`/profile/${recUser?.username}`, { state: { user: recUser } })}>

                View profile
              </button>
            </div>
            {allmsg.map((msg, index) => {
              const currentMsgTime = new Date(msg.createdAt);
              let showTimestamp = false;

              if (index === 0) {
                showTimestamp = true; // Always show for the first message
              } else {
                const prevMsgTime = new Date(allmsg[index - 1].createdAt);
                const timeDiffInMs = currentMsgTime - prevMsgTime;
                const timeDiffInHours = timeDiffInMs / (1000 * 60 );
                console.log('timediff:',index,timeDiffInHours)
                if (timeDiffInHours > 60) {
                  showTimestamp = true;
                }
              }

              return (
                <div key={index}>
                  {showTimestamp && (
                    <div className="text-center text-zinc-400 py-2 text-[12px] my-2">
                      {dayjs(msg.createdAt).format("D MMM YYYY, h:mm A")}
                    </div>
                  )}

                  {msg.senderId === recUser?._id ? (
                    <div className="w-full flex mb-3 items-center group relative">
                      <img
                        src={
                          recUser?.profilePicture ||
                          "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                        }
                        alt=""
                        className="h-8 w-8 rounded-full object-cover object-center"
                      />
                      <p className="text-white px-3.5 py-1.5 bg-zinc-800 rounded-full leading-5 flex items-center ml-2">
                        {msg.message}
                      </p>
                      <div className="text-[12px] text-zinc-400 opacity-0 group-hover:opacity-100 ml-2">{dayjs(msg.createdAt).format('h:mm A')}</div>
                    </div>
                  ) : (
                    <div className="w-full flex mb-3 justify-end pr-1 items-center group relative">
                      <div className="text-[12px] text-zinc-400 opacity-0 group-hover:opacity-100">{dayjs(msg.createdAt).format('h:mm A')}</div>
                      <p className="text-white px-4 py-1.5 rounded-full max-w-2/3 flex items-center ml-2 bg-blue-600 leading-5 ">
                        {msg.message}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* footer */}
          <div className="w-full px-3 flex justify-center items-center  h-20 ">
            <form
              className="w-full rounded-full px-5 h-11 text-white border-zinc-800 border-2 flex justify-center
        items-center"
              onSubmit={sendMsg}
            >
              <input
                type="text"
                name="message"
                id=""
                value={msg.message}
                onChange={handlechange}
                placeholder="Message..."
                className="placeholder-zinc-400 flex-1 border-none outline-none"
                autoComplete="off"
              />
              <button
                className="w-10 text-blue-700 cursor-pointer"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};
