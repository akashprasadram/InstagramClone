import Header from "../header/Header";
import StoryCard from "../story-card/StoryCard";
import Post from "../post/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import RightSidePanel from "../rightSidePanel/RightSidePanel";
function Home(props) {
  const { id } = useParams();
  var [post, setPost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3200/api/instagram/getAll", {
      method: "get",
      headers: new Headers({
        Authorization: props.tokenData,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPost(result);
      });
  }, []);
  useEffect(() => {
    if (!props.tokenData) {
      navigate("/", { replace: true });
    }
  }, [props.tokenData]);

  //console.log("Testing on back reload is happening " + id);
  return (
    <div className="Home">
      <Header ClassName="Header" id={id} tokenData={props.tokenData} />
      <section className="main">
        <div className="container">
          <div className="row">
            <div className="col-md-7 left-col">
              {/* <StoryCard/> */}
              {post.length > 0 &&
                post.map((r, index) => (
                  <Post
                    item={r}
                    key={index}
                    id={id}
                    tokenData={props.tokenData}
                  />
                ))}
            </div>
            <div className="col-md-5 right-col">
              <RightSidePanel id={id} tokenData={props.tokenData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
