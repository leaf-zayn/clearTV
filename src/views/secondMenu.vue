<template>
  <div class="secondMenu">
    <div><span class="title">影音娱乐</span></div>
    <div class="menuView">
      <div
        class="item"
        :class="{ active: currentIndex === i.index }"
        v-for="i in menu"
        :key="i.index"
        :style="{ backgroundImage: `url(${i.icon})` }"
      >
        <div class="i">
          {{ i.name }}
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import bottom from '../components/bottom.vue'
export default {
  components: {
    bottom
  },
  mounted () {
    document.onkeydown = (e) => {
      if (e.code === 'ArrowRight') {
        this.currentIndex++
        if (this.currentIndex > 3) {
          this.currentIndex = 0
        }
      }
      if (e.code === 'ArrowLeft') {
        this.currentIndex--
        if (this.currentIndex < 0) {
          this.currentIndex = 3
        }
      }
      if (e.code === 'ArrowUp' && this.currentIndex === 3) {
        this.currentIndex = 0
      }
      if (e.code === 'ArrowDown' && this.currentIndex !== 3) {
        this.currentIndex = 3
      }
      if (e.code === 'Enter') {
        this.$router.push(`/${this.menu[this.currentIndex].nextPage}`)
      }
      if (e.code === 'Escape') { this.$router.go(-1) }
    }
  },
  data () {
    return {
      menu: [{
        index: 0,
        icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/51e9743451d44c9e10ca584546782491_150469176875.png',
        name: '电影',
        nextPage: 'movies'
      },
      {
        index: 1,
        icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/95521bb744463633c858cc50abb44e7d_149999881738.png',
        name: '音乐',
        nextPage: 'music'
      },
      {
        index: 2,
        icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/b8f42cf3dc9ebf4252813b7dbfa3a296_154389559292.jpg',
        name: '手机投屏'
      },
      {
        index: 3,
        icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/2ada50c482fe429061c67dbe7d69e159_160784511705.png',
        name: 'HDMI'
      }
      ],
      currentIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.secondMenu {
  height: 95%;
  padding: 20px;
  text-align: left;
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  background-image: url("../assets/img/bg_window.png");
}
.title {
  color: wheat;
  font-size: xx-large;
  margin: 20px;
  text-align: center;
}
.menuView {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  .item {
    width: 414px;
    height: 234px;
    float: left;
    background-size: 100% 100%;
    margin-top: 15px;
    transition: transform 0.5s;
    transform: scale(0.85);
    line-height: 234px;
    text-align: center;
    font-size: 36px;
    color: #fff;
    text-shadow: 2px 2px 5px #000;
    border-radius: 8px;
    &.active {
      transform: scale(0.96);
      box-shadow: 0 0 20px #ffc853;
    }
  }
}

</style>
