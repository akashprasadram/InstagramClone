import { Popover } from "react-bootstrap";
import "./SearchResult.css";
function SearchResult(props) {
    var user=props.item;
    return (<Popover.Header as="h6" onClick={()=>props.handleClick(user._id)}>
    <div className="search-card" >
      <img
        src={props.item.profilePic}
        alt="profile-pic"
        className="search-profile-pic"
      />
      <div>
      <p className="search-userfullname">{user.fullName}</p>
      <p className="search-username">{user.userName}</p>
      </div>
    </div>
  </Popover.Header>);
}
export default SearchResult;