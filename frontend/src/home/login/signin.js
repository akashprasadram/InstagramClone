import "./signin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login(props) {
  const navigate = useNavigate();
  var [loginId, setLoginId] = useState("");
  var [password, setPassword] = useState("");
  const handleOnClick = () => {
    const userpassword = document.getElementById("userPassword");
    const showpassword = document.getElementById("showPassword");

    if (showpassword.textContent == "Show") {
      showpassword.textContent = "Hide";
      userpassword.type = "text";
    } else {
      showpassword.textContent = "Show";
      userpassword.type = "password";
    }
  };
  const handleLoginId = (e) => {
    setLoginId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handelLogin = () => {
    var fd = {};
    // if (loginId) {
    //   const email = loginId;
    //   const indexOfAt = email.indexOf("@");
    //   const valid = email.length > indexOfAt + 4;
    //   if (indexOfAt < 1 || !valid || !email.endsWith(".com")) {
    //     alert("Please enter a valid email");
    //     return;
    //   }
    // }
    fd["id"] = loginId;
    fd["password"] = password;
    fetch("http://localhost:3200/api/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fd),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status != "200") {
          alert("Error!!!  " + data.msg);
        } else {
          props.handelToken(data.token.token);
          navigate("/home/" + data.userId, { replace: true });
        }
      });
  };
  return (
    <div className="container signin-container">
      <div className="row signin-row">
        <div className="col col-4 left-panel">
          <img
            width="250px"
            src="images\mobile.jpeg"
            alt="Logo"
            className="mobile-logo"
          />
        </div>
        <div className="col col-5 signin-right-panel">
          <div className="login-card">
            <div className="Instagram_logo">
              <img src="images\Instagram_logo.svg.png" alt="" height="60px" />
            </div>
            <form action="" className="login-form">
              <div className="input-userid">
                <input
                  type="email"
                  className="form-control userid"
                  // placeholder="Phone number, username, or email"
                  placeholder="Enter your email id"
                  onChange={(e) => {
                    handleLoginId(e);
                  }}
                />
              </div>
              <div className="input-password">
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control user-password"
                    placeholder="Password"
                    id="userPassword"
                    onChange={(e) => {
                      handlePassword(e);
                    }}
                  />
                  <span
                    className="input-group-text"
                    id="showPassword"
                    onClick={() => {
                      handleOnClick();
                    }}
                  >
                    Show
                  </span>
                </div>
              </div>
              <div className="btnlogin">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handelLogin}
                >
                  Login
                </button>
              </div>
              <div className="OR-text">
                <div className="line"></div>
                <span className="textOR">OR</span>
                <div className="line"></div>
              </div>
            </form>
            <form action="" className="login-form">
              <div className="facebooklogin">
                <del>Login with facebook</del>
              </div>
            </form>
            <div className="forgotpassword">
              <del>Forgot password?</del>
            </div>
          </div>
          <div className="signup-card">
            <div className="signup-text">
              Don't have an account?
              <a href="/signup" className="signup-link">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
