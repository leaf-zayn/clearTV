<template>
  <div class="bottom">
    <div>
      <div class="b-items" style="margin-left: 50px">
        按<img src="../assets/img/icon_toolbar_select.png" />选择
      </div>
    </div>
    <div>|</div>
    <div>
      <div class="b-items">
        按 <img src="../assets/img/icon_toolbar_menu1.png" /> 进入
      </div>
    </div>
    <div>|</div>
    <div>
      <div class="b-items">
        按<img src="../assets/img/icon_toolbar_back.png" />返回
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.bottom {
  display: flex;
  align-items: center;
  color: white;
  text-align: center;
  .b-items {
    display: flex;
    align-items: center;
    font-size: xx-large;
    margin: 0px 25px;
    img {
      margin: 0 10px;
    }
  }
}
</style>
