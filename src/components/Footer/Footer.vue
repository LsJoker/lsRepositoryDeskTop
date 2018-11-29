<template>
  <div id="footer" class="align-center space-between">
    <div class="control space-between align-center">
      <div
        class="prevWrapper center animated"
        :class="{ pulse: isPrevSong }"
        @click="prevSong"
      >
        <span class="prevBtn"></span>
      </div>
      <div
        class="playWrapper center animated"
        :class="{ pulse: isPlayOrPause }"
        @click="playOrPause"
      >
        <span class="playBtn"></span>
      </div>
      <div
        class="nextWrapper center animated"
        :class="{ pulse: isNextSong }"
        @click="nextSong"
      >
        <span class="nextBtn"></span>
      </div>
    </div>
    <div class="songInfo flex">
      <div class="icon align-center">
        <img
          src="../../assets/logo.png"
          width="40"
          height="40"
          alt=""
          srcset=""
        />
      </div>
      <div class="flex-column" style="padding:0 10px;">
        <div class="name">
          <span>TestName</span> &nbsp;<span>-</span>&nbsp; <span>A artist</span>
        </div>
        <div class="func flex">
          <span class="love">L</span> <span class="download">D</span>
          <span class="more">M</span>
        </div>
      </div>
    </div>
    <div class="setting justify-right">
      <div class="duration"><span>00:59 / 03:45</span></div>
      <div class="lyric"><span>Lyric</span></div>
      <div class="playList animated swing"><span>SongList</span></div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { clearTimeout } from "timers";
//import { getMusicListJson } from "../../musicApi.js";
export default {
  name: "Header",
  //...mapMutations(['']),
  data() {
    return {
      isNextSong: true,
      isPlayOrPause: false,
      isPrevSong: false
    };
  },
  methods: {
    nextSong() {
      let $this = this;
      $this.isNextSong = true;
      let setA = setTimeout(() => {
        $this.isNextSong = false;
      }, 1000);
      clearTimeout(setA);
    },
    prevSong() {
      let $this = this;
      $this.isPrevSong = true;
      let setA = setTimeout(() => {
        $this.isPrevSong = false;
      }, 1000);
      clearTimeout(setA);
    },
    playOrPause() {
      let $this = this;
      $this.isPlayOrPause = true;
      let setA = setTimeout(() => {
        $this.isPlayOrPause = false;
      }, 1000);
      clearTimeout(setA);
    }
  },
  mounted() {
    //let $this = this;
  }
};
</script>

<style lang="scss">
$activeColor: #3385ff;
#footer {
  position: fixed;
  width: 100%;
  bottom: 0px;
  flex: 0 0 50px;
  padding: 10px;
  background-color: #ddd;
  color: #333;
  .songInfo {
    flex: 1 0 200px;
  }
  .control {
    flex: 0 0 150px;
    margin-left: 15px;
    margin-right: 20px;
    .prevWrapper,
    .playWrapper,
    .nextWrapper {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid $activeColor;
      background-color: #ccc;
      cursor: pointer;
      &:hover {
        background-color: #bbb;
        box-shadow: 0px 0px 2.5px 1px $activeColor;
      }
    }
    .playWrapper {
      width: 40px;
      height: 40px;
      &:hover {
        .playBtn {
          border-style: double;
          border-width: 0 0 0 14px;
        }
      }
      .playBtn {
        height: 18px;
        border-style: solid;
        border-width: 10px 0 10px 14px;
        border-color: transparent transparent transparent $activeColor;
        transition: all 0.3s ease;
      }
      .pauseBtn {
        height: 18px;
        border-style: solid;
        border-width: 0 0 0 14px;
        border-color: transparent transparent transparent $activeColor;
        transition: all 0.3s ease;
      }
    }
    .prevBtn,
    .nextBtn {
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
    }
    .prevBtn {
      margin-left: -14px;
      border-left: 10px solid transparent;
      border-right: 10px solid $activeColor;
    }
    .nextBtn {
      margin-left: 14px;
      border-left: 10px solid $activeColor;
      border-right: 10px solid transparent;
    }
  }
  .setting {
    flex: 1 0 200px;
    .duration,
    .lyric,
    .playList {
      padding: 4px;
      margin: 0 4px;
    }
    .lyric,
    .playList {
      cursor: pointer;
    }
  }
  .func {
    span {
      padding: 0 3px;
    }
  }
}
</style>
