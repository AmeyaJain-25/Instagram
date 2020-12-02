import { API } from "../../backend";

//Create POST
export const createPost = (userId, token, post) => {
  return fetch(`${API}/createpost/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
