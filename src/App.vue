<template>
  <div id="app">
    <my-header></my-header>
    <left-menu>123</left-menu>
    <main id="main"><router-view /></main>
    <play-list :is-show-play-list="isShowPlayList"></play-list>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "./components/Header/Header";
import MyFooter from "./components/Footer/Footer";
import leftMenu from "./components/LeftMenu/LeftMenu";
import playList from "./components/PlayList/PlayList";
import { getMusicListJson } from "./musicApi.js";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
    leftMenu,
    playList
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapState(["isShowPlayList"])
  },
  methods: {
    ...mapMutations(["SAVE_userPlayList"])
  },
  mounted() {
    getMusicListJson({ uid: "337584617" }).then(res => {
      let $this = this;
      if (res.data.code === 200) {
        $this.SAVE_userPlayList(res.data.playlist);
      }
    });
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  &::before,
  &::after {
    box-sizing: inherit;
  }
}
::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #191b1f;
}
::-webkit-scrollbar {
  //滚动条的宽度
  width: 6px;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #2f3134;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
html,
body,
#app {
  height: 100%;
}
#app {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#main {
  flex: 1 0 auto;
}
.flex {
  display: flex;
}
.align-center {
  display: flex;
  align-items: center;
}
.justify-center {
  display: flex;
  justify-content: center;
}
.justify-right {
  display: flex;
  justify-content: flex-end;
}
.space-between {
  display: flex;
  justify-content: space-between;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
