export const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2MTkzMjI3MTl9.nQO3vPhYs59Rm6vpgNIv1prARl2FWVZY6rvm4bKAr7w";
export const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

export const bodyParameters = {
  key: "value",
};

export const TodosUrl = "https://todos-project-api.herokuapp.com/todos/";
