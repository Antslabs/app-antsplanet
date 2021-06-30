<template>
  <div class="promise ">
    <div class="title">
      Credit Plan
    </div>
    <div class="sub-title font-20">Credit Staking Pool tokens to earn</div>
    <div class="bg-white radius-28 main">
      <div class="flex">
        <div class="mobile-top">
          <div class="mobile-chain flex a-center">
            <div class="fil flex a-center j-center">
              <img
                src="~/assets/images/filecoin.png"
                alt=""
              >
            </div>
            <div class="font-28">
              FIL
            </div>
          </div>
          <div class="mobile-withdraw font-28 white bg-gradient">
            Withdraw
          </div>
        </div>
        <div class="chain flex a-center">
          <div class="fil flex a-center j-center">
            <img
              src="~/assets/images/filecoin.png"
              alt=""
            >
          </div>
          <div class="font-28 w-70">
            FIL
          </div>
        </div>
        <div class="status flex">
          <div>
            <div>Earned</div>
            <div>NPT</div>
          </div>
          <div>
            <div>Locked Rewards</div>
            <div>{{ lock }}</div>
          </div>
          <div>
            <div>Available</div>
            <div>{{ withdraw }}</div>
          </div>
          <div>
            <div>Credit Days</div>
            <div>{{ days }} </div>
          </div>
        </div>
        <div class="withdraw font-28 white bg-gradient" @click="harvest">
          Harvest
        </div>
      </div>
      <div class="divider" />
      <div class="flex disabled">
        <div class="mobile-top">
          <div class="mobile-chain flex a-center">
            <div class="ants bg-gradient flex a-center j-center">
              <img
                src="~/assets/images/ants.png"
                alt=""
              >
            </div>
            <div class="font-28">
              NPT
            </div>
          </div>
          <div class="mobile-withdraw font-28 white bg-gradient">
            Withdraw
          </div>
        </div>
        <div class="chain flex a-center">
          <div class="ants bg-gradient flex a-center j-center">
            <img
              src="~/assets/images/ants.png"
              alt=""
            >
          </div>
          <div class="font-28 w-70">
            NPT
          </div>
        </div>
        <div class="status flex">
          <div>
            <div>Earned</div>
            <div>NPT</div>
          </div>
          <div>
            <div>Locked Rewards</div>
            <div>0 </div>
          </div>
          <div>
            <div>Available</div>
            <div>0 </div>
          </div>
          <div>
            <div>Credit Days</div>
            <div>0 </div>
          </div>
        </div>
        <div class="withdraw font-28 white dis">
          Harvest
        </div>
      </div>
    </div>
    <Dialog
      :visible="dialogHarvest"
      :title="errorTitle"
      show-confirm
      :on-confirm="harvestOk"
      @close="dialogHarvest=false"
    >
      <div class="go-google text-main text-center">
        {{ errorMessage }}
      </div>
    </Dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Promise',
  data() {
    return {
      dialogHarvest: false,
      errorTitle: '',
      errorMessage: '',
      total: 0,
      lock: 0,
      withdraw: 0,
      days: 0
    }
  },
  computed: {
    ...mapState(['address', 'connected', 'joined'])
  },
  watch: {
    async connected(v) {
      if (v) {
        try {
          const res = await this.$axios.$get(
            '/api/address/reward?symbol=FIL&address=' + this.address
          )
          const { code, data } = res
          if (code === 200) {
            const { active, days, lock, total } = data
            this.withdraw = active
            this.days = days
            this.lock = lock
            this.total = total
          }
        } catch (e) {
          this.reset()
        }
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapMutations(['set_dialogMobileConnect']),
    harvest() {
      if (!this.connected) {
        this.errorTitle = 'Connect Wallet'
        this.errorMessage = 'The wallet has not been connected. Please connect the wallet first'
      } else {
        if (this.joined) {
          this.errorTitle = 'Coming Soon'
          this.errorMessage = 'Open withdrawals on August 1'
        } else {
          this.errorTitle = 'Credit Plan'
          this.errorMessage = 'Please join in the Credit Plan'
        }
      }
      this.dialogHarvest = true
    },
    harvestOk() {
      this.dialogHarvest = false
      if (!this.connected && window.DAppLink) {
        if (window.innerWidth < 768) {
          this.set_dialogMobileConnect(true)
        } else {
          this.connectWallet()
        }
      }
    },
    connectWallet() {
      window.DAppLink.request({
        method: 'openFilecoinWallet',
        params: {
          width: window.outerWidth,
          origin: window.location.origin
        }
      })
    },
    reset() {
      this.total = 0
      this.lock = 0
      this.days = 0
      this.active = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.promise {
  .title {
    margin: 50dpx 0 10dpx;
    font-size: 42dpx;
  }
  .sub-title{
    margin-bottom: 30dpx;
    color: #999;
  }
  .main {
    padding: 60dpx 50dpx;
    .mobile-top {
      display: none;
    }
    & > div {
      align-items: center;
      .chain {
        .fil{
          width: 70dpx;
          height: 70dpx;
          border-radius: 50%;
          margin-right: 36dpx;
          background: #5cc1cb;
          img {
            width: 70dpx;
          }
        }
        .ants{
          width: 70dpx;
          height: 70dpx;
          border-radius: 50%;
          margin-right: 36dpx;
          padding-left: 5dpx;
          img {
            width: 50dpx;
          }
        }
      }
      .status {
        flex: 1;
        margin: 0 140dpx;
        & > div {
          flex: 1;
          text-align: center;
          & > div {
            font-size: 20dpx;
            &:nth-child(1) {
              color: #999;
              margin-bottom: 10dpx;
            }
          }
        }
      }
      .withdraw {
        width: 180dpx;
        height: 56dpx;
        line-height: 56dpx;
        border-radius: 45dpx;
        text-align: center;
        cursor: pointer;
      }
      .w-70{
        width: 70dpx;
      }
    }
    .divider {
      height: 1px;
      margin: 42dpx 0;
      background: #eee;
    }
    .disabled {
      .dis{
        background: #ccc;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .title {
      font-size: 28rpx;
      margin: 45rpx 0 10rpx;
    }
    .sub-title{
      font-size: 20rpx;
      margin-bottom: 30rpx;
    }
    .main {
      border-radius: 20rpx;
      & > div.flex {
        flex-direction: column;
        .chain,
        .withdraw {
          display: none;
        }
        .mobile-top {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 40rpx;
          .mobile-chain {
            .fil{
              width: 50rpx;
              height: 50rpx;
              border-radius: 50%;
              margin-right: 20rpx;
              background: #5cc1cb;
              img {
                width: 50rpx;
              }
            }
            .ants {
              width: 50rpx;
              height: 50rpx;
              border-radius: 50%;
              margin-right: 20rpx;
              img {
                width: 40rpx;
              }
            }
          }
          .mobile-withdraw {
            height: 50rpx;
            line-height: 50rpx;
            border-radius: 23rpx;
            width: 150rpx;
            text-align: center;
          }
        }
        .status {
          margin: 0;
          width: 100%;
          div {
            font-size: 24rpx !important;
            div:nth-child(1) {
              margin-bottom: 24rpx;
              min-height: 76rpx;
            }
          }
        }
      }
      .divider {
        margin: 30rpx 0 !important;
      }
    }
  }
  @media screen and (min-width: 1920px) {
    .title {
      margin: 50px 0;
      font-size: 42px;
    }
    .main {
      padding: 60px 50px;
      .logo{
        div:first-child{
          justify-content: flex-start;
        }
      }
      & > div {
        .chain {
          .fil {
            width: 100px;
            height: 100px;
            margin-right: 36px;
            img{
              width: 80px;
            }
          }
          .ants{
            width: 100px;
            height: 100px;
            margin-right: 36px;
            img{
              width: 70px;
            }
          }
        }
        .status {
          margin: 0 170px;
          & > div {
            & > div {
              font-size: 28px;
              &:nth-child(1) {
                margin-bottom: 10px;
              }
            }
          }
        }
        .withdraw {
          width: 180px;
          height: 90px;
          line-height: 90px;
          border-radius: 45px;
        }
      }
      .divider {
        height: 1px;
        margin: 42px 0;
      }
    }
  }
}
</style>
