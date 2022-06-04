//Step 1: Import Express
const express = require("express");

const controller = require("../controllers/instagram");
const auth = require("../middlewares/auth");
//Step 2: Create router
const router = express.Router();

//Step 3: Configure route paths
//------------------Get All the like in posts (post)----------------------
router.get("/getlike/:id", controller.getLike);

//-------------------get All post from all users(Home)--------------------------
router.get("/getAll/", auth, controller.getAllPost);

//-------------------Add post(uploadPost)------------------------------------
router.post("/", controller.addPost);

//-----------------Add like to a post(post)-----------------------
router.put("/addlike/", auth, controller.addLike);

//------------------Get posts of user By Id (profileSection)-----------------------
router.get("/getpostbyid/:id", auth, controller.getPostByUserId);

//router.put("/test/",controller.test);

module.exports = router;
