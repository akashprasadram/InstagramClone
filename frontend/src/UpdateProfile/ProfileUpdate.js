import { useLocation } from "react-router-dom";
import Header from "../home/header/Header";
import EditProfile from "./EditProfileDetails/EditProfile";
import "./ProfileUpdate.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ProfileUpdate(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.tokenData) {
      navigate("/");
    }
  }, [props.tokenData]);
  return (
    <div className="UpdateProfile-Container">
      <Header id={state.id} tokenData={props.tokenData} />
      <EditProfile id={state.id} tokenData={props.tokenData} />
    </div>
  );
}

export default ProfileUpdate;
