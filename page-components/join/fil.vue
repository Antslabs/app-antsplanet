<template>
  <div class="fil flex">
    <div class="fil-input">
      <div class="label">FIL</div>
      <div class="input" @click="copyAddress">
        <input
          v-model="inviteAddress"
          type="text"
          placeholder="Please enter the invitation address"
          class="bg-card"
          :class="{disabled:disabled}"
          :disabled="disabled"
        >
      </div>
    </div>
    <div
      class="bg-gradient join pointer"
      :class="{disabled:inviteAddress === ''}"
      @click="handleJoin"
    >
      {{ joined?'Share':'Join' }}
    </div>

    <Dialog
      :visible="showBalanceLowDia"
      title="Insufficient balance"
      show-confirm
      :on-confirm="()=>showBalanceLowDia=false"
      @close="showBalanceLowDia=false"
    >
      <div class="go-google text-main text-center">
        Your FIL in the wallet is less than 0.25, please deposit FIL and continue to try
      </div>
    </Dialog>
    <Dialog
      :visible="showIllegalCodeDia"
      title="Invitation address error"
      show-confirm
      :on-confirm="()=>showIllegalCodeDia=false"
      @close="showIllegalCodeDia=false"
    >
      <div class="go-google text-main text-center">
        The invitation address you entered has not joined the Ants Planet network. Please look for the invitation address who have joined
      </div>
    </Dialog>
    <Dialog
      :visible="showRecaptcha"
      title="Human-Machine Test"
      show-confirm
      :on-confirm="submitInfo"
      @close="()=>showRecaptcha=false"
    >
      <div class="flex j-center top-40">
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="sitekey"
          @verify="onVerify"
          @expired="onExpired"
        />
      </div>
    </Dialog>
    <Dialog
      :visible="showErrorDia"
      :title="errorTitle"
      show-confirm
      :on-confirm="confirmOK"
      @close="showErrorDia=false"
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
  name: 'Fil',
  props: {
    address: {
      type: String,
      default: ''
    },
    openId: {
      type: String,
      default: ''
    },
    // 6LdzoiYbAAAAAKHo7azjcS0zPiFi4WrtsOrtV4bJ
    sitekey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inviteAddress: '',
      loading: false,
      showBalanceLowDia: false,
      showIllegalCodeDia: false,
      showRecaptcha: false,
      token: '',
      showErrorDia: false,
      errorTitle: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapState(['balance', 'connected', 'joined']),
    disabled() {
      let v = false
      if (this.connected && this.joined) {
        v = true
      }
      return v
    }
  },
  watch: {
    joined: {
      handler(v) {
        const { inviter: inviteAddress } = this.$route.query
        if (!this.connected) {
          if (inviteAddress) {
            this.inviteAddress = inviteAddress
          }
        } else {
          if (v) {
            this.inviteAddress = `${location.origin}/?inviter=${
              this.address
            }`
          } else {
            if (inviteAddress) {
              this.inviteAddress = inviteAddress
            }
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['switch', 'setAddress', 'setBalance', 'set_dialogMobileConnect']),
    onVerify(token) {
      this.token = token
    },
    submit(token) {
      this.showRecaptcha = true
    },
    onExpired() {
      this.token = ''
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset()
    },
    confirmOK() {
      this.showErrorDia = false
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
    copyAddress() {
      if (this.joined) {
        this.$copyText(this.inviteAddress)
        this.$message({
          message: 'Copied Successfully',
          type: 'success'
        })
      }
    },
    handleJoin() {
      if (!this.inviteAddress) {
        return
      }
      if (!this.connected) {
        this.errorTitle = 'Connect Wallet'
        this.errorMessage = 'The wallet has not been connected. Please connect the wallet first'
        this.showErrorDia = true
        return
      }
      if (this.joined) {
        this.copyAddress()
      } else {
        if (this.address.trim() === '') {
          this.$message({
            message: 'Please enter the invitation address',
            type: 'error'
          })
          return
        }
        if (parseFloat(this.balance) < 0.25) {
          this.showErrorDia = true
          this.errorTitle = 'Insufficient balance'
          this.errorMessage = 'Your FIL in the wallet is less than 0.25, please deposit FIL and continue to try'
        } else {
          this.showRecaptcha = true
        }
      }
    },
    async submitInfo() {
      if (this.token === '') {
        this.$message({
          message: 'Please conduct a man-machine test first',
          type: 'error'
        })
      } else {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          const res = await this.$axios.$post('/api/address', {
            address: this.address,
            invite_address: this.inviteAddress,
            token: this.token,
            symbol: 'FIL'
          })
          this.loading = false
          const { code } = res
          if (code === 200) {
            this.showRecaptcha = false
            this.$emit('join')
          }
        } catch (e) {
          this.loading = false
          const { data } = e.response
          if (data) {
            const { message, code } = data
            if (code === 11000) {
              this.showErrorDia = true
              this.errorTitle = 'Invitation address error'
              this.errorMessage =
                'The invitation address you entered has not joined the Ants Planet network. Please look for the invitation address who have joined'
            } else {
              this.$message({
                type: 'error',
                message
              })
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin btn {
  width: 225dpx;
  height: 56dpx;
  font-size: 28dpx;
  font-weight: 400;
  line-height: 56dpx;
  text-align: center;
  border-radius: 42dpx;
}
.fil {
  height: 56dpx;
  padding: 0 110dpx 0 70dpx;
  margin-top: 45dpx;
  .fil-input{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label{
      width: 225dpx;
      height: 56dpx;
      border: 1px solid #f04a9e;
      color: #f04a9e;
      border-radius: 42dpx;
      font-size: 28dpx;
      font-weight: 400;
      line-height: 56dpx;
      text-align: center;
    }
    .input{
      flex: 1;
      display: flex;
      margin: 0 56dpx;
      border-radius: 42dpx;

    }
  }
  div {
    height: 100%;
    &.join {
      @include btn;
      color: white;
      &.disabled{
        background: #D1D1D1;
        color: #FFFFFF;
      }
    }
  }
  input {
    border: none;
    outline: none;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 42dpx;
    padding: 30dpx;
    font-size: 28dpx;
    background: #F7F2F6;
    &.disabled{
      color: #999;
      cursor: pointer;
    }
  }
  input::-webkit-input-placeholder {
    color: #ccc;
  }
  input::-moz-placeholder {
    color: #ccc;
  }
  input:-ms-input-placeholder {
    color: #ccc;
  }
  @media screen and (max-width: 768px) {
    margin-top: 40rpx;
    border-radius: 32rpx;
    flex-wrap: wrap;
    * {
      font-size: 26rpx !important;
    }
    height: auto;
    .fil-input{
      .label{
          height: 64rpx;
          line-height: 64rpx;
          border-radius: 32rpx;
      }
      .input{
        min-width: 400rpx;
        margin-right: 0;
        flex: 1;
        input {
          height: 64rpx;
          border-radius: 32rpx;
          padding: 0 22rpx;
        }
      }
    }
    div.join {
      height: 50rpx;
      margin: 30rpx auto 0;
      line-height: 50rpx;
      width: 150rpx;
      border-radius: 32rpx;
    }
  }
  @media screen and (min-width: 1920px) {
    @mixin btn {
      width: 225px;
      height: 104px;
      font-size: 28px;
      font-weight: 400;
      line-height: 104px;
      text-align: center;
      border-radius: 42px;
    }
    height: 104px;
    padding: 0 110px 0 70px;
    margin-top: 45px;
    .fil-input{
      .label{
        width: 225px;
        height: 104px;
        border-radius: 42px;
        font-size: 28px;
        line-height: 104px;
      }
      .input{
        margin: 0 56px;
        border-radius: 42px;
      }
    }
    div.join {
        @include btn;
      }
    input {
      border-radius: 42px;
      padding-left: 42px;
      font-size: 28px;
    }
  }
}
</style>
