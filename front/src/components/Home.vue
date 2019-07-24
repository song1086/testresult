<template>
  <div class="bg">

      <img src="@/assets/logo.png" alt="">

    <div class="area">
      <div @click="golink(0)">概要</div>
      <div @click="golink(1)">详情</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    golink (type) {
      if (type) {
        this.$router.push('/detail')
      } else {
        this.$router.push('/summary')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  img{
    width: 100%;
    height: 100px;
  }
  .area {
    display: flex;
    flex-direction: row;
    width: 60%;
    align-self: center;
    justify-content: space-around;
    div {
      width: 200px;
      height: 200px;
      border-radius: 20px;
      border-width: 1px;
      border-color: #909090;
      border-style: dotted;
      text-align: center;
      line-height: 200px;
      background-color: #f0f0f0
    }
  }
}
</style>
