import { Routes, Route } from "react-router-dom";
import ProfileUpdate from "./UpdateProfile/ProfileUpdate";
import Home from "./home/home/Home";
import Login from "./home/login/signin";
import Signup from "./home/signup/signup";
import Profile from "./profile/profilePage";
import UploadPost from "./upload/UploadPost";
import { useState } from "react";
import SignOut from "./home/header/Signout";

function App() {
  var [token, setToken] = useState(null);
  const handelToken = (tokendata) => {
    console.log("tokendata=" + tokendata);
    token = tokendata;
    setToken(tokendata);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path=""
          element={<Login handelToken={(data) => handelToken(data)} />}
        ></Route>
        <Route
          path="signup"
          element={<Signup handelToken={(data) => handelToken(data)} />}
        ></Route>
        <Route path="home/:id" element={<Home tokenData={token} />}></Route>

        <Route path="profile/" element={<Profile tokenData={token} />}></Route>

        <Route
          path="editProfile"
          element={<ProfileUpdate tokenData={token} />}
        ></Route>

        <Route
          path="upload/:id"
          element={<UploadPost tokenData={token} />}
        ></Route>

        <Route
          path="logout"
          element={<SignOut handelToken={(data) => handelToken(data)} />}
        ></Route>

        {/* <Route path="viewprofile/:id" element={<Profile />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
