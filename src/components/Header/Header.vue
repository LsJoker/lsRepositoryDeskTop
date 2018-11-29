<template>
  <div id="header" class="align-center drag space-between">
    <div class="header-l flex no-drag"><span class="logo">0..0
      </span></div>
    <div class="header-r flex no-drag">
      <div class="minWrapper align-center" @click="minWindow">
        <span class="appHide"></span>
      </div>
      <div class="maxWrapper align-center" @click="maxWindow">
        <span class="appShow"></span>
      </div>
      <div class="closeWrapper" @click="closeWindow">
        <span class="appClose"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "Header",
  methods: {
    minWindow() {
      ipcRenderer.send("hide-window");
    },
    maxWindow() {
      ipcRenderer.send("toggle-window");
    },
    closeWindow() {
      ipcRenderer.send("window-all-closed");
    }
  }
};
</script>

<style lang="scss">
$activeColor: #3385ff;
#header {
  flex: 0 0 50px;
  padding: 0 10px;
  // background-color: #c62f2f;
  background-color: #444;
  color: #fff;
  .logo {
    font-size: 16px;   
    text-shadow: #3385ff 0 0 1px;
  }
}
.logo:hover {
  cursor:pointer;
  color: #3385ff;
  background-color: #444;
}
.minWrapper {
  min-width: 26px;
  padding: 0 7px;
  cursor: pointer;
  &:hover {
    .appHide {
      border: 0.5px solid $activeColor;
    }
  }
  .appHide {
    display: inline-block;
    width: 11px;
    border: 0.5px solid #ccc;
  }
}
.maxWrapper {
  min-width: 26px;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    .appShow {
      border: 0.5px solid $activeColor;
    }
  }
  .appShow {
    display: inline-block;
    width: 10px;
    height: 8px;
    border: 0.5px solid #ccc;
  }
}
.closeWrapper {
  min-width: 26px;
  padding: 3px 12px 0 12px;
  cursor: pointer;
  &:hover {
    .appClose,
    .appClose:after {
      width: 1px;
      background-color: $activeColor;
    }
  }
  .appClose {
    position: relative;
    width: 1px;
    height: 12px;
    background-color: #ccc;
    transform: rotate(130deg);
    display: inline-block;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 12px;
      background-color: #ccc;
      transform: rotate(280deg);
    }
  }
}
</style>
