import "./RightSidePanel.css";
import { useState, useEffect } from "react";
function RightSidePanelUser(props) {
  var [followdata, setFollowdata] = useState("Follow");
  var [follower, setFollower] = useState([]);
  useEffect(() => {
    if (props.user._id != props.id) {
      handelfollowBtn();
    }
  }, [props.user._id, props.id]);
  const handelFollowData = (e) => {
    if (followdata == "Follow") {
      setFollowdata("Following");

      var fd = new FormData();
      fd.append("userid", props.user._id);
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
          props.handelFollowUser();
        });
    } else {
      var fd = new FormData();
      fd.append("userid", props.id);
      fd.append("followid", props.user._id);

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
  const handelfollowBtn = () => {
    var follow_btn = document.querySelector("#follow-btn");

    handelFollowerUsers(props.user.follower);

    if (props.user.follower.includes(props.id)) {
      setFollowdata("Following");
    } else {
      setFollowdata("Follow");
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-pic">
        <img
          src={
            props.user.profilePic ? props.user.profilePic : "../images/img1.jpg"
          }
          alt="profile-pic"
        />
      </div>
      <div>
        <p className="username">{props.user.userName}</p>
        <p className="sub-text">followed by user</p>
      </div>
      <button
        className="action-btn"
        id="follow-btn"
        onClick={(e) => {
          handelFollowData(e);
        }}
      >
        {followdata}
      </button>
    </div>
  );
}

export default RightSidePanelUser;
