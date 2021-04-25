export const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2MTk2Njk4OTR9.mWFYw-hIx8NGv4nrEyzGVe-JmYmkwuOtPQSUDyCpHis";
export const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

export const bodyParameters = {
  key: "value",
};

export const TodosUrl = "https://todos-project-api.herokuapp.com/todos/";
