const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      postedBy: String,
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", PostSchema);
