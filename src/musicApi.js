import axios from "axios";

let baseUrl = "https://bighua.wang:3000";

export const getMusicListJson = params => {
  return axios.get(`${baseUrl}/user/playlist`, { params });
};
export const getMusicListDetailJson = params => {
  return axios.get(`${baseUrl}/playlist/detail`, { params });
};
