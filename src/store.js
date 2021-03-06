import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      uid: "337584617"
    },
    audio: {
      play: false,
      url: "",
      img: ""
    },
    isShowPlayList: false,
    userPlayList: [],
    perPlayListID: "",
    perPlayListDetail: [],
    perSongData: {},
    playFlag: false
  },
  mutations: {
    SAVE_userPlayList(state, userPlayList) {
      state.userPlayList = userPlayList;
    },
    changeShowPlayList(state, isShowPlayList) {
      state.isShowPlayList = isShowPlayList;
    },
    SAVE_perPlayListID(state, perPlayListID) {
      state.perPlayListID = perPlayListID;
    },
    SAVE_perPlayListDetail(state, perPlayListDetail) {
      state.perPlayListDetail = perPlayListDetail;
    },
    SAVE_perSongData(state, perSongData) {
      state.perSongData = perSongData;
    },
    SAVE_playFlag(state, playFlag) {
      state.playFlag = playFlag;
    }
  },
  actions: {}
});
