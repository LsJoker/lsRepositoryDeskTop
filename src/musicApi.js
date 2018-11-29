import axios from 'axios';

let baseUrl = 'https://api.bzqll.com/music/';
let platKinds = 'netease';

export const getMusicListJson = params => {
  return axios.get(`${baseUrl}${platKinds}/songList?key=579621905&id=3778678&limit=10&offset=0`,{params});
};
