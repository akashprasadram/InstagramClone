const { ObjectId } = require("mongodb");
const mongodb = require("../../config/mongodb");

exports.addPost = (item, callback) => {
  //Step 2: Get the collection.
  const collection = mongodb.getCollection("post");
  //Step 3: Add your data to collection.
  collection
    .insertOne({
      image: item.image,
      caption: item.caption,
      userId: item.userId,
      like: item.like,
      userLiked: item.userLiked,
    })
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAll = async () => {
  const postCollection = mongodb.getCollection("post");
  var filter = [
    { $addFields: { user_id: { $toObjectId: "$userId" } } },

    {
      $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0, password: 0 } }],
        as: "_user",
      },
    },
    { $project: { user_id: 0 } },
  ];
  var result = await postCollection.aggregate(filter).toArray();
  return result.reverse();
};

exports.updateLike = async (postId, inc_value) => {
  const collection = mongodb.getCollection("post");
  const filter = { _id: ObjectId(postId) };
  const updatevalue = { $inc: { like: inc_value } };
  const result = collection.updateOne(filter, updatevalue);
  return result;
};
exports.getLike = async (postId) => {
  const collection = mongodb.getCollection("post");
  const result = await collection.findOne(
    { _id: ObjectId(postId) },
    { like: 1 }
  );
  return result.like;
};

exports.updateUserLikedPost = async (userId, postId) => {
  const collection = mongodb.getCollection("post");
  const filter = { _id: ObjectId(postId) };
  const updatevalue = { $push: { userLiked: userId } };
  const result = await collection.updateOne(filter, updatevalue);
  return result;
};

exports.updateUserDislikedPost = async (userId, postId) => {
  const collection = mongodb.getCollection("post");
  const filter = { _id: ObjectId(postId) };
  const updatevalue = { $pull: { userLiked: userId } };
  const result = await collection.updateOne(filter, updatevalue);
  return result;
};

exports.getPostByUserId = async (userId) => {
  const postCollection = mongodb.getCollection("post");
  var filter = [
    { $addFields: { user_id: { $toObjectId: "$userId" } } },
    { $match: { userId: userId } },
    {
      $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0, password: 0 } }],
        as: "_user",
      },
    },
    { $project: { user_id: 0 } },
  ];
  var result = await postCollection.aggregate(filter).toArray();
  return result.reverse();
};
