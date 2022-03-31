<template>
  <div class="wrap" @click="$router.push({ path: '/mainMenu' })">
    <video class="video" ref="video" :src="url" controls muted autoplay></video>
    <div class="inner">
      <div class="wel-top">
        <div class="logo"><img :src="logo" /></div>
        <div class="content">
          <p class="title">
            亲爱的
            <span class="guest-name">贵宾</span>
          </p>
          <p class="text">
            欢迎来到南京悦榕庄酒店；充满生机与活力的城市气息，令人印象深刻的城市天际线和丰富多彩的文化。南京悦榕庄酒店是一间坐拥绝佳城市景观的都市度假酒店。
          </p>
        </div>
      </div>
      <div class="wel-bot">
        <span class="lang" :class="{ active: currentLang === 'zh-CN' }"
          >中文</span
        >
        <span class="lang" :class="{ active: currentLang === 'en' }"
          >English</span
        >

        <div class="item-wrap" style="text-align: right">
          <span class="info">切换语言</span>
          <span class="info">进入</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
export default {
  components: {

  },
  mounted () {
    document.onkeydown = (e) => {
      if (e.code === 'Enter') {
        this.$router.push({ path: '/mainMenu' })
      }
      if (e.code === 'Escape') { this.$router.go(-1) }
    }
  },
  data () {
    return {

      currentLang: 'zh-CN',
      url: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/c4ce26cd5a7bfc28ce5c667a01b19f1b_160776555804.mp4',
      logo: 'http://iptvdemo.cleartv.cn/openvod_srlth/now//Main/resource/02b1aecf417bdd33ecca157ef3b3e8a7_160777380845.png'
    }
  },

  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scope>
.video {
  width: 1280px;
  height: 720px;
  position: absolute;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner {
  width: 1000px;
  height: 458px;
  //   background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  .wel-top {
    width: 100%;
    height: 390px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px 10px 0 0;
    display: grid;
    grid-template-columns: 325px 1fr;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 160px;
      }
    }
    .content {
      float: right;
      width: 675px;
      overflow: hidden;
      text-overflow: ellipsis;

      .title {
        margin-top: 70px;
        font-size: 32px;
        color: white;
        text-align: left;
        line-height: 45px;
      }

      .guest-name {
        font-size: 38px;
        color: #fff4c1;
      }

      .text {
        width: 624px;
        font-size: 32px;
        margin-top: 15px;
        line-height: 42.7px;
        color: white;
        text-indent: 2em;
        text-align: left;
      }
    }
  }
}
.wel-bot {
  width: 100%;
  height: 66px;
  margin: 2px auto 0;
  border-radius: 0 0 10px 10px;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 160px 160px 1fr;
  line-height: 66px;
  .item-wrap {
    flex: 1;
    text-align: left;
  }

  .lang {
    color: white;
    font-size: 30px;
    width: 160px;
    text-align: center;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    margin-top: 8px;
    &.active {
      background-color: royalblue;
    }
    &:first-child {
      margin-left: 10px;
    }
  }
  .info {
    color: white;
    font-size: 30px;
    width: 160px;
    padding: 0 15px;
  }
}
</style>
