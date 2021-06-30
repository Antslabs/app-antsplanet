<template>
  <div class="count-down flex j-between">
    <div class="item">
      <div class="text-main">
        DAYS
      </div>
      <div class="bg-gradient">{{ time[0] }}</div>
    </div>
    <div class="divider">
      :
    </div>
    <div class="item">
      <div class="text-main">
        HOURS
      </div>
      <div class="bg-gradient">{{ time[1] }}</div>
    </div>
    <div class="divider">
      :
    </div>
    <div class="item">
      <div class="text-main">
        MINUTES
      </div>
      <div class="bg-gradient">{{ time[2] }}</div>
    </div>
    <div class="divider">
      :
    </div>
    <div class="item">
      <div class="text-main">
        SECONDS
      </div>
      <div class="bg-gradient">{{ time[3] }}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Count',
  data() {
    return {
      time: ['', '', '', ''],
      timer: null,
      showCount: true
    }
  },
  computed: {
    ...mapState(['endTime'])
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time = this.formatTime(this.endTime)
    }, 1000)
  },
  methods: {
    ...mapMutations(['startJoin']),
    formatTime(end) {
      const current = new Date().getTime() / 1000
      // const end = new Date(endDate).getTime() / 1000
      if (end - current < 1) {
        clearInterval(this.timer)
        this.showCount = false
        this.startJoin(false)
        return ['', '', '', '']
      } else {
        let interval = Math.abs(end - current)
        const secUnit = 1
        const minUnit = 60
        const hrUnit = 60 * 60
        const dayUnit = 24 * hrUnit
        const arr = []
        const unit = [dayUnit, hrUnit, minUnit, secUnit]
        let n = 0
        while (n < 4) {
          arr.push(Math.floor(interval / unit[n]))
          interval = interval - unit[n] * arr[n]
          n++
        }
        return arr
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.count-down {
  margin: 45dpx 520dpx 0;
  .divider {
    font-size: 80dpx;
    display: flex;
    align-items: center;
    color: #999;
    margin-top: 24dpx;
  }
  .item {
    width: 140dpx;
    div:last-child {
      margin: 0 auto;
      width: 112dpx;
      height: 124dpx;
      border-radius: 28dpx;
      font-size: 68dpx;
      font-weight: bold;
      color: white;
      margin-top: 15dpx;
      line-height: 124dpx;
      position: relative;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 42rpx 84rpx;
    .item {
      width: 120rpx;
      div:last-child {
        width: 80rpx;
        height: 88rpx;
        border-radius: 20rpx;
        line-height: 88rpx;
        font-size: 48rpx;
        margin-top: 10rpx;
      }
    }
  }
  @media screen and (min-width: 1920px) {
    margin: 45px 520px 0;
  .divider {
    font-size: 80px;
    margin-top: 24px;
  }
  .item {
    width: 140px;
    .text-main{
      font-size: 28px
    }
    div:last-child {
      width: 112px;
      height: 124px;
      border-radius: 28px;
      font-size: 68px;
      margin-top: 15px;
      line-height: 124px;
    }
  }
  }
}
</style>
