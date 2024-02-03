import axios from "axios";
import { getTokenCookie } from "./auth.utils";

const baseURL = "https://localhost:7099";

export const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await (await getTokenCookie()).json();

    if (session.token) {
      request.headers.Authorization = `Bearer ${session.token}`;
    }

    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );

  return instance;
};
