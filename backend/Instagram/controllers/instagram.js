const repo = require("../repositories/instagram");
const instagram = require("../models/instagram");

exports.addPost = (req, res) => {
  var upload = req.files.image;
  console.log(upload);
  if (upload.size <= 1024 * 1024 * 3) {
    var date = "" + Date.now();
    var id = req.body.userId;
    upload.mv("public/uploadImages/" + id + date + upload.name, (err) => {
      if (err) {
        res.status(500).json({ status: "file not uploaded" });
      } else {
        var filename = id + date + upload.name;
        let post = new instagram(null, filename, req.body.caption, id);
        repo.addPost(post, () => {
          res.status(200).json({ status: "Post inserted successfully" });
        });
      }
    });
  }
};

exports.getAllPost = async (req, res) => {
  const result = await repo.getAll();
  result.map((user) => {
    user.image = "http://localhost:3200/uploadImages/" + user.image;
    user._user[0].profilePic =
      "http://localhost:3200/profilePic/" + user._user[0].profilePic;
  });
  //console.log(result);
  res.status(200).send(result);
};

exports.addLike = async (req, res) => {
  var postId = req.body.postId;
  var userId = req.body.userId;
  var inc = parseInt(req.body.like);
  console.log(postId + "  " + inc + " " + userId);
  var likes = await repo.getLike(postId);
  console.log(likes);
  if (likes > 0 || inc > 0) {
    repo.updateLike(postId, inc);
  }
  if (inc == 1) {
    repo.updateUserLikedPost(userId, postId);
  } else {
    repo.updateUserDislikedPost(userId, postId);
  }
  res.status(200).json({ status: "Data updated" });
};

exports.getLike = async (req, res) => {
  var postId = req.params.id;
  var likes = await repo.getLike(postId);
  res
    .status(200)
    .json({ status: "Data fetched successfully", likeCount: likes });
};

exports.getPostByUserId = async (req, res) => {
  var userId = req.params.id;
  var posts = await repo.getPostByUserId(userId);
  posts.map((post) => {
    post.image = "http://localhost:3200/uploadImages/" + post.image;
  });
  res.status(200).json({ status: "Data fetched successfully", posts: posts });
};

/*exports.test=async (req,res)=>{
  var postId=req.body.postId;
  var userId=req.body.userId;
  var inc=parseInt(req.body.like);
  console.log(postId+"  "+inc+" "+userId);
  if(inc==1)
  {
    var result= await repo.updateUserLikedPost(userId,postId);
    res.send(result);
  }
}*/
