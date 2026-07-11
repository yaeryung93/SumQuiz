import { requestApi } from "./api";

export async function loginUser(email, password) {
  return requestApi("/api/auth/login", {
    method: "POST",

    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function signupUser(userData) {
  return requestApi("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function logoutUser() {
  return requestApi("/api/auth/logout", {
    method: "POST",
  });
}