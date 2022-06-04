module.exports = class user {
  constructor(
    id,
    loginId,
    fullName,
    userName,
    password,
    profilePic = "person.png",
    following = [],
    follower = []
  ) {
    this.id = id;
    this.loginId = loginId;
    this.fullName = fullName;
    this.userName = userName;
    this.password = password;
    this.profilePic = profilePic;
    this.following = following;
    this.follower = follower;
  }
};
