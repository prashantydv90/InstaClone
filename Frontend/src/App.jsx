import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Log_in } from './components/Log_in'
import { Sign_in } from './components/Sign_in'
import {Home} from './components/home_page/Home'
import { Profile } from './components/Profile'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Create } from './components/Create'
import TextAreaExample from './components/Test'
import { PostShow } from './components/PostShow'
import { ProfileOthers } from './components/Profile_others'
import { Message } from './components/Message'
import RouteChangeHandler from './components/RouteChangeHandler'

function App() {
  // let [logedUser,setLogedUser]=useState({})

  let [logedUser, setLogedUser] = useState(() => {
    // Load from localStorage initially
    const storedUser = localStorage.getItem("logedUser");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  // Save to localStorage whenever updated
  useEffect(() => {
    if (logedUser && Object.keys(logedUser).length > 0) {
      localStorage.setItem("logedUser", JSON.stringify(logedUser));
    }
  }, [logedUser]);
  //  const isAuthenticated = !!document.cookie.includes('token'); 

  return(
      
      <BrowserRouter>
        <RouteChangeHandler />
        <Routes>
          <Route path="/login" element={<Log_in />} />
          <Route path="/test" element={<TextAreaExample/>} />
          <Route path="/signIn" element={<Sign_in />} />
          <Route path="/" element={<Sign_in />} />
          {/* <Route path="/home" element={isAuthenticated? <Home setLogedUser={setLogedUser} logedUser={logedUser}/> : <Navigate to="/login" />} /> */}
          <Route path="/home" element={<Home setLogedUser={setLogedUser} logedUser={logedUser}/>}/>
          <Route path="/profile" element={<Profile logedUser={logedUser} setLogedUser={setLogedUser}/>} />
          <Route path='/profile/:username' element={<ProfileOthers logedUser={logedUser} setLogedUser={setLogedUser}/>}/>
          <Route path='/messages' element={<Message logedUser={logedUser} setLogedUser={setLogedUser}/>}/>
          <Route path="/messages/:receiverId" element={<Message/>} />

          <Route path="*" element={<TextAreaExample/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App








function UploadPhotoButton() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Triggers the hidden file input
  };

  const handleFileChange = (event) => {
    console.log(event)
    const file = event.target.files[0];
    console.log("Selected file:", file);
    // You can now upload it or preview it
  };

  return (
    <div>
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Custom Upload Button */}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload Photo
      </button>
    </div>
  );
}
