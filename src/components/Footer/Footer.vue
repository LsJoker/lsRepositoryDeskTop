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
          :src="
            songData.perSongData &&
              songData.perSongData.al &&
              songData.perSongData.al.picUrl
          "
          width="40"
          height="40"
          alt=""
          srcset=""
        />
      </div>
      <div class="flex-column" style="padding:0 10px;">
        <div class="name">
          <span>{{
            (songData.perSongData && songData.perSongData.name) || ""
          }}</span>
          &nbsp;<span>-</span>&nbsp;
          <span>{{
            (songData.perSongData &&
              songData.perSongData.ar &&
              songData.perSongData.ar[0].name) ||
              "未知"
          }}</span>
        </div>
        <div class="func flex">
          <span class="love">{{
            songData.perSongData &&
              songData.perSongData.al &&
              songData.perSongData.al.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="setting justify-right">
      <div class="duration">
        <span
          >{{ current }} /
          <span v-if="songData.perSongData && songData.perSongData.dt">
            <span
              v-if="songData.perSongData.dt / (1000 * 60) >= 10"
              class="col-time"
            >
              {{ Math.floor(songData.perSongData.dt / (1000 * 60)) }}:
              <span
                v-if="Math.round((songData.perSongData.dt / 1000) % 60) < 10"
                >0</span
              >{{ Math.round(songData.perSongData.dt % (1000 * 60)) }}
            </span>
            <span v-else class="col-time">
              0{{ Math.floor(songData.perSongData.dt / (1000 * 60)) }}:
              <span
                v-if="Math.round((songData.perSongData.dt / 1000) % 60) < 10"
                >0</span
              >{{ Math.round((songData.perSongData.dt / 1000) % 60) }}
            </span></span
          >
          <span v-else> 00:00 </span>
        </span>
      </div>
      <div class="lyric"><span>Lyric</span></div>
      <div class="playList">
        <i class="fa fa-list-ul" aria-hidden="true" @click="showPlayList"></i>
      </div>
      <audio
        ref="audioTag"
        :src="songData && songData.urlData && songData.urlData[0].url"
      ></audio>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { clearTimeout } from "timers";
import { mapMutations, mapState } from "vuex";
//import { getMusicListJson } from "../../musicApi.js";
export default {
  name: "Header",
  //...mapMutations(['']),
  data() {
    return {
      isNextSong: true,
      isPlayOrPause: false,
      isPrevSong: false,
      songData: {},
      current: "00:00"
    };
  },
  computed: {
    ...mapState(["isShowPlayList", "perSongData", "playFlag"])
  },
  watch: {
    perSongData: function(val) {
      console.log(val);
      console.log(this);
      if (val) {
        this.songData = val;
      } else {
        alert("未获取到该歌曲数据");
      }
    },
    playFlag: function(val) {
      let $this = this;
      console.log(val);
      if (val === true) {
        $this.play();
      }
    }
  },
  methods: {
    ...mapMutations(["changeShowPlayList"]),
    //下一首
    nextSong() {
      let $this = this;
      $this.isNextSong = true;
      let setA = setTimeout(() => {
        $this.isNextSong = false;
      }, 1000);
      clearTimeout(setA);
    },
    //前一首
    prevSong() {
      let $this = this;
      $this.isPrevSong = true;
      let setA = setTimeout(() => {
        $this.isPrevSong = false;
      }, 1000);
      clearTimeout(setA);
    },
    //播放或者暂停
    playOrPause() {
      let $this = this;
      $this.isPlayOrPause = true;
      let setA = setTimeout(() => {
        $this.isPlayOrPause = false;
      }, 1000);
      clearTimeout(setA);
    },
    //展示播放列表
    showPlayList() {
      this.changeShowPlayList(!this.isShowPlayList);
    },
    //播放事件
    play() {
      let $this = this;
      $this.$refs.audioTag.oncanplay = function() {
        this.play();
        $this.updateTimeShow();
      };
    },
    //更新显示播放时间
    updateTimeShow() {
      let $this = this;
      $this.$refs.audioTag.ontimeupdate = function() {
        $this.current = this.currentTime;
      };
      // $this.$watch(
      //   "$refs.audioTag",
      //   val => {
      //     if (val.currentTime < 10) {
      //       $this.duration = "00:0" + val.currentTime;
      //     }
      //     // $this.duration
      //   },
      //   { deep: true }
      // );
    }
  },
  mounted() {
    //let $this = this;
  }
};
</script>

<style lang="scss">
$activeColor: #b82525;
#footer {
  position: fixed;
  width: 100%;
  bottom: 0px;
  flex: 0 0 50px;
  padding: 10px;
  background-color: #222225;
  color: #7a7a7c;
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
      background-color: #222225;
      cursor: pointer;
      &:hover {
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
      i:hover {
        color: #c20c0c;
      }
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
