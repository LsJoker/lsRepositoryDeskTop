<template>
  <div id="app">
    <my-header></my-header>
    <main id="main"><router-view /></main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "./components/Header/Header";
import MyFooter from "./components/Footer/Footer";
export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter
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
