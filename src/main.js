import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import "font-awesome/css/font-awesome.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
  mounted() {
    // Prevent blank screen in Electron builds
    this.$router.push("/");
  }
}).$mount("#app");
