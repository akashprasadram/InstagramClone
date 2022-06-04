//Step 1: Import Express
const express = require("express");
const auth = require("../middlewares/auth");

const controller = require("../controllers/user");
//Step 2: Create router
const router = express.Router();

//Step 3: Configure route paths

//------Verfify username in signup step----------
router.get("/checkUserName/:username", controller.checkUserName);

//------Login------------
router.post("/login", controller.login);

//------Get all users to display on (rightside panel)---------------------------
router.get("/allusers", auth, controller.getAll);

//-----Get user Data by if for (Header profile pic, Rightside Panel Display,profile Page,Edit profile)------
router.get("/userdata/:id", auth, controller.getUserById);

//----Add to following list (Rightside panel,profile section)--------
router.put("/addfollower/", auth, controller.addFollower);

//----Unfollow  remove from followinglist (Rightside panel,profileSection)--------
router.put("/unfollow/", auth, controller.unFollow);

//----Update user Details (Edit profile)-----------------------------------
router.put("/updateUser/", auth, controller.updateUser);

//--------Get user by full name or username (Header serach page)-----------------
router.get("/getbyname/:name", auth, controller.getUsersByName);

//router.get("/:id", controller.getUserByLoginId);

router.put("/addfollowing/", controller.addFollowing);

//--------------------------------Signup----------------------------------
router.post("/", controller.addUser);

module.exports = router;
