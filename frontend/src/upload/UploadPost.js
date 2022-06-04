import "./UploadPost.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UploadPost(props) {
  var [caption, setCaption] = useState("");
  var [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  var [profilePic, setProfilePic] = useState("../images/person.png");
  var [userName, setUserName] = useState("");
  useEffect(() => {
    fetch("http://localhost:3200/api/user/userdata/" + id, {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("fetching userdata for upload=>");
        // console.log(result.user);
        setProfilePic(result.user.profilePic);
        setUserName(result.user.fullName);
      });
  }, []);
  useEffect(() => {
    if (!props.tokenData) {
      navigate("/", { replace: true });
    }
  }, [props.tokenData]);
  const uploadFile = (e) => {
    const fileName = document.querySelector(".file-name");
    const cancelBtn = document.querySelector("#upload-cancel-btn");
    const wrapper = document.querySelector(".upload-wrapper");
    const icon = document.querySelector(".upload-icon");
    const img = document.querySelector(".upload-img");
    const regExp = new RegExp(
      /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/
    );
    const file = e.target.files[0];
    if (file) {
      setPost(file);
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        img.src = result;
        img.hidden = false;
        icon.classList.remove("upload-icon-position");
        wrapper.classList.add("active");
      };
      cancelBtn.addEventListener("click", function () {
        img.src = "";
        img.hidden = true;
        icon.classList.add("upload-icon-position");
        wrapper.classList.remove("active");
      });
      reader.readAsDataURL(file);
    }
    if (e.target.value) {
      var value1 = e.target.value;
      var valuestore = value1.match(regExp);
      fileName.textContent = valuestore;
    }
  };
  const defaultBtnActive = () => {
    //console.log("defaultBtnActive");
    const defaultBtn = document.querySelector("#upload-default-btn");
    //console.log(defaultBtn);
    defaultBtn.click();
  };
  const uploadNext = () => {
    //console.log("uploadNext");
    const leftPanel = document.querySelector(".upload-left-panel");
    const rightPanel = document.querySelector(".upload-right-panel");
    leftPanel.style.display = "none";
    rightPanel.style.display = "block";
  };
  const handelBackBtn = () => {
    const leftPanel = document.querySelector(".upload-left-panel");
    const rightPanel = document.querySelector(".upload-right-panel");
    //console.log("handelBackBtn");
    leftPanel.style.display = "block";
    rightPanel.style.display = "none";
  };
  const handelCaption = (e) => {
    setCaption(e.target.value);
  };
  const handelSubmit = () => {
    //console.log("submited");
    //console.log(caption);
    //console.log(post);
    //console.log(id);
    var fd = new FormData();
    fd.append("caption", caption);
    fd.append("image", post);
    fd.append("userId", id);

    fetch("http://localhost:3200/api/instagram", {
      method: "POST",
      body: fd,
      headers: new Headers({
        Authorization: props.tokenData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
      });
    navigate("/home/" + id, { replace: true });
  };
  const handelBackToMain = () => {
    navigate("/home/" + id, { replace: true });
  };
  return (
    <div className="upload-post-container">
      <div id="upload-mainpage-cancel-btn" className="backToMain">
        <i className="bi bi-x" onClick={handelBackToMain}></i>
      </div>
      <div className="panel">
        <div className="upload-container upload-left-panel">
          <div className="upload-wrapper">
            <div className="upload-image">
              <img src="" alt="" className="upload-img" hidden />
            </div>

            <div className="upload-content">
              <div
                className="upload-icon upload-icon-position"
                onClick={defaultBtnActive}
              >
                <i className="bi bi-cloud-arrow-up-fill"></i>
              </div>
              <div className="upload-text">No file chosen, yet!</div>
            </div>
            <div id="upload-cancel-btn">
              <i className="bi bi-x"></i>
            </div>
            <div className="upload-file-name">
              <span className="file-name">File name here</span>
              <div id="upload-next-btn" onClick={uploadNext}>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>

          <input
            type="file"
            id="upload-default-btn"
            onChange={(e) => {
              uploadFile(e);
            }}
            hidden
          />
          <button id="upload-custom-btn" onClick={defaultBtnActive}>
            choose a file
          </button>
        </div>
        <div className="upload-container upload-right-panel">
          <div className="upload-wrapper upload-right-wrapper">
            <div className="upload-content">
              <div className="caption-post">
                <div className="card-body caption-info">
                  <div className="caption-user">
                    <div className="caption-profile-pic">
                      <img src={profilePic} alt="profilepic" />
                    </div>
                    <p className="caption-username">{userName}</p>
                  </div>
                </div>
                <div className="card-body caption-body">
                  <textarea
                    className="caption-text-area"
                    placeholder="Write a caption..."
                    onChange={(e) => {
                      handelCaption(e);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div id="upload-back-btn" onClick={handelBackBtn}>
              <i className="bi bi-x"></i>
            </div>
            <div className="right-upload-file-name">
              <div
                id="right-upload-next-btn"
                onClick={() => {
                  handelSubmit();
                }}
              >
                <i className="bi bi-send"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPost;
