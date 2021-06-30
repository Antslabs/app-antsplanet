<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    append-to-body
    width="35%"
    @close="$emit('close')"
  >
    <div class="title flex j-center font-28 bottom-40">
      {{ title }}
      <img
        src="~/assets/images/close.png"
        class="abs close pointer"
        @click="$emit('close')"
      >
    </div>
    <slot />
    <div
      v-if="showConfirm"
      class="flex j-center pointer"
      @click="onConfirm"
    >
      <div class="radius-28 bg-gradient confirm white font-28 ">
        OK
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    onConfirm: {
      type: Function,
      default() {}
    },
    showConfirm: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  .title {
    color: black;
    position: relative;
    word-break: break-word;
  }
  .close {
    right: -40dpx;
    top: -20dpx;
    width: 46dpx;
  }
  .text-main{
    word-break: break-word;
  }
  .confirm {
    height: 56dpx;
    padding: 0 90dpx;
    line-height: 56dpx;
    display: inline-block;
    margin: 50dpx auto 0;
  }
  .el-dialog__body {
    padding: 0 50dpx 30dpx;
  }
  @media screen and (max-width: 768px) {
    width: auto !important;
    margin: 0 40rpx;
    padding-bottom: 20rpx;
    .el-dialog__body {
      .title {
        font-size: 36rpx;
        img {
          width: 40rpx;
          top: -40rpx;
        }
      }
      .connect-wallet {
        .link {
          width: 40rpx;
          height: 40rpx;
          img {
            width: 30rpx;
          }
        }
      }
    }
    .confirm {
      height: 46rpx;
      line-height: 46rpx;
      border-radius: 23rpx;
      width: 150rpx;
      text-align: center;
    }
  }
  @media screen and (min-width: 1920px) {

    .close {
    right: 0;
    top: -10px;
    width: 46px;
  }
  .confirm {
    height: 90px;
    padding: 0 90px;
    line-height: 90px;
    margin: 80px auto 0;
  }
  .el-dialog__body {
    padding: 0 40px 30px;
  }
  }
}
</style>
