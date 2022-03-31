<template>
  <div class="mainMenu">
    <div class="logo">
      <img src="../assets/img/music.svg" />
    </div>
    <div class="music-list-container" v-show="!isPlaying">
      <div class="music-pic" :style="{ backgroundImage: `url(${pic})` }"></div>
      <div class="music-list">
        <div
          class="item"
          :class="{ active: currentMusic === index }"
          v-for="(i, index) in music"
          :style="{ transform: `translateY(-${step * 60}px)` }"
          :key="index"
        >
          <img
            src="../assets/img/icon_play.png"
            :class="{ selected: currentPlaying === index }"
          />
          {{ i.Name[currentLang] }}
        </div>
      </div>
    </div>
    <div class="secondMenu">
      <div class="playingMenu" v-show="isPlaying">
        <div class="left">
          <img src="../assets/img/music_arrow_left.png" />
        </div>
        <div>
          <div class="music-player">
            <div
              class="pic"
              :style="{ backgroundImage: `url(${pic})` }"
              :class="{ paused: isPaused }"
            ></div>
            <div class="play-icon" v-show="isPaused"></div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/img/music_arrow_right.png" />
        </div>
        <div class="musicText">{{ music[currentMusic].Name[currentLang] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import musicData from '../mock/musicData.json'
export default {
  data () {
    return {
      currentMusic: 0,
      currentView: 0,
      step: 0,
      currentLang: 'zh-CN',
      musicData,
      music: musicData.Musics,
      currentPlaying: 0,
      isPlaying: false,
      isPaused: false
    }
  },
  computed: {
    pic () {
      return this.music[this.currentMusic].PicURL_ABS
    }
  },
  mounted () {
    const eventFn = {
      ArrowDown: () => {
        if (!this.isPlaying) {
          if (this.currentMusic < this.music.length - 1) {
            this.currentMusic++
            this.currentView++
            if (this.currentView > 7) {
              this.step++
              this.currentView = 7
            }
          }
        }
      },
      ArrowUp: () => {
        if (!this.isPlaying) {
          if (this.currentMusic > 0) {
            this.currentMusic--
            this.currentView--
            if (this.currentView < 0) {
              this.step--
              this.currentView = 0
            }
          }
        }
      },
      ArrowLeft: () => {
        if (this.isPlaying) {
          if (this.currentMusic > 0) {
            this.currentMusic--
            this.currentView--
            if (this.currentView < 0) {
              this.step--
              this.currentView = 0
            }
          }
          this.isPaused = false
          this.currentPlaying = this.currentMusic
        }
      },
      ArrowRight: () => {
        if (this.currentMusic < this.music.length - 1) {
          this.currentMusic++
          this.currentView++
          if (this.currentView > 7) {
            this.step++
            this.currentView = 7
          }
        }
        this.isPaused = false
        this.currentPlaying = this.currentMusic
      },
      Escape: () => {
        if (this.isPlaying === true) {
          this.isPlaying = false
        } else {
          this.$router.go(-1)
        }
      },
      Enter: () => {
        if (this.isPlaying === false) {
          this.isPlaying = true
          this.currentPlaying = this.currentMusic
          this.isPaused = false
        } else if (this.isPlaying === true) {
          this.isPaused = !this.isPaused
        }
      }
    }

    document.onkeydown = (e) => {
      if (eventFn[e.code]) {
        eventFn[e.code]()
      }
    }
  }
}
</script>

<style lang='scss'>
.mainMenu {
  background-image: url("../assets/img/bg_window.png");
  height: 95%;
  padding: 20px;
}
.logo {
  img {
    width: 40px;
  }
  margin: 10px 0px 0px 20px;
  text-align: left;
}
.music-list-container {
  height: 500px;
  margin: 50px 20px;
  display: flex;
  overflow: hidden;
  .music-pic {
    height: 500px;
    width: 500px;
  }
  .music-list {
    height: 1500px;
    width: 500px;
    margin-left: 150px;
    color: white;
    .item {
      font-size: 30px;
      margin: 20px 0px;
      opacity: 0.7;
      &.active {
        font-size: 35px;
        opacity: 1;
      }
      img {
        height: 30px;
        float: left;
        margin-left: 40px;
        margin-top: 8px;
        opacity: 0;
        &.selected {
          opacity: 1;
        }
      }
    }
  }
}
.secondMenu {
  display: grid;
  justify-content: center;
  height: 500px;
  .playingMenu {
    display: grid;
    grid-template-columns: 1fr 800px 1fr;
    align-items: center;
    justify-items: center;
    .music-player {
      width: 500px;
      height: 500px;
      position: relative;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        position: absolute;
        height: 120px;
      }
      .pic {
        background: center center no-repeat;
        box-shadow: 0 0 0px 40px rgb(255 255 255 / 20%);
        height: 400px;
        width: 400px;
        border-radius: 50%;
        animation: play linear 30s infinite;
        &.paused {
          animation-play-state: paused;
        }
      }
    }
  }
}
.musicText {
  font-size: 35px;
  color: white;
  margin-top: 15px;
  grid-row-start: 2;
  grid-column-start: 2;
}
@keyframes play {
  0% {
    -webkit-transform: rotate(0deg);
    /*-webkit-transform:rotate(0deg);*/
  }
  100% {
    /*顺时针旋转*/
    -webkit-transform: rotate(360deg);
    /*逆时针旋转*/
    /*-webkit-transform:rotate(-360deg);*/
  }
}

.play-icon {
  position: absolute;
  height: 400px;
  width: 400px;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.226) url("../assets/img/play.svg") center center
    no-repeat;
}
</style>
