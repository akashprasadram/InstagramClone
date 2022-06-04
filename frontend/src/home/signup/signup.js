import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  var [loginId, setLoginId] = useState("");
  var [fullName, setFullName] = useState("");
  var [userName, setUserName] = useState("");
  var [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLoginId = (e) => {
    setLoginId(e.target.value);
  };
  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handelSignup = async () => {
    if (loginId == "") {
      alert("Please enter email");
      return;
    }
    if (loginId != "") {
      const email = loginId;
      const indexOfAt = email.indexOf("@");
      const valid = email.length > indexOfAt + 4;
      if (indexOfAt < 1 || !valid || !email.endsWith(".com")) {
        alert("Please enter a valid email");
        return;
      }
    }
    if (fullName == "") {
      alert("Please enter your fullName");
      return;
    }
    if (userName == "") {
      alert("Please enter unique username");
      return;
    }
    if (userName != "") {
      var data = await fetch(
        "http://localhost:3200/api/user/checkUserName/" + userName
      ).then((res) => res.json());

      if (data.status != "200") {
        alert("Username is already taken. Kindly change your username.");
        return;
      }
      console.log(data);
    }
    if (password == "" || password.length < 6 || password.length > 20) {
      alert(
        "Please enter password whose length should be greater than 5 and less than 20."
      );
      return;
    }
    var fd = new FormData();
    fd.append("loginId", loginId);
    fd.append("fullName", fullName);
    fd.append("userName", userName);
    fd.append("password", password);
    fetch("http://localhost:3200/api/user/", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status != 200) {
          alert("Error!!! " + data.msg);
        } else {
          props.handelToken(data.token.token);
          navigate("/Home/" + data.userId);
        }
      });
  };
  return (
    <div className="container signup-container">
      <div className="row signup-row">
        <div className="col col-5 signup-right-panel">
          <div className="login-card">
            <div className="Instagram_logo">
              <img src="images\Instagram_logo.svg.png" alt="" height="60px" />
            </div>
            <div className="headingText">
              Sign up to see photos and videos from your friends.
            </div>
            <div className="facebooklogin">
              <button type="button" className="btn btn-primary btn-sm">
                <del>Log in with Facebook</del>
              </button>
            </div>
            <div className="OR-text">
              <div className="line"></div>
              <span className="textOR">OR</span>
              <div className="line"></div>
            </div>
            <form action="" className="signup-form">
              <div className="input">
                <input
                  type="text"
                  className="form-control input-text"
                  // placeholder="Mobile Number or Email"
                  placeholder="Email"
                  onChange={(e) => {
                    handleLoginId(e);
                  }}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Full Name"
                  onChange={(e) => {
                    handleFullName(e);
                  }}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Username"
                  onChange={(e) => {
                    handleUserName(e);
                  }}
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  className="form-control input-text"
                  placeholder="Password"
                  onChange={(e) => {
                    handlePassword(e);
                  }}
                />
              </div>
              <div className="btnsignup">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handelSignup}
                >
                  Sign up
                </button>
              </div>
              <div className="terms">
                By signing up, you agree to our Terms , Data Policy and Cookies
                Policy .
              </div>
            </form>
          </div>
          <div className="signin-card">
            <div className="signin-text">
              Have an account?
              <a href="/" className="signin-link">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
