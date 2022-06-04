const { ObjectId } = require("mongodb");
const mongodb = require("../../config/mongodb");
exports.addUser = async (item) => {
  //Step 2: Get the collection.
  const collection = mongodb.getCollection("user");
  //Step 3: Add your data to collection.
  const result = await collection.insertOne({
    loginId: item.loginId,
    fullName: item.fullName,
    userName: item.userName,
    password: item.password,
    profilePic: item.profilePic,
    following: item.following,
    follower: item.follower,
  });
  return result;
};

exports.getUserByLoginId = async (id) => {
  //Step 2: Get the collection.
  const collection = mongodb.getCollection("user");
  //Step 3: Get data from collection.
  var user = await collection.findOne({ loginId: id });
  return user;
};

exports.getUsersByName = async (name) => {
  //Step 2: Get the collection.
  const collection = mongodb.getCollection("user");
  var regexKey = ".*" + name + ".*";
  //Step 3: Get data from collection.
  var result = await collection
    .find(
      {
        $or: [
          { fullName: { $regex: regexKey, $options: "i" } },
          { userName: { $regex: regexKey, $options: "i" } },
        ],
      },
      { password: 0 }
    )
    .toArray();
  console.log(result);
  return result;
};

exports.getUserById = async (id) => {
  //Step 2: Get the collection.
  const collection = mongodb.getCollection("user");
  //Step 3: Get data from collection.
  var user = await collection.findOne({ _id: ObjectId(id) });
  return user;
};

exports.findByUserName = async (username) => {
  const collection = mongodb.getCollection("user");
  var result = await collection.findOne({ userName: username });
  return result;
};

exports.getAllUser = async () => {
  const collection = mongodb.getCollection("user");
  var result = await collection.find({}, { password: 0 }).toArray();
  return result;
};

exports.addFollower = async (userId, followerId) => {
  const collection = mongodb.getCollection("user");
  var filter = { _id: ObjectId(userId) };
  const updatevalue = { $push: { follower: followerId } };
  //await this.addFollowing(followerId, userId);
  var result = await collection.updateOne(filter, updatevalue);
  return result;
};

exports.addFollowing = async (userId, followingId) => {
  const collection = mongodb.getCollection("user");
  var filter = { _id: ObjectId(userId) };
  const updatevalue = { $push: { following: followingId } };
  //await this.addFollower(followingId, userId);
  var result = await collection.updateOne(filter, updatevalue);
  return result;
};

exports.unFollow = async (userId, followingId) => {
  const collection = mongodb.getCollection("user");
  var filter = { _id: ObjectId(followingId) };
  var updatevalue = { $pull: { follower: userId } };
  var result = await collection.updateOne(filter, updatevalue);
  return result;
};
exports.unFollowing = async (userId, followingId) => {
  const collection = mongodb.getCollection("user");
  console.log("userId=" + userId + " followingId=" + followingId);
  var filter = { _id: ObjectId(userId) };
  var updatevalue = { $pull: { following: followingId } };
  var result = await collection.updateOne(filter, updatevalue);
  return result;
};

exports.updateUser = async (id, item) => {
  const collection = mongodb.getCollection("user");
  var filter = { _id: ObjectId(id) };
  const updatevalue = {
    $set: {
      loginId: item.loginId,
      fullName: item.fullName,
      userName: item.userName,
      profilePic: item.profilePic,
    },
  };
  var result = await collection.updateOne(filter, updatevalue);
  return result;
};
