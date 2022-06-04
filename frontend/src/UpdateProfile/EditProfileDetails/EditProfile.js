import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
function EditProfile(props) {
  var [profilePic, setProfilePic] = useState("../images/person.png");
  const navigate = useNavigate();
  var [user, setUser] = useState([]);
  var [fullName, setFullName] = useState([]);
  var [userName, setUserName] = useState([]);
  var [loginId, setLoginId] = useState([]);
  var [email, setEmail] = useState([]);
  var [phone, setPhone] = useState([]);
  var [gender, setGender] = useState([]);
  var [newPassword, setNewPassword] = useState([]);
  var [imagePost, setImagePost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3200/api/user/userdata/" + props.id, {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfilePic(result.user.profilePic);
        setUser(result.user);
      });
  }, []);
  const handelProfilePic = (value) => {
    console.log("handelimh image change");
    setProfilePic(value);
  };
  const uploadProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePost(file);
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        handelProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const changeProfilePic = () => {
    console.log("Change profile pic");
    const defaultBtn = document.querySelector("#upload-profilePic-btn");
    console.log(defaultBtn);
    defaultBtn.click();
  };
  const handleProfileSubmit = () => {
    console.log("Edit profile submit");
    console.log(loginId + " " + fullName + " " + userName);
    var fd = new FormData();
    fd.append("userid", props.id);
    fd.append("loginId", loginId);
    fd.append("fullName", fullName);
    fd.append("userName", userName);
    fd.append("profilePic", imagePost);

    fetch("http://localhost:3200/api/user/updateUser/", {
      method: "PUT",
      body: fd,
      headers: new Headers({
        Authorization: props.tokenData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    alert("Refresh the page to able to see changes!!!");
    navigate("/profile/", {
      state: { id: props.id, userId: props.id },
      replace: true,
    });
  };
  const showProfileDetail = (e) => {
    var profile = document.getElementById("profileDetail");
    var personal = document.getElementById("personalDetail");
    var passwordChange = document.getElementById("passwordChange");
    var current = document.getElementsByClassName("active-profile");
    current[0].className = current[0].className.replace(" active-profile", "");

    e.target.className += " active-profile";
    profile.style.display = "block";
    personal.style.display = "None";
    passwordChange.style.display = "None";
  };
  const showPersonalDetails = (e) => {
    var profile = document.getElementById("profileDetail");
    var personal = document.getElementById("personalDetail");
    var passwordChange = document.getElementById("passwordChange");
    var current = document.getElementsByClassName("active-profile");
    current[0].className = current[0].className.replace(" active-profile", "");

    e.target.className += " active-profile";

    profile.style.display = "None";
    personal.style.display = "block";
    passwordChange.style.display = "None";
  };
  const showPasswordChange = (e) => {
    var profile = document.getElementById("profileDetail");
    var personal = document.getElementById("personalDetail");
    var passwordChange = document.getElementById("passwordChange");
    var current = document.getElementsByClassName("active-profile");
    current[0].className = current[0].className.replace(" active-profile", "");

    e.target.className += " active-profile";
    profile.style.display = "None";
    personal.style.display = "None";
    passwordChange.style.display = "block";
  };
  return (
    <div className="EditProfile">
      <div className="row Editprofile-row">
        <div className="col col-3 leftside-panel">
          <div className="NavigationLink">
            <div
              className="profiledetail active-profile"
              onClick={(e) => showProfileDetail(e)}
            >
              Edit Profile
            </div>
          </div>
          <div className="NavigationLink">
            <div
              className="PersonalDetail"
              onClick={(e) => showPersonalDetails(e)}
            >
              Edit Personal Detail
            </div>
          </div>
          <div className="NavigationLink">
            <div
              className="ChangePassword"
              onClick={(e) => showPasswordChange(e)}
            >
              Change Password
            </div>
          </div>
        </div>
        <div className="col col-6 rightside-panel">
          <div className="profiledetailpage" id="profileDetail">
            <h3>Profile Details</h3>
            <div className="profile-card">
              <div className="profile-pic">
                <img src={profilePic} alt="profile-pic" id="profilePic-img" />
              </div>
              <div>
                <p className="username">
                  {user.fullName ? user.fullName : user.userName}
                </p>

                <div
                  className="ProfileChangeLink"
                  onClick={(e) => {
                    changeProfilePic(e);
                  }}
                >
                  <p>Change Profile Photo</p>
                </div>
              </div>
            </div>
            <input
              type="file"
              id="upload-profilePic-btn"
              onChange={(e) => uploadProfilePic(e)}
              hidden
            />
            <div className="mb-3 row">
              <label htmlFor="inputLoginId" className="col-sm-2 col-form-label">
                Login Id
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Login Id"
                  defaultValue={user.loginId ? user.loginId : ""}
                  onChange={(e) => {
                    setLoginId(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  defaultValue={user.fullName ? user.fullName : ""}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />

                <p className="sub-text-profile">
                  Help people discover your account by using the name you're
                  known by: either your full name, nickname, or business name.
                </p>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputUserName"
                className="col-sm-2 col-form-label"
              >
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  defaultValue={user.userName ? user.userName : ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn-primary submit-btn"
                  onClick={handleProfileSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="personalDetailPage" id="personalDetail">
            <h3>Personal Details</h3>

            <div className="mb-3 row">
              <label
                htmlFor="inputUserName"
                className="col-sm-2 col-form-label"
              ></label>
              <div className="col-sm-10">
                <p className="sub-text-profile">
                  <b>Personal Information</b>
                  <br /> Provide your personal information, even if the account
                  is used for a business, a pet or something else. This won't be
                  a part of your public profile.
                </p>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  defaultValue={user.email ? user.email : ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputPhone" className="col-sm-2 col-form-label">
                Phone Number
              </label>
              <div className="col-sm-10">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  defaultValue={user.phone ? user.phone : ""}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputGender" className="col-sm-2 col-form-label">
                Gender
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gender"
                  defaultValue={user.gender ? user.gender : "Male"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button type="submit" className="btn-primary submit-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div id="passwordChange" className="passwordChangePage">
            <h3>Password Change</h3>
            <div className="mb-3 row">
              <label
                htmlFor="inputOldPassword"
                className="col-sm-2 col-form-label"
              >
                Old Password
              </label>
              <div className="col-sm-10">
                <input type="password" className="form-control" />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputNewPassword"
                className="col-sm-2 col-form-label"
              >
                New Password
              </label>
              <div className="col-sm-10">
                <input type="password" className="form-control" />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputCnewPassword"
                className="col-sm-2 col-form-label"
              >
                Confirm New Password
              </label>
              <div className="col-sm-10">
                <input type="password" className="form-control" />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button type="submit" className="btn-primary submit-btn">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
