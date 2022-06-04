import "./Header.css";
import { Overlay, Popover } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult.js/SearchResult";

function Header(props) {
  var [profilePic, setProfilePic] = useState("../images/person.png");
  const [searchData, setSearchData] = useState([]);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const navigate = useNavigate();
  const uploadpageURL = "../upload/" + props.id;
  useEffect(() => {
    fetch("http://localhost:3200/api/user/userdata/" + props.id, {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfilePic(result.user.profilePic);
      });
  }, []);

  const handledropdown = () => {
    var userProfile = document.querySelector(".user-profile");
    var dropdown = document.getElementById("dropdown-list");
    if (!dropdown.style.display || dropdown.style.display == "none") {
      dropdown.style.display = "block";
      userProfile.style.border = "1px solid black";
    } else {
      dropdown.style.display = "none";
      userProfile.style.border = "none";
    }
  };
  const handleChange = (event) => {
    if (event.target.value != "") {
      //console.log("search=" + event.target.value);
      fetch("http://localhost:3200/api/user/getbyname/" + event.target.value, {
        method: "get",
        headers: new Headers({
          Authorization: props.tokenData,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setSearchData(result.user);
        });
    }
    //console.log(searchData);
    if (event.target.value == "") {
      setShow(false);
    } else {
      setShow(true);
    }
    setTarget(event.target);
  };

  const naviateToProfile = () => {
    handledropdown();
    navigate(
      "/profile/",
      { state: { id: props.id, userId: props.id } },
      { replace: true }
    );
    setShow(false);
  };
  const navigateToHome = () => {
    navigate("/Home/" + props.id, { replace: true });
  };

  const handleProfileClick = (userid) => {
    navigate(
      "/profile/",
      { state: { id: props.id, userId: userid } },
      { replace: true }
    );
    //console.log("clicked "+userid);
    setShow(false);
  };

  const navigateToUploadpage = () => {
    navigate("/upload/" + props.id);
  };

  return (
    <div className="Header">
      <nav className="navbar topnav justify-content-around">
        <div className="container-fluid nav-wrapper">
          <div
            className="navbar-brand"
            onClick={() => {
              navigateToHome();
            }}
          >
            <img src="..\images\Instagram_logo.svg.png" alt="" height="40px" />
          </div>

          <form className="d-flex search-bar" ref={ref}>
            {/* <input
              className="form-control search-box"
              type="search"
              placeholder="Search"
              list="suggestions"
              onclick="return false"
            /> */}
            {/* <input className="form-control search-box" list="suggestions" />
            <datalist id="suggestions">
              <option>
                <img src="images\img1.jpg" alt="profile-pic" />
                <p className="username">akashprasadram</p>
              </option>
              <option value="Firefox" />
              <option value="Chrome" />
              <option value="Opera" />
              <option value="Safari" />
            </datalist>
           */}
            <input
              className="form-control search-box"
              type="search"
              placeholder="Search"
              onChange={handleChange}
            />

            <Overlay
              show={show}
              target={target}
              placement="bottom"
              container={ref}
              containerPadding={20}
            >
              <Popover id="popover-contained">
                {/* <Popover.Header as="h3">Popover bottom</Popover.Header> */}
                {/* <Popover.Body></Popover.Body> */}
                {searchData.length > 0 &&
                  searchData.map((r, index) => (
                    <SearchResult
                      item={r}
                      key={index}
                      handleClick={(id) => handleProfileClick(id)}
                    />
                  ))}
              </Popover>
            </Overlay>
          </form>
          <div className="d-flex">
            <div className="nav-item">
              <div className="nav-link" onClick={navigateToHome}>
                <i className="bi bi-house-door nav-icon"></i>
              </div>
            </div>
            <div className="nav-item">
              <a className="nav-link" href="#messgener">
                <i className="bi bi-messenger nav-icon"></i>
              </a>
            </div>
            {/* <div className="nav-item" onclick="displayHiddenSession()"> */}
            <div className="nav-item">
              <div className="nav-link" onClick={navigateToUploadpage}>
                <i className="bi bi-plus-square nav-icon"></i>
              </div>
            </div>
            <div className="nav-item">
              <a className="nav-link" href="#explore">
                <i className="bi bi-compass nav-icon"></i>
              </a>
            </div>
            <div className="nav-item">
              <a className="nav-link" href="#like">
                <i className="bi bi-heart nav-icon"></i>
              </a>
            </div>
            <div className="nav-item dropdown">
              <div className="nav-link profile-option" onClick={handledropdown}>
                <img
                  src={profilePic}
                  alt="profile-pic"
                  className="user-profile"
                />
              </div>
              <div className="dropdown-options" id="dropdown-list">
                <div
                  className="dropdown-item"
                  href="#Profile"
                  onClick={naviateToProfile}
                >
                  Profile
                </div>
                <div className="dropdown-item" href="#Saved">
                  <del>Saved</del>
                </div>
                <div className="dropdown-item" href="#Settings">
                  <del>Settings</del>
                </div>
                <div className="dropdown-item" href="#Switch">
                  <del>Switch Accounts</del>
                </div>
                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="/logout">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <script src="./NavBar.js" defer></script> */}
    </div>
  );
}
export default Header;
