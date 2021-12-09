import axios from "axios";
import jwtDecode from "jwt-decode";
import { getToken, setToken } from "./utils";
import { BASE_URL } from "./utils";
const axiosInstanceToken = async (method, url, accessToken, data) => {
  let isExp = false;
  let refreshToken = await getToken("refreshToken");

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const current_time = new Date().getTime() / 1000;

    if (current_time >= decoded.exp) {
      try {
        const body = {
          accessToken,
          refreshToken: refreshToken,
        };
        const res = await axios({
          method: "POST",
          url: `${BASE_URL}auth/refresh`,
          data: body,
        });
        await setToken("accessToken", res.data.accessToken);
        isExp = true;
      } catch (e) {
        console.log(e);
      }
    }
  }

  let accessTokenFromDevice = await getToken("accessToken");
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      "x-access-token": !isExp ? accessToken : accessTokenFromDevice,
    },
  });

  if (method == "GET") {
    try {
      return await instance.get(url);
    } catch (e) {
      console.log(e);
    }
  }
  if (method == "POST") {
    try {
      return await instance.post(url, data);
    } catch (error) {
      console.log(error);
    }
  }
  if (method == "PUT") {
    try {
      return await instance.put(url, data);
    } catch (error) {
      console.log(error);
    }
  }

  if (method == "DELETE") {
    try {
      return await instance.delete(url);
    } catch (error) {
      console.log(error);
    }
  }
};

export default axiosInstanceToken;
