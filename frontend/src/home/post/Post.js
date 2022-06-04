import "./Post.css";
import { useState, useEffect } from "react";
function Post(props) {
  var [likeCount, setLikeCount] = useState(0);
  var [likeIconClass, setLikeIconClass] = useState(
    "bi bi-heart post-icon like-post"
  );
  var DLike = (Math.round(likeCount * 100) / 100).toLocaleString();
  const handlelikeOnclick = (e) => {
    if (likeIconClass == "bi bi-heart post-icon like-post") {
      setLikeIconClass("bi bi-heart-fill post-icon heart like-post");
    } else {
      setLikeIconClass("bi bi-heart post-icon like-post");
    }
  };
  //console.log("user="+props.id);
  //console.log(props.item);
  var username = props.item._user[0].fullName;
  var profilePicURL = props.item._user[0].profilePic;
  var postImageURL = props.item.image;
  var caption = props.item.caption;
  var postId = props.item._id;
  //console.log(props.user._user[0].profilePic);

  useEffect(() => {
    handleLiked();
    fetch("http://localhost:3200/api/instagram/getlike/" + postId, {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLikeCount(result.likeCount);
      });
  }, []);
  const handleLiked = () => {
    //console.log(props.id);
    //0console.log(props.item.userLiked);
    if (props.item.userLiked.includes(props.id)) {
      //console.log("user already liked it");
      setLikeIconClass("bi bi-heart-fill post-icon heart like-post");
    }
  };

  //console.log(likeCount+" <=likeCount");
  const increaseLikeCount = (e) => {
    var inc = 0;
    if (likeIconClass == "bi bi-heart post-icon like-post") {
      inc = 1;
    } else {
      inc = -1;
    }

    var fd = new FormData();
    fd.append("postId", postId);
    fd.append("userId", props.id);
    fd.append("like", inc);
    fetch("http://localhost:3200/api/instagram/addlike", {
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
    if (inc > 0 || likeCount > 0) {
      likeCount = likeCount + inc;
      setLikeCount(likeCount);
    }
    //console.log(likeCount+" <=likeCount After update");
    DLike = (Math.round(likeCount * 100) / 100).toLocaleString();
  };
  const likeFunctionality = (e) => {
    handlelikeOnclick(e);
    increaseLikeCount(e);
  };
  const likeByPost = (e) => {
    var likeobj = document.getElementById(postId);
    likeobj.click();
  };
  return (
    <div className="card post">
      <div className="card-body info">
        <div className="user">
          <div className="profile-pic">
            <img src={profilePicURL} alt="profilepic" />
          </div>
          <p className="username">{username}</p>
        </div>
        <span className="options">
          <i className="bi bi-three-dots options-icon"></i>
        </span>
      </div>
      <img
        src={postImageURL}
        className="card-img-bottom post-image"
        alt="img1"
        onDoubleClick={(e) => {
          likeByPost(e);
        }}
      />
      <div className="card-body post-content">
        <div className="reaction-wrapper">
          <div className="icon like">
            <i
              id={postId}
              className={likeIconClass}
              onClick={(e) => {
                likeFunctionality(e);
              }}
            ></i>
          </div>
          <div className="icon comment">
            <i className="bi bi-chat post-icon"></i>
          </div>
          <div className="icon send">
            <i className="bi bi-send post-icon"></i>
          </div>
          <div className="icon save">
            <i className="bi bi-bookmark post-icon"></i>
          </div>
        </div>
        <p className="likes" id="post-likes">
          {DLike} likes
        </p>
        <p className="description">
          <span>{username} </span>
          {caption}
        </p>
        <p className="post-time">
          <del>2 minutes ago</del>
        </p>
      </div>
      <div className="card-body comment-wrapper">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            className="bi bi-emoji-smile"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
          </svg>
        </div>
        <input
          type="text"
          className="comment-box"
          placeholder="Add a comment..."
        />
        <button className="comment-btn">
          <del>post</del>
        </button>
      </div>
    </div>
  );
}
export default Post;
