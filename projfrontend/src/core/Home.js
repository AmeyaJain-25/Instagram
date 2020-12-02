import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { API } from "../backend";
import Base from "./Base";

const Home = () => {
  const [data, setData] = useState([]);
  const { user, token } = isAuthenticated();

  const getPosts = () => {
    fetch(`${API}/posts/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result.posts);
      })
      .catch((err) => console.log(err));
  };

  const likePost = (Id) => {
    fetch(`${API}/like/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: Id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const UnlikePost = (Id) => {
    fetch(`${API}/unlike/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: Id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentMaking = (text, postId) => {
    fetch(`${API}/comment/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`${API}/delete/${user._id}/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        getPosts();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Base>
      <div className="container">
        {data.map((post, index) => {
          return (
            <div
              key={index}
              className="card"
              style={{
                maxWidth: "500px",
                height: "max-content",
                margin: "25px auto",
              }}
            >
              <h1>
                {post.postedBy.name}
                {post.postedBy._id == user._id && (
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    style={{
                      float: "right",
                      fontSize: ".7em",
                      padding: "5px",
                      color: "red",
                    }}
                    onClick={() => {
                      {
                        if (
                          window.confirm(
                            "Are you sure you wish to DELETE this POST?"
                          )
                        )
                          deletePost(post._id);
                      }
                    }}
                  ></i>
                )}
              </h1>
              <div>
                <img src={post.photo} width="100%" />
              </div>
              <div className="card-content">
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                  style={{ color: "red" }}
                ></i>
                {post.likes.includes(user._id) ? (
                  <i
                    className="fa fa-thumbs-down"
                    aria-hidden="true"
                    onClick={() => {
                      UnlikePost(post._id);
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-thumbs-up"
                    aria-hidden="true"
                    onClick={() => {
                      likePost(post._id);
                    }}
                  ></i>
                )}
                <h6>{post.likes.length} Likes</h6>
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                {post.comments.map((comm, index) => {
                  return (
                    <h6 key={index}>
                      <span style={{ fontWeight: "bold" }}>
                        {comm.postedBy}:{" "}
                      </span>
                      {comm.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    commentMaking(e.target[0].value, post._id);
                    e.target[0].value = "";
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add a Comment"
                    style={{
                      margin: "10px 0",
                      width: "100%",
                      height: "40px",
                    }}
                  />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
