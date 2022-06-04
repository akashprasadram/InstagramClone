import "./RightSidePanel.css";
import { useState, useEffect } from "react";
import RightSidePanelUser from "./RightSidePanelUser";
function RightSidePanel(props) {
  var [user, setUser] = useState([]);
  var [followUser, setFollowUser] = useState([]);
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
        setUser(result.user);
      });
  }, []);

  useEffect(() => {
    followUserData();
  }, [user.following]);

  const followUserData = () => {
    fetch("http://localhost:3200/api/user/allusers", {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        handelResult(result);
      });
  };

  const handelResult = (data) => {
    var result = data.filter(
      (r) =>
        r._id != props.id &&
        user &&
        user.following &&
        !user.following.includes(r._id)
    );
    setFollowUser(result);
  };
  return (
    <div className="right-panel">
      <div className="profile-card">
        <div className="profile-pic">
          <img
            src={user.profilePic ? user.profilePic : "../images/person.png"}
            alt="profile-pic"
          />
        </div>
        <div>
          <p className="username">{user.userName}</p>
          <p className="sub-text">{user.fullName}</p>
        </div>
        <button className="action-btn">
          <del>switch</del>
        </button>
      </div>
      <p className="suggestion-text">Suggestions for you</p>
      {followUser.length > 0 &&
        followUser.map((r, index) => (
          <RightSidePanelUser
            user={r}
            key={index}
            id={props.id}
            tokenData={props.tokenData}
            handelFollowUser={() => followUserData()}
          />
        ))}
    </div>
  );
}

export default RightSidePanel;
