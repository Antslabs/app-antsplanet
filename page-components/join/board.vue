<template>
  <div class="board-componenps">
    <div class="contented-mobile">
      <div
        v-if="!connected"
        class="unconnected"
      >
        Not connected to wallet
      </div>
      <div
        v-else
        class="connected"
      >
        <div>Invited Address : {{ inviteNum }}</div>
        <div>Rewards Multiplier : {{ reward }}</div>
      </div>
    </div>
    <div class="board">
      <div class="title">
        {{ joined ? 'As a Member of Credit Plan':'Join in the Credit Plan' }}
      </div>
      <div class="text-main">
        {{ joined ? 'Copy and share the invitation address  to invite more partipate to get more incentives' : 'You shall deposit more than 0.25 FIL as the balance in your FIL address and with an invitation address' }}
      </div>
      <div v-if="isSucess" class="count-fil">
        <Count v-if="start" />
        <Fil
          v-else
          :address="address"
          :open-id="openId"
          :sitekey="sitekey"
          @join="setJoin"
        />
      </div>

      <div class="status abs text-main">
        <div
          v-if="!connected"
          class="unconnected"
        >
          Not connected to wallet
        </div>
        <div
          v-else
          class="connected"
        >
          <div>Invited Address : {{ inviteNum }}</div>
          <div>Rewards Multiplier : {{ reward }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Count from './count.vue'
import Fil from './fil.vue'
export default {
  name: 'Board',
  components: {
    Count,
    Fil
  },
  data() {
    return {
      inviteNum: 0,
      reward: 0,
      openId: '',
      isSucess: false,
      sitekey: ''// 6LdzoiYbAAAAAKHo7azjcS0zPiFi4WrtsOrtV4bJ
    }
  },
  computed: {
    ...mapState(['connected', 'start', 'address', 'endTime', 'joined'])
  },
  watch: {
    connected: {
      handler(v) {
        this.getInfo()
      },
      immediate: true
    }
  },
  created() {
    console.log('load.')
    this.getTimes()
  },
  methods: {
    ...mapMutations(['startJoin', 'set_endTime', 'set_join']),
    setJoin(flag = true) {
      this.getInfo()
    },
    async getTimes() {
      try {
        const res = await this.$axios.$get(
          '/api/tokens'
        )
        this.isSucess = true
        const { code, data } = res
        if (code === 200) {
          const obj = data.find(n => {
            return n.symbol === 'FIL'
          })
          const t = obj && obj.start_at || 0
          this.set_endTime(t)
          const current = new Date().getTime() / 1000
          if (this.endTime - current > 1) {
            this.startJoin(true)
          }
        }
      } catch (e) {
        this.isSucess = true
        console.log(e)
      }
    },
    async getInfo() {
      try {
        const res = await this.$axios.$get(
          '/api/address/info?symbol=FIL&address=' + this.address
        )
        const { code, data } = res
        if (code === 200) {
          this.inviteNum = data.invite_count
          const joined = data.join
          this.set_join(joined)
          this.reward = data.invite_ratio
          this.sitekey = data.recaptcha
          if (joined) {
            this.openId = data.open_id
          }
        } else {
          this.inviteNum = 0
          this.set_join(false)
          this.reward = 0
        }
      } catch (e) {
        this.set_join(false)
        this.reward = 0
        this.inviteNum = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.board-componenps {
  .contented-mobile{
    display: none;
  }
  .board{
    position: relative;
    background-image: url('~assets/images/join.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-bottom: 45dpx;
  }
  .title {
    padding: 66dpx 0 36dpx;
    font-size: 42dpx;
  }
  .status {
    right: 0;
    top: 20dpx;
    width: 100%;
    font-size: 20dpx;
  }
  .unconnected{
    text-align: right;
    padding:0 30dpx;
  }
  .connected{
    display: flex;
    padding:0 30dpx;
    justify-content: space-between;
  }
}
@media screen and (max-width: 768px) {
  .board-componenps {
    .contented-mobile {
      display: block;
      padding-bottom: 15rpx;
      font-size: 13rpx;
      color: #999999;
      .unconnected {
        text-align: right;
        font-size: 24rpx;
      }
      .connected {
        display: flex;
        justify-content: space-between;
      }
    }
    .board{
      padding: 20rpx !important;
      background-image: url('~assets/images/join-mobile.png') !important;
    }
    .title {
      font-size: 28rpx;
      padding-top: 30rpx;
    }
    .status {
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      display: none;
      & > div {
        width: 100%;
      }
    }
  }
}
@media screen and (min-width: 1920px) {
  .board-componenps{
    .board{
      padding-bottom: 45px;
    }
    .title {
      padding: 66px 0 36px;
      font-size: 42px;
    }
    div{
      font-size: 28px
    }
    .status {
      right: 60px;
      top: 66px;
      div{
        font-size: 28px
      }
    }
  }
}
</style>
