<template>
  <div id="leftMenu">
    <!--
      <div class="header">
        用户信息
      </div>
    -->
    <div class="userPlayList">
      <li class="li-title">推荐</li>
      <div class="li-func">
        <li class="li-title">
          <i class="fa fa-music" aria-hidden="true"></i> 发现音乐
        </li>
        <li class="li-title">
          <i class="fa fa-signal" aria-hidden="true"></i> 私人FM
        </li>
        <li class="li-title">
          <i
            class="fa fa-video-camera"
            aria-hidden="true"
            style="margin-right:10px;"
          ></i
          >视频
        </li>
        <li class="li-title" style="margin-bottom:5px;">
          <i
            class="fa fa-user"
            aria-hidden="true"
            style="margin-right:10px;"
          ></i>
          朋友
        </li>
      </div>
      <li class="li-title">我的音乐</li>
      <div class="li-func">
        <li class="li-title">
          <i
            class="fa fa-map-marker"
            aria-hidden="true"
            style="margin-left:4px;"
          ></i>
          本地音乐
        </li>
        <li class="li-title">
          <i class="fa fa-download" aria-hidden="true"></i>下载管理
        </li>
        <li class="li-title">
          <i class="fa fa-cloud-upload" aria-hidden="true"></i>我的音乐云盘
        </li>
        <li class="li-title">
          <i class="fa fa-user-circle" aria-hidden="true"></i>我的收藏
        </li>
      </div>
      <li class="li-title">创建的歌单</li>
      <div class="li-func">
        <li class="li-title" v-for="(item, index) in userPlayList" :key="index">
          <i v-if="index === 0" class="fa fa-heart" aria-hidden="true"></i>
          <i v-if="index > 0" class="fa fa-list" aria-hidden="true"></i
          >{{ item.name }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { mapState } from "vuex";
export default {
  name: "LeftMenu",
  //...mapMutations(['']),
  data() {
    return {
      isNextSong: true,
      isPlayOrPause: false,
      isPrevSong: false
    };
  },
  computed: {
    ...mapState({
      userPlayList: "userPlayList"
    })
    // ownPlayList () {
    //   return this.userPlayList.filter(function (item){
    //     return
    //   })
    // }
  },
  methods: {},
  mounted() {
    //let $this = this;
  }
};
</script>

<style lang="scss">
$activeColor: #3385ff;
$background: #191b1f;
#leftMenu {
  width: 200px;
  display: inline-block;
  background: $background;
  height: 100%;
  margin-bottom: 55px;
  overflow-x: hidden;
  overflow-y: auto;
}
.header {
  position: fixed;
  width: 200px;
  display: flex;
  background: lightgrey;
  justify-content: center;
  align-items: center;
  height: 175px;
  border: 1px solid $activeColor;
}
.userPlayList {
  margin-top: 10px;
  color: #7c7c7c;
  .li-title {
    color: #7c7c7c;
    margin-left: 10px;
  }
  li {
    list-style: none;
    width: 200px;
    display: block;
  }
  .li-func {
    width: 200px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-left: 15px;
    i {
      margin-right: 5px;
      font-size: 17px;
    }
    .li-title {
      color: #adafb2;
      margin-bottom: 10px;
    }
    .li-title:hover {
      color: #dcdde3;
      cursor: pointer;
    }
  }
}
</style>
