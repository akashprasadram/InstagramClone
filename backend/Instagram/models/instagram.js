module.exports = class instagram {
  constructor(id, image, caption, userId,like=0,userLiked=[]) {
    this.id = id;
    this.image = image;
    this.caption = caption;
    this.userId = userId;
    this.like=like;
    this.userLiked=userLiked;
  }
};
