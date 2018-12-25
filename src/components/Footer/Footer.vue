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
        <span class="playBtn " :class="{ playingBtn: isPlayOrPause }"></span>
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
      <div class="playList" @click="showPlayList">
        playList <i class="fa fa-list-ul" aria-hidden="true"></i>
      </div>
      <audio
        ref="audioTag"
        :src="songData && songData.urlData && songData.urlData[0].url"
      ></audio>
    </div>
  </div>
</template>

<script>
//import "animate.css";
import { clearTimeout } from "timers";
import { mapMutations, mapState } from "vuex";
import { _Tool } from "../../tool.js";
import { getMusicUrlJson } from "../../musicApi.js";

export default {
  name: "Header",
  //...mapMutations(['']),
  data() {
    return {
      isNextSong: true,
      isPlayOrPause: false,
      isPrevSong: false,
      songData: {},
      current: "00:00",
      firstPlayFlag: true
    };
  },
  computed: {
    ...mapState([
      "isShowPlayList",
      "perSongData",
      "playFlag",
      "perPlayListDetail",
      "audio"
    ])
  },
  watch: {
    perSongData: function(val) {
      //console.log(val);
      //console.log(this);
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
      } else {
        $this.pause();
      }
    }
  },
  methods: {
    ...mapMutations([
      "changeShowPlayList",
      "SAVE_perSongData",
      "SAVE_playFlag"
    ]),
    //下一首
    nextSong() {
      let $this = this;
      $this.isNextSong = true;
      if ($this.perSongData.urlData.length > 0 && $this.firstPlayFlag) {
        $this.play();
        return;
      }
      let nextSongId;
      let perSongData;
      for (var i = 0; i < $this.perPlayListDetail.tracks.length; i++) {
        if (
          $this.perSongData.perSongData.id ===
          $this.perPlayListDetail.tracks[i].id
        ) {
          nextSongId = $this.perPlayListDetail.tracks[i + 1].id;
          perSongData = $this.perPlayListDetail.tracks[i + 1];
        }
      }
      //console.log(nextSongId);

      getMusicUrlJson({ id: nextSongId }).then(res => {
        let $this = this;
        if (res.data.code === 200) {
          let playSongdata = {
            urlData: res.data.data,
            perSongData: perSongData
          };
          //console.log(playSongdata);
          $this.SAVE_perSongData(playSongdata);
          $this.SAVE_playFlag(true);
        }
      });
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
      //if ()
      $this.isPlayOrPause = !$this.isPlayOrPause;
      if ($this.isPlayOrPause) {
        $this.play(true);
      } else {
        $this.pause(false);
      }
    },
    //展示播放列表
    showPlayList() {
      this.changeShowPlayList(!this.isShowPlayList);
    },
    //暂停事件
    pause() {
      let $this = this;
      $this.$refs.audioTag.pause();
    },
    //播放事件
    play(isPaused) {
      let $this = this;
      //跟新播放按钮的显示
      $this.isPlayOrPause = true;
      //取消则继续播放 多判断一次是否是应用第一次播放
      if ($this.$refs.audioTag.paused && !$this.firstPlayFlag && isPaused) {
        $this.$refs.audioTag.play();
        return;
      }
      //直接点击播放则播放当前列表的第一首;
      if (
        $this.perPlayListDetail &&
        $this.perPlayListDetail.tracks.length > 0 &&
        !$this.songData.urlData[0].url
      ) {
        $this.firstPlayFlag = false;
        let perSongData = $this.perPlayListDetail.tracks[0];
        let id = $this.perPlayListDetail.tracks[0].id;
        getMusicUrlJson({ id: id }).then(res => {
          let $this = this;
          if (res.data.code === 200) {
            let playSongdata = {
              urlData: res.data.data,
              perSongData: perSongData
            };
            //console.log(playSongdata);
            $this.SAVE_perSongData(playSongdata);
            $this.SAVE_playFlag(true);
          }
        });
      }
      //播放
      $this.$refs.audioTag.oncanplay = function() {
        $this.firstPlayFlag = false;
        this.play();
        $this.updateTimeShow();
      };
    },
    //更新显示播放时间
    updateTimeShow() {
      let $this = this;
      $this.$refs.audioTag.ontimeupdate = function() {
        $this.current = _Tool.fomatTime(this.currentTime);
      };
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
      .playingBtn {
        border-style: double;
        border-width: 0 0 0 14px;
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
