<template>
  <div id="playList" v-if="isShowPlayList"></div>
</template>

<script>
export default {
  name: "PlayList",
  props: { isShowPlayList: Boolean },
  methods: {},
  mounted() {
    console.log(this.isShowPlayList);
  }
};
</script>

<style lang="scss">
$activeColor: #c20c0c;
$background: #282a2e;
#playList {
  width: 500px;
  height: 70%;
  background: $background;
  position: fixed;
  right: 0px;
  bottom: 63px;
}
</style>
