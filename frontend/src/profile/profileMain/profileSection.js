import "./profileSection.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProfileSection(props) {
  var [profilePic, setProfilePic] = useState("../images/person.png");
  var [follower, setFollower] = useState([]);
  var [followdata, setFollowdata] = useState("follow");
  var [totalFollower, setTotalFollower] = useState(0);
  var [totalFollowing, setTotalFollowing] = useState(0);
  var [fullName, setName] = useState("");
  var [userPost, setUserPost] = useState([]);
  const navigate = useNavigate();
  //console.log("User");
  //console.log(props.userData);
  //console.log("followers:" + props.userData.follower.length);
  //console.log("following:" + props.userData.following.length);
  useEffect(() => {
    setTotalFollower(props.userData.follower.length);
    setTotalFollowing(props.userData.following.length);
    fetch(
      "http://localhost:3200/api/instagram/getpostbyid/" + props.userData._id,
      {
        method: "get",
        headers: new Headers({
          Authorization: props.tokenData,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        //console.log("GetBy post");
        //console.log(result);
        setUserPost(result.posts);
      });
  }, [props.userData._id]);

  useEffect(() => {
    setProfilePic(props.userData.profilePic);
    setName(props.userData.fullName);
  }, [props.userData]);

  useEffect(() => {
    if (props.userData._id == props.id) {
      handelEditBtn();
    } else {
      handelfollowBtn();
    }
  }, [props.userData._id, props.id]);

  const handelFollowData = (e) => {
    if (followdata == "Follow") {
      setFollowdata("Following");
      //console.log("follow is now");
      var fd = new FormData();
      fd.append("userid", props.userData._id);
      fd.append("followerid", props.id);

      fetch("http://localhost:3200/api/user/addfollower", {
        method: "PUT",
        body: fd,
        headers: new Headers({
          Authorization: props.tokenData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
        });
    } else {
      var fd = new FormData();
      fd.append("userid", props.id);
      fd.append("followid", props.userData._id);

      setFollowdata("Follow");

      fetch("http://localhost:3200/api/user/unfollow", {
        method: "PUT",
        body: fd,
        headers: new Headers({
          Authorization: props.tokenData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
        });
    }
  };

  const handelFollowerUsers = (users) => {
    setFollower(users);
  };

  const handelEditBtn = () => {
    var edit_btn = document.querySelector("#edit-btn");
    var follow_btn = document.querySelector("#follow-btn");
    edit_btn.className = edit_btn.className.replace(" hidden-btn", "");
    follow_btn.className += " hidden-btn";
  };

  const handelfollowBtn = () => {
    //console.log("handelfollowProfile");
    var edit_btn = document.querySelector("#edit-btn");
    var follow_btn = document.querySelector("#follow-btn");
    follow_btn.className = follow_btn.className.replace(" hidden-btn", "");
    edit_btn.className += " hidden-btn";

    handelFollowerUsers(props.userData.follower);

    if (props.userData.follower.includes(props.id)) {
      setFollowdata("Following");
    } else {
      setFollowdata("Follow");
    }
  };
  const handelClick = (e) => {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    e.target.parentNode.className += " active";
  };
  const handelEditProfile = () => {
    //console.log(props.id);
    navigate("/editProfile", { state: { id: props.id } }, { replace: true });
  };
  return (
    <section className="main">
      <div className="profilePage-container">
        <div className="profilePage-pic">
          <img src={profilePic} alt="profilePagepic" />
        </div>
        <div className="profilePage-leftside">
          <div className="profilePage-setting">
            <p className="profilePage-username">{fullName}</p>
            <div className="profilePage-settingbtn-container">
              <button
                className="btn-primary follow-btn"
                id="follow-btn"
                onClick={(e) => {
                  handelFollowData(e);
                }}
              >
                {followdata}
              </button>
              <button
                className="profilePage-settingbtn hidden-btn"
                id="edit-btn"
                onClick={handelEditProfile}
              >
                Edit profile
              </button>
            </div>
            <div className="profilePage-setting-icon">
              <i className="bi bi-gear-wide"></i>
            </div>
          </div>
          <div className="profilePage-hidden-line profilePage-line"></div>
          <div className="profilePage-bottom-panel">
            <p className="profilePage-text-style">
              <span className="profilePage-total profilePage-total-post">
                {userPost.length + " "}
              </span>
              posts
            </p>
            <p className="profilePage-text-style">
              <span className="profilePage-total profilePage-total-follower">
                {props.userData.follower.length + " "}
              </span>
              followers
            </p>
            <p className="profilePage-text-style">
              <span className="profilePage-total profilePage-total-follower">
                {props.userData.following.length + " "}
              </span>
              following
            </p>
          </div>
        </div>
      </div>
      <div className="profilePage-line"></div>
      <div className="profilePage-content-section">
        <div className="nav profilePage-tags" id="profilePage-tag-header">
          <div
            className="profilePage-posts profilePage-tag active"
            onClick={(e) => {
              handelClick(e);
            }}
          >
            <i className="bi bi-grid-3x3"></i>
            <span className="profilePage-Tag-Text"> POSTS</span>
          </div>
          <div
            className="profilePage-saved profilePage-tag"
            onClick={(e) => {
              handelClick(e);
            }}
          >
            <i className="bi bi-bookmark"></i>
            <span className="profilePage-Tag-Text"> SAVED</span>
          </div>
          <div
            className="profilePage-tagged profilePage-tag"
            onClick={(e) => {
              handelClick(e);
            }}
          >
            <i className="bi bi-person-square"></i>
            <span className="profilePage-Tag-Text"> TAGGED</span>
          </div>
        </div>
        <div className="profilePage-post-body">
          {userPost.length > 0
            ? userPost.map((r, index) => {
                //console.log("User Post");
                //console.log(r);
                return <img src={r.image} key={index} />;
              })
            : ""}
        </div>
      </div>
    </section>
  );
}
export default ProfileSection;
