import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audio: {
      play: false,
      url: "",
      img: ""
    }
  },
  mutations: {},
  actions: {}
});
