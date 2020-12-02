const Post = require("../models/post");
const User = require("../models/user");
// const formidable = require("formidable"); //For accessing data(Photos and all type od data)
// const fs = require("fs"); //Accessing File Systems in Code

// //Get Post
// exports.getPost = (req, res) => {
//   req.post.photo = undefined;
//   return res.json(req.post);
// };

// //Get Photo's Of Posts
// exports.getPhoto = (req, res, next) => {
//   if (req.post.photo.data) {
//     res.set("Content-Type", req.post.photo.contentType);
//     return res.send(req.post.photo.data);
//   }
//   next();
// };

exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name") //Populate the post's user's id and name only.
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Post not Found in DB",
        });
      }
      req.post = post;
      next();
    });
};

// //Create a post
// exports.createPost = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Problem in Image while Creating a Post",
//       });
//     }
//     let post = new Post(fields);
//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size is tooooo BIG",
//         });
//       }

//       post.photo.data = fs.readFileSync(file.photo.path);
//       post.photo.contentType = file.photo.type;
//     }

//     post
//       .save()
//       .then((result) => {
//         res.json({ post: result });
//       })
//       .catch((err) => console.log(err));

//     res.send(post);
//   });
// };

//Create a post
exports.createPost = (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    res.status(400).json({
      error: "All fields required",
    });
  }

  req.userData.salt = undefined;
  req.userData.encry_password = undefined;
  req.userData.createdAt = undefined;
  req.userData.updatedAt = undefined;

  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.userData,
  });

  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => console.log(err));

  res.send(post);
};

exports.getMyPosts = (req, res) => {
  Post.find({ postedBy: req.userData._id })
    .populate("postedBy", "_id name") //Populate the post's user's id and name only.
    .exec((err, myposts) => {
      if (err) {
        return res.status(400).json({
          error: "Posts not found from DB",
        });
      }
      console.log(myposts);
      res.json({ myposts });
    });
};

//Get All Posts
exports.getAllPost = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name") //Populate the post's user's id and name only.
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "Posts not found from DB",
        });
      }
      res.json({ posts });
    });
};

//Get Likes
exports.getLike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.userData._id },
    },
    { new: true }
  ).exec((err, like) => {
    if (err) {
      return res.status(422).json({
        error: err,
      });
    } else {
      res.json(like);
    }
  });
};

//Get UnLikes
exports.getUnLike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.userData._id },
    },
    { new: true }
  ).exec((err, unlike) => {
    if (err) {
      return res.status(422).json({
        error: err,
      });
    } else {
      res.json(unlike);
    }
  });
};

//Get Comment
exports.getComment = (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.userData.name,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    // .populate("comments.postedBy", "name")
    .exec((err, comment) => {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      }
      res.json(comment);
    });
};

//Delete a Post
exports.removePost = (req, res) => {
  const { _id } = req.post;
  Post.findOne({ _id }, (err, post) => {
    if (err || !post) {
      return res.status(400).json({ error: "Post doesn't exists" });
    }
    if (post.postedBy._id.toString() === req.userData._id.toString()) {
      post.remove((err, post) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to delete Category",
          });
        }
        res.json({
          message: `Post Succesfull deleted`,
          post,
        });
      });
    }
  });
};

//Get Particular User and it's posts.
exports.UserAndPost = (req, res, next, id) => {
  User.findOne({ _id: id }).exec((err, user) => {
    Post.find({ postedBy: id })
      .populate("postedBy", "_id name")
      .exec((err, posts) => {
        if (err) {
          return res.status(422).json({
            error: "Failed to get the posts",
          });
        }
        req.uapUser = user;
        req.uapPost = posts;
        next();
      });
  });
};

exports.getUserAndPost = (req, res) => {
  const user = req.uapUser;
  const post = req.uapPost;
  res.json({ user, post });
};
