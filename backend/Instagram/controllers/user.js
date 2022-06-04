const repo = require("../repositories/user");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  let userObj = new user(
    null,
    req.body.loginId,
    req.body.fullName,
    req.body.userName,
    req.body.password
  );
  var result = await repo.addUser(userObj);
  console.log(result);
  if (result.acknowledged) {
    var userId = result.insertedId;
    const token = jwt.sign(
      {
        userId: userId,
      },
      "MYPRIVATEKEY",
      {
        expiresIn: "2h",
      }
    );
    const authResponse = {
      token: token,
    };
    res.status(200).json({
      status: "200",
      userId: userId,
      token: authResponse,
      msg: "User inserted successfully",
    });
  } else {
    res.status(500).json({ status: "500", msg: "Unable to add the user" });
  }
};

exports.login = async (req, res) => {
  const user = await repo.getUserByLoginId(req.body.id);
  if (!user) {
    return res.status(401).json({ status: "401", msg: "Invaild User" });
  } else if (user.password != req.body.password) {
    return res.status(401).json({ status: "401", msg: "Invaild password" });
  } else {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "MYPRIVATEKEY",
      {
        expiresIn: "2h",
      }
    );
    const authResponse = {
      token: token,
    };
    res
      .status(200)
      .json({ status: "200", userId: user._id, token: authResponse });
  }
};

exports.checkUserName = async (req, res) => {
  var username = req.params.username;
  console.log(username);
  var result = await repo.findByUserName(username);
  if (!result) {
    res.json({ status: "200", msg: "Username not present" });
  } else {
    res.json({ status: "400", msg: "Username is present" });
  }
};

exports.getUserById = async (req, res) => {
  var id = req.params.id;
  console.log(req.params.id);
  var user = await repo.getUserById(id);
  user.password = null;
  user.profilePic = "http://localhost:3200/profilePic/" + user.profilePic;
  console.log(user);
  res.status(200).json({
    status: "User Data received successfully",
    user: user,
  });
};

exports.getAll = async (req, res) => {
  var users = await repo.getAllUser();
  users.map(
    (r) => (r.profilePic = "http://localhost:3200/profilePic/" + r.profilePic)
  );
  console.log(users);
  res.send(users);
};

exports.addFollower = async (req, res) => {
  var userId = req.body.userid;
  var followerId = req.body.followerid;
  console.log(userId + " " + followerId);
  var follow = await repo.addFollower(userId, followerId);
  await repo.addFollowing(followerId, userId);
  res.status(200).json({ status: "follower user dataadded successfully" });
};

exports.unFollow = async (req, res) => {
  var userId = req.body.userid;
  var followId = req.body.followid;
  console.log(userId + " " + followId);
  var follow = await repo.unFollow(userId, followId);
  var following = await repo.unFollowing(userId, followId);
  res.status(200).json({ status: "Unfollowed user successfully" });
};

exports.updateUser = async (req, res) => {
  var id = req.body.userid;
  var userData = await repo.getUserById(id);
  var loginId = req.body.loginId ? req.body.loginId : userData.loginId;
  var fullName = req.body.fullName ? req.body.fullName : userData.fullName;
  var userName = req.body.userName ? req.body.userName : userData.userName;
  var upload = null;
  if (req.files) {
    upload = req.files.profilePic ? req.files.profilePic : null;
  }
  var profilePic = userData.profilePic;
  //console.log(req.body.files);
  //console.log(upload);
  if (upload && upload.size <= 1024 * 1024 * 3) {
    //var date = "" + Date.now();
    upload.mv("public/profilePic/" + id + ".jpg", (err) => {
      if (err) {
        res.status(500).json({ status: "Unable to update profile picture" });
      } else {
        profilePic = id + ".jpg";
      }
    });
    profilePic = id + ".jpg";
  }

  console.log("profilepic=" + profilePic);
  let userObj = new user(null, loginId, fullName, userName, null, profilePic);
  var result = await repo.updateUser(id, userObj);
  res.status(200).json({
    status: "User Data updated successfully",
  });
};

exports.getUsersByName = async (req, res) => {
  var name = req.params.name;
  console.log(req.params.name);
  var result = await repo.getUsersByName(name);
  result.map(
    (r) => (r.profilePic = "http://localhost:3200/profilePic/" + r.profilePic)
  );
  res.status(200).json({
    status: "User Data fetched successfully",
    user: result,
  });
};

exports.addFollowing = async (req, res) => {
  var userId = req.body.userid;
  var followingId = req.body.followingid;
  var follow = await repo.addFollowing(userId, followingId);
  await repo.addFollower(followingId, userId);
  res.status(200).json({ status: "following user data added successfully" });
};

// exports.getUserByLoginId = async (req, res) => {
//   var id = req.params.id;
//   console.log(req.params.id);
//   const user = await repo.getUserByLoginId(id);
//   console.log(user);
//   res.status(200).json({
//     status: "User Data received successfully",
//     userId: user._id,
//     password: user.password,
//   });
// };
