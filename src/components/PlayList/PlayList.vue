<template>
  <div
    id="playList"
    v-if="isShowPlayList && perPlayListDetail.tracks.length > 0"
  >
    <div class="tab">
      <div class="title-div">
        <li class="tab-left">播放列表</li>
        <li class="tab-right">历史记录</li>
      </div>
    </div>
    <div class="playList-info">
      <div>
        <span class="info-left">总{{ perPlayListDetail.trackCount }}首</span>
        <span class="info-right">
          <span class="collectAll-span">
            <i class="fa fa-folder-open-o" aria-hidden="true"></i>收藏全部
          </span>
          <span class="clear-span">
            <i class="fa fa-trash-o" aria-hidden="true"></i>清空
          </span>
        </span>
      </div>
    </div>
    <div class="playListDiv">
      <li
        class="row"
        v-for="(item, index) in perPlayListDetail.tracks"
        :key="index"
      >
        <span class="col">
          <span class="musicName" @dblclick="getMusicUrl(item.id, item);">
            {{ item.name }}</span
          ><i v-if="item.mv" class="fa fa-play-circle-o" aria-hidden="true"></i>
        </span>
        <span v-if="item.ar.length > 0" class="col-name">
          {{ item.ar[0].name }}
        </span>
        <span v-else class="col-name"> 未知艺人 </span>
        <span class="col-link">
          <i class="fa fa-link" aria-hidden="true"></i>
        </span>
        <span v-if="item.dt / (1000 * 60) >= 10" class="col-time">
          {{ Math.floor(item.dt / (1000 * 60)) }}:
          <span v-if="Math.round((item.dt / 1000) % 60) < 10">0</span
          >{{ Math.round(item.dt % (1000 * 60)) }}
        </span>
        <span v-else class="col-time">
          0{{ Math.floor(item.dt / (1000 * 60)) }}:
          <span v-if="Math.round((item.dt / 1000) % 60) < 10">0</span
          >{{ Math.round((item.dt / 1000) % 60) }}
        </span>
      </li>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getMusicUrlJson } from "../../musicApi.js";
export default {
  name: "PlayList",
  props: { isShowPlayList: Boolean },
  computed: {
    ...mapState(["perPlayListDetail"])
  },
  methods: {
    ...mapMutations(["SAVE_perSongData"]),
    getMusicUrl(id, perSongData) {
      getMusicUrlJson({ id: id }).then(res => {
        let $this = this;
        if (res.data.code === 200) {
          let playSongdata = {
            urlData: res.data.data,
            perSongData: perSongData
          };
          //console.log(playSongdata);
          $this.SAVE_perSongData(playSongdata);
        }
      });
    }
  },
  mounted() {
    //console.log(this.isShowPlayList);
  }
};
</script>

<style lang="scss">
$activeColor: #c20c0c;
$background: #282a2e;
#playList {
  width: 575px;
  border-top: 1px solid #313337;
  border-left: 1px solid #313337;
  color: #dcdde4;
  height: 70%;
  background: $background;
  position: fixed;
  right: 0px;
  bottom: 63px;
  .title-div {
    text-align: center;
    padding-top: 2px;
    padding-bottom: 2px;
    border-bottom: 1px solid #313337;
    .tab-left {
      border-top-left-radius: 3px;
      background-color: #3a3a3f;
      border-bottom-left-radius: 3px;
    }
    .tab-right {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      color: #686a6e;
    }
    li {
      display: inline-block;
      border: 1px solid #3a3a3f;
      margin-top: 3px;
      margin-bottom: 3px;
      padding: 3px 20px;
    }
  }
  .playList-info {
    padding: 5px 0px;
    border-bottom: 1px solid #313337;
    height: 30px;
    color: #828385;
    div {
      position: relative;
      .info-left,
      .info-right {
        position: absolute;
      }
      .info-left {
        left: 20px;
      }
      .info-right {
        right: 20px;
        i {
          margin-right: 5px;
        }
        span:hover {
          cursor: pointer;
          color: #dcdde4;
        }
        .collectAll-span {
          padding-right: 10px;
          border-right: 1px solid #313337;
        }
        .clear-span {
          padding-left: 10px;
        }
      }
    }
  }
  li {
    list-style: none;
  }
  .row:nth-of-type(even) {
    background-color: #303236;
  }
  .playListDiv {
    width: 100%;
    height: 400px;
    overflow-y: auto;
  }
  .row {
    line-height: 20px;
    width: 100%;
    padding-left: 20px;
    padding-top: 3px;
    padding-bottom: 3px;
    color: #dcdde4;
    .fa-play-circle-o {
      cursor: pointer;
      color: #c20c0c;
      margin-left: 5px;
    }
    .col-name {
      display: inline-block;
      color: #5f5f63;
      width: 120px;
    }
    .col-link {
      color: #5f5f63;
    }
    .col-time {
      margin-left: 10px;
      color: #798385;
    }
    .col {
      .musicName {
        cursor: pointer;
      }
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 350px;
    }
  }
}
</style>
