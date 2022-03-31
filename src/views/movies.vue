<template>
  <div class="mainView">
    <div v-show="!isPlaying">
      <div class="top-wrap">
        <div
          class="bg"
          :style="{
            backgroundImage: `url(${currentMovie.PicURL_ABS})`,
          }"
        ></div>
        <div class="movie-detail">
          <div class="title">电影</div>
          <div class="name">
            {{ currentMovie.Name[currentLang] }}
          </div>
          <div class="director">
            {{ currentMovie.Director[currentLang] }}
          </div>
          <div class="actor">
            {{ currentMovie.Actor[currentLang] }}
          </div>
          <div class="info">
            {{ currentMovie.Introduce[currentLang] }}
          </div>
        </div>
      </div>
      <div>
        <div class="type-container">
          <div class="movie-type">
            <div class="topArrow">
              <img src="../assets/img/arrow_up.png" />
            </div>
            <div class="type-name">
              {{ movieType[target.type].CategoryName[currentLang] }}
            </div>
            <div class="type-index">
              ({{ target.type + 1 }}/{{ movieType.length }})
            </div>
            <div class="downArrow">
              <img src="../assets/img/arrow_down.png" />
            </div>
          </div>
          <div class="movie-list">
            <div class="arrow-left">
              <img
                src="../assets/img/arrow-left.svg"
                :style="{ opacity: target.idx >= 6 ? 0.7 : 0 }"
              />
            </div>
            <div class="scroll-wrap">
              <div
                class="scroll-inner"
                style="display: flex"
                :style="{ transform: `translateX(-${step * 180}px)` }"
              >
                <div
                  :class="{ active: target.idx === index }"
                  class="item"
                  v-for="(movie, index) in currentMovieList"
                  :key="index"
                  :style="{
                    backgroundImage: `url(${currentMovieList[index].PicURL_ABS})`,
                  }"
                >
                  <!-- <div class="i">
                  <img :src="currentMovieList[index].PicURL_ABS" />
                </div> -->
                </div>
              </div>
            </div>
            <div class="arrow-right">
              <img
                src="../assets/img/arrow-right.svg"
                :style="{
                  opacity: showRightArrow ? 0.7 : 0,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isPlaying">
      <video
        class="video"
        ref="video"
        :src="url"
        controls
        muted
        autoplay
      ></video>
    </div>
  </div>
</template>

<script>
import movieData from '@/mock/movieData'

export default {
  mounted () {
    const eventFn = {
      ArrowRight: () => {
        if (this.target.idx < this.currentMovieList.length - 1) {
          this.target.idx++
          this.currentViewIdx++
        }
        if (this.currentViewIdx > 5) {
          this.currentViewIdx = 5
          this.step++
        }
      },
      ArrowLeft: () => {
        if (this.target.idx > 0) {
          this.target.idx--
          this.currentViewIdx--
        }
        if (this.currentViewIdx < 0) {
          this.currentViewIdx = 0
          this.step--
        }
      },
      ArrowDown: () => {
        if (this.target.type < 10) {
          this.target.type++
          this.target.idx = 0
          this.currentViewIdx = 0
          this.step = 0
          if (this.target.type === 10) {
            this.target.type = 0
            this.currentViewIdx = 0
            this.step = 0
          }
        }
      },
      ArrowUp: () => {
        if (this.target.type > -1) {
          this.target.type--
          this.target.idx = 0
          this.currentViewIdx = 0
          this.step = 0
          if (this.target.type === -1) {
            this.target.type = 9
            this.currentViewIdx = 0
            this.step = 0
          }
        }
      },
      Escape: () => {
        if (this.isPlaying === true) {
          this.isPlaying = false
        } else {
          this.$router.go(-1)
        }
      },
      Enter: () => {
        this.isPlaying = true
      }
    }

    document.onkeydown = (e) => {
      if (eventFn[e.code]) {
        eventFn[e.code]()
      }
    }
  },
  data () {
    return {
      isPlaying: false,
      currentLang: 'zh-CN',
      movieData,
      movies: movieData.Movies,
      tags: movieData.Tags,
      target: {
        type: 0,
        idx: 0
      },
      currentViewIdx: 0,
      step: 0
    }
  },
  methods: {
    listMovie (idx) {
      return this.movies.filter((item) => {
        return item.Tags.find(i => i.TagID === this.movieType[idx].ID)
      })
    }
  },
  computed: {
    movieType () {
      return this.tags
        .filter((tag, index) => {
          return this.movies.filter((item) => {
            return item.Tags.find(i => i.TagID === tag.ID)
          }).length
        })
    },
    currentMovie () {
      return this.currentMovieList[this.target.idx]
    },
    currentMovieList () {
      return this.listMovie(this.target.type)
    },
    showRightArrow () {
      return !(this.target.idx === this.currentMovieList.length - 1) && (this.currentMovieList.length > 6)
    },
    url () {
      return `http://iptvdemo.cleartv.cn/openvod_srlth/now/${this.currentMovie.URL}`
    }
  }
}

</script>

<style lang="scss" scoped>
.mainView {
  display: grid;
  grid-template-rows: 60% 1fr;
  height: 95%;
  padding: 20px;
  background-image: url(../assets/img/bg_window.png);
}
.top-wrap {
  position: relative;
  .bg {
    background: url("http://mres.cleartv.cn/default/362186b0e7ce901f1f0db0b66fa0421b_16058512848.jpg")
      center center no-repeat;
    background-size: cover;
    filter: blur(5px);
    opacity: 0.5;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}

.movie-detail {
  width: 700px;
  text-align: left;
  color: white;
  padding: 30px;
  position: relative;
  z-index: 100;
  .title {
    color: wheat;
    font-size: 28px;
  }
  .name {
    font-size: 32px;
    height: 90px;
    line-height: 90px;
  }
  .director {
    font-size: 22px;
    line-height: 30px;
  }
  .actor {
    font-size: 22px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info {
    height: 165px;
    font-size: 18px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.type-container {
  display: grid;
  grid-template-columns: 90px 1fr;
}
.movie-type {
  display: grid;
  grid-template-rows: 1fr 1fr 28px 1fr;
  text-align: center;
  font-size: 33.33px;
  color: #fff;
  width: 116.66px;
  margin: 32px 0px;
  height: 200px;
  img {
    width: 30px;
  }
  .type-index {
    font-size: 20px;
  }
}
.movie-list {
  display: grid;
  grid-template-columns: 35px 1fr 35px;
  align-items: center;
  .scroll-wrap {
    overflow: hidden;
    height: 100%;
    width: 1500%;
    .scroll-inner {
      transition: all 0.5s;
      transform: translateX(0);
      height: 100%;
      width: 150%;
    }
    .item {
      border-radius: 10px;
      width: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      transform: scale(0.8);
      transition: transform 0.5s;
      background: center center / cover no-repeat;
      &.active {
        transform: scale(0.9);
        box-shadow: 0 0 20px #ffc853;
      }
      .i {
        color: white;
        font-size: 25px;
      }
    }
  }
}
.video {
  width: 1280px;
  height: 720px;
  position: absolute;
  left: 0%;
  top: 0%;
}
</style>
