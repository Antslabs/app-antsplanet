<template>
  <div class="join bg-main">
    <Board />
    <Promise />
    <Pancake />
  </div>
</template>
<script>
import Promise from '../page-components/join/promise'
import Pancake from '../page-components/join/pancake'
import Board from '../page-components/join/board'
export default {
  name: 'Join',
  components: {
    Promise,
    Pancake,
    Board
  }
}
</script>

<style lang="scss" scoped>
.join {
  padding: 170dpx 200dpx 45dpx;
  .board {
    background-image: url('~assets/images/join.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-bottom: 45dpx;
    .title {
      padding: 66dpx 0 36dpx;
      font-size: 42dpx;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 115rpx 50rpx 32rpx;
  }
  @media screen and (min-width: 1920px) {
    width: 1800px;
    margin: 0 auto;
    padding: 170px 30px 45px;
  }
}
</style>
