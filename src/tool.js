import axios from "axios";

let baseUrl = "https://bighua.wang:3000";

export const getMusicListJson = params => {
  return axios.get(`${baseUrl}/user/playlist`, { params });
};
export const getMusicListDetailJson = params => {
  return axios.get(`${baseUrl}/playlist/detail`, { params });
};
// export const getCloudMusicListDetailJson = () => {
//   return axios.get(`${baseUrl}/user/cloud`);
// };
export const getMusicUrlJson = params => {
  return axios.get(`${baseUrl}/song/url`, { params });
};
