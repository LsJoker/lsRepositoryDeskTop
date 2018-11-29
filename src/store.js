import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audio: {
      play: false,
      url: "",
      img: ""
    },
    userPlayList: {}
  },
  mutations: {
    SAVE_userPlayList(state, userPlayList) {
      state.userPlayList = userPlayList;
    }
  },
  actions: {}
});
