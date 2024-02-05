import axios from "axios";

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

export const logout = async () => {
  const res = await fetch("/api/logout", {
    method: "get",
  });

  if (res.status === 200) return true;
  else return false;
};
