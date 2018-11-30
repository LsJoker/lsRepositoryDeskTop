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
    userPlayList: []
  },
  mutations: {
    SAVE_userPlayList(state, userPlayList) {
      state.userPlayList = userPlayList;
    },
    changeShowPlayList(state, isShowPlayList) {
      state.isShowPlayList = isShowPlayList;
    }
  },
  actions: {}
});
