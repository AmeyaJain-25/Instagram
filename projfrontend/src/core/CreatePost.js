import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import Base from "./Base";
import { createPost } from "./helper/createPostHelper";

const CreatePost = () => {
  const { user, token } = isAuthenticated();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const postData = (event) => {
    setSuccess(false);
    event.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "cloudinary25");
    fetch("https://api.cloudinary.com/v1_1/cloudinary25/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setSuccess(false);
        } else {
          setUrl(data.url);
        }
      })
      .catch((error) => console.log(error));

    if (url) {
      createPost(user._id, token, { title, body, pic: url })
        .then((data) => {
          if (!data.error) {
            console.log(data);
            setSuccess(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setSuccess(false);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h4>Post created successfullyy</h4>
      </div>
    );
  };

  return (
    <Base>
      <div className="container">
        {successMessage()}
        <form>
          <div
            className="card form-group"
            style={{
              margin: "10px auto",
              padding: "20px",
              textAlign: "center",
              maxWidth: "500px",
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                style={{ margin: "10px 0", width: "100%", height: "40px" }}
              />
              <textarea
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{ margin: "10px 0", width: "100%", height: "100px" }}
              />
              <div>
                <span>Upload Image</span>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <button className="btn btn-warning mt-4" onClick={postData}>
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default CreatePost;
