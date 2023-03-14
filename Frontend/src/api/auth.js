import axios from "axios";

const TOKEN_KEY = "token";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL,
});

function login(email, password) {
  const data = { email, password };
  return authAxios.post("/login", data);
}

function validateToken(token) {
  return authAxios.post("/validatetoken", { token });
}

function askResetPassword(email) {
  return authAxios.post("/askresetpassword", { email });
}

function newPassword(token, password) {
  const data = { token, password }
  return authAxios.patch("/newpassword", data );
}

function getBearerToken() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) return null;

  return `bearer ${token}`;
}

export { login, validateToken, askResetPassword, TOKEN_KEY, getBearerToken, newPassword};
