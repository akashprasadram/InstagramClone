import Header from "../home/header/Header";
import ProfileSection from "./profileMain/profileSection";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Profile(props) {
  const { state } = useLocation();
  var [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.tokenData) {
      navigate("/");
    }
  }, [props.tokenData]);

  useEffect(() => {
    fetch("http://localhost:3200/api/user/userdata/" + state.userId, {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log("profilePage(result)=>");
        //console.log(result);
        setUser(result.user);
      });
  }, [state]);

  return (
    <div className="profile">
      <Header id={state.id} tokenData={props.tokenData} />
      {user && (
        <ProfileSection
          userData={user}
          id={state.id}
          tokenData={props.tokenData}
        />
      )}
    </div>
  );
}
export default Profile;
