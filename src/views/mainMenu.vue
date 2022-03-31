<template>
  <div class="mainMenu">
    <div class="logo">
      <img :src="logo" />
    </div>
    <div class="menuView">
      <div class="arrow-left">
        <img
          src="../assets/img/arrow-left.svg"
          :style="{ opacity: currentIndex > 3 ? 1 : 0 }"
        />
      </div>
      <div class="scroll-wrap">
        <div
          class="scroll-inner"
          style="display: flex"
          :style="{ transform: `translateX(-${step * 292.5}px)` }"
        >
          <div
            class="item"
            :class="{ active: currentIndex === i.index }"
            v-for="i in menus"
            :key="i.index"
            :style="{ backgroundImage: `url(${i.icon})` }"
          >
            <div class="i">
              {{ i.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="arrow-right">
        <img
          src="../assets/img/arrow-right.svg"
          :style="{ opacity: currentIndex >= 5 ? 0 : 1 }"
        />
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
      if (e.code === 'ArrowRight' && this.currentIndex < 5) {
        this.currentIndex++
      }
      if (e.code === 'ArrowLeft' && this.currentIndex > 0) {
        this.currentIndex--
      }
      if (e.code === 'Enter') {
        this.$router.push(`/mainMenu/${this.menus[this.currentIndex].nextPage}`)
      }
      if (e.code === 'Escape') { this.$router.go(-1) }
    }
  },
  data () {
    return {
      currentIndex: 0,
      logo: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/02b1aecf417bdd33ecca157ef3b3e8a7_160777380845.png',
      menus: [
        {
          index: 0,
          icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/a8a63b4d63a08aed720d0f5f249e07d9_149966129061.png',
          name: '直播电视',
          nextPage: 'live'
        },
        {
          index: 1,
          icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/c4ca4238a0b923820dcc509a6f75849b_149922549471.png',
          name: '影音娱乐',
          nextPage: 'secondMenu'
        },
        {
          index: 2,
          icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/224e12e6c018eb59b806be2e760dfaa8_151814443886.png',
          name: '商城',
          nextPage: 'shoppingMall'
        },
        {
          index: 3,
          icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/c14252df736687bcc2bcca75b30d2b76_149930402083.png',
          name: '餐饮',
          nextPage: 'food'
        },
        {
          index: 4,
          icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/69266c67e75c946ef9b4144b0554326d_149930572925.png',
          name: '商旅',
          nextPage: 'travel'
        },
        {
          index: 5,
          icon: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/2334aaed616001fae94d5e4ea13e0f85_154277125869.png',
          name: '我的酒店',
          nextPage: 'hotel'
        }
      ]
    }
  },
  computed: {
    step () {
      return this.currentIndex < 3 ? 0 : this.currentIndex - 3
    }
  }
}
</script>

<style lang="scss" scoped>
.mainMenu {
  height: 95%;
  padding: 20px;
  text-align: left;
  display: grid;
  .logo {
    img {
      height: 70px;
    }
  }
  grid-template-rows: 80px 1fr 80px;
  background-image: url("../assets/img/bg_window.png");
}
.menuView {
  height: 100%;
  display: grid;
  grid-template-columns: 35px 1fr 35px;
  align-items: center;
}
.scroll-wrap {
  overflow: hidden;
  height: 100%;
  .scroll-inner {
    transition: all 0.5s;
    transform: translateX(0);
    height: 100%;
    width: 150%;
  }
  .item {
    border-radius: 10px;
    width: 292.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transform: scale(0.8);
    transition: all 0.5s;
    background: center center no-repeat;
    background-size: contain;
    &.active {
      transform: scale(1);
    }
    .i {
      color: white;
      font-size: 25px;
      margin: 80px 0px 0px;
    }
  }
}
</style>
