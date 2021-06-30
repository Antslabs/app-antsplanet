<template>
  <div>
    <Header />
    <div class="flex column error-page a-center">
      <h1>
        An error occurred
      </h1>
      <a class="white bg-gradient pointer top-40" @click="reload">
        Reload
      </a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    reload () {
      window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.error-page{
  a {
    display: inline-block;
    height: 50dpx;
    border-radius: 25dpx;
    padding: 0 20dpx;
    line-height: 50dpx;
  }
  @media screen and (max-width: 768px) {
    margin-top: 40rpx;
    a {
      height: 50rpx;
      border-radius: 25rpx;
      padding: 0 20rpx;
      line-height: 50rpx;
    }
  }
}
</style>
