import axios from "axios";
import { createContext } from "react";

export const setTokenCookie = (
  expiresIn: number,
  accessToken: string,
  refreshToken: string
) => {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expiresIn, accessToken, refreshToken }),
  });
};

export const getTokenCookie = () => {
  return fetch("/api/access", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = async (mail: string, password: string) => {
  const res = await axios.post("https://localhost:7099/api/auth/login", {
    Email: mail,
    Password: password,
  });

  if (res.data.token) {
    await setTokenCookie(res.data.expiration, res.data.token, res.data.token);
    return true;
  } else {
    return false;
  }
};
