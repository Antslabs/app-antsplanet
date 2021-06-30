<template>
  <div class="header  abs">
    <div class="pc flex j-between a-center">
      <img
        class="logo pointer"
        src="~/assets/images/logo-color.png"
      >
      <div class="flex a-center connect">
        <div
          v-if="!connected"
          class="font-20 white bg-gradient pointer"
          @click="checkInstall"
        >
          Connect Wallet
        </div>
        <div
          v-else
          class="flex a-center font-20 pointer"
          @click="showWallet=true"
        >
          <div class="bg-card balance">
            {{ balance }}
          </div>
          <div class="bg-gradient white connected">
            {{ dotString(address) }}
          </div>
        </div>
        <div class="doc font-20" @click="toDocs">
          Docs
        </div>
      </div>
    </div>
    <div class="mobile flex j-between a-center">
      <nuxt-link to="/">
        <img
          src="~/assets/images/logo-color.png"
          alt=""
          class="logo"
        >
      </nuxt-link>
      <div class="flex a-center connect">
        <div
          v-if="!connected"
          class="font-20 white bg-gradient pointer"
          @click="connectMbWallet"
        >
          Connect Wallet
        </div>
        <div
          v-else
          class="flex a-center font-20 pointer"
          @click="showWallet=true"
        >
          <div class="bg-card balance">
            {{ balance }}
          </div>
          <div class="bg-gradient white connected">
            {{ dotString(address) }}
          </div>
        </div>
        <div class="doc font-20" @click="toDocs">
          Docs
        </div>
      </div>
    </div>

    <Dialog
      :visible="dialogMobileConnect"
      title="Connect Wallet"
      @close="closeMobileConnect"
    >
      <div>
        <div
          class="flex j-between a-center connect-wallet radius-28 font-28 pointer"
          @click="connectWallet"
        >
          <div>Fllecion Wallet</div>
          <div class="link flex a-center j-center">
            <img
              src="~/assets/images/fil.png"
              alt=""
            >
          </div>
        </div>
        <a
          class="flex j-between a-center connect-wallet radius-28 font-28 mb"
          :href="connectHref"
        >
          <div>Fllecion Wallet</div>
          <div class="link flex a-center j-center">
            <img
              src="~/assets/images/fil.png"
              alt=""
            >
          </div>
        </a>
      </div>
    </Dialog>
    <Dialog
      :visible="showUninstallDia"
      title="Your installation of Filecoin Wallet was not detected"
      show-confirm
      :on-confirm="()=>showUninstallDia=false"
      @close="showUninstallDia=false"
    >
      <div class="go-google text-main">
        Please visit<a target="_blank" href="https://doc.antsplanet.io/AntsPlanetUserGuide.html"> Filecoin Wallet website </a> and follow the instruction to install the plugin, or search to download in <a href="https://chrome.google.com/webstore/detail/filecoin-wallet/bpcblmpljpaghnefcaejpdakdbibmafm" target="_blank"> chrome store</a>
      </div>
    </Dialog>
    <Dialog
      :visible="showWallet"
      title="Account"
      @close="showWallet=false"
    >
      <div class="account">
        <div class="flex linked font-20 j-between a-center bottom-30">
          <div>Connected with Filecoin Wallet</div>
          <div>Change</div>
        </div>
        <div class="address">
          {{ address }}
        </div>
        <div class="flex j-between btns text-main">
          <div @click="copy">
            <img
              src="~/assets/images/copy.png"
              alt=""
            >
            <span>Copy</span>
          </div>
          <div @click="toFilscan">
            <img
              src="~/assets/images/switch.png"
              alt=""
            >
            <span>View on Filscan</span>
          </div>
          <div @click="disConnect">
            <img
              src="~/assets/images/dis.png"
              alt=""
            >
            <span>Disconnect</span>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import WalletConnect from '@walletconnect/client'
export default {
  name: 'Header',
  data() {
    return {
      showWallet: false,
      showMbNav: false,
      showUninstallDia: false,
      balance: '0 FIL',
      connector: null
    }
  },
  computed: {
    ...mapState(['connected', 'address', 'connectHref', 'dialogMobileConnect'])
  },
  mounted() {
    const addr = localStorage.getItem('filecoinwallet_address')
    if (window.innerWidth < 768) {
      this.walletConnectInit()
    }
    if (Object.prototype.toString.call(addr).indexOf('String') > 0) {
      this.switch(true)
      this.setAddress(addr)
      this.getBalance(addr)
    }
    if (window.DAppLink && window.DAppLink.onMessage) {
      window.DAppLink.onMessage('filecoinWalletAddress', (data) => {
        const { address } = data
        localStorage.setItem('filecoinwallet_address', address)
        this.set_dialogMobileConnect(false)
        this.setAddress(address)
        this.switch(true)
        this.getBalance(address)
      })
    }
  },
  methods: {
    ...mapMutations(['switch', 'setAddress', 'setBalance', 'set_connectHref', 'set_dialogMobileConnect']),
    toFilscan() {
      const url = `https://filscan.io/tipset/address-detail?address=${this.address}`
      window.open(url)
    },
    toDocs() {
      window.open(`https://doc.antsplanet.io/`)
    },
    closeMobileConnect() {
      this.set_dialogMobileConnect(false)
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
    checkInstall() {
      if (window.DAppLink === undefined) {
        this.showUninstallDia = true
      } else {
        this.set_dialogMobileConnect(true)
      }
    },
    dotString(addr) {
      if (addr === undefined || addr === '') {
        return ''
      }
      return `${addr.slice(0, 4)}...${addr.slice(-4)}`
    },
    disConnect() {
      this.showWallet = false
      localStorage.removeItem('filecoinwallet_address')
      this.setAddress('')
      this.switch(false)
      if (window.innerWidth < 768) {
        this.connector.killSession()
      }
    },
    copy() {
      this.$message({
        message: 'Copy Address Success',
        type: 'success'
      })
      this.$copyText(this.address)
    },
    getBalance(addr) {
      this.$axios
        .post(this.$config.chain, {
          id: 1,
          jsonrpc: '2.0',
          params: [{ address: addr }],
          method: 'filscan.BalanceNonceByAddress'
        })
        .then((res) => {
          const { result, error } = res.data
          if (error === undefined) {
            const { balance } = result
            const num = parseFloat(this.atto2Fil(balance)).toFixed(3)
            this.balance = num + 'FIL'
            this.setBalance(num)
          } else {
            this.balance = '0 FIL'
            this.setBalance(0)
          }
        }).catch((e) => {
          this.balance = '0 FIL'
          this.setBalance(0)
        })
    },
    walletConnectInit() {
      const bridge = this.$config.bridge
      const connector = new WalletConnect({
        bridge
      })
      this.connector = connector
      this.subscribeToEvents()
      return connector
    },
    async connectMbWallet() {
      const connector = this.walletConnectInit()
      if (!connector.connected) {
        await connector.createSession()
      }
      const href = `filecoinwallet://wc?uri=${connector.uri}`
      this.set_connectHref(href)
      this.set_dialogMobileConnect(true)
    },
    subscribeToEvents() {
      const connector = this.connector
      connector.on('connect', (error, payload) => {
        if (payload.params[0]) {
          this.set_dialogMobileConnect(false)
          const { accounts } = payload.params[0]
          if (Array.isArray(accounts)) {
            const addr = accounts[0]
            localStorage.setItem('filecoinwallet_address', addr)
            this.setAddress(addr)
            this.switch(true)
            this.getBalance(addr)
          }
        }

        if (error) {
          throw error
        }
      })
      connector.on('disconnect', (error, payload) => {
        this.switch(false)
        if (error) {
          throw error
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  padding: 20dpx 42dpx 0;
  width: 100%;
  top: 0;
  left: 0;
  .mobile {
    display: none;
  }
  .doc{
    cursor: pointer;
  }
  .logo {
    width: 200dpx;
  }
  .nav-container {
    a,
    div {
      margin-left: 88dpx;
    }
    div {
      height: 56dpx;
      display: inline-flex;
      align-items: center;
      padding: 0 18dpx;
    }
  }
  .connect {
    & > div:first-child {
      height: 56dpx;
      border-radius: 28dpx;
      padding: 0 24dpx;
      line-height: 56dpx;
    }
    .balance {
      padding: 0 40dpx 0 20dpx;
    }
    .balance,
    .connected {
      height: 56dpx;
      border-radius: 28dpx;
      line-height: 56dpx;
    }
    .connected {
      padding: 0 14dpx;
      margin-left: -30dpx;
    }
    div.doc {
      margin-left: 30dpx;
    }
  }
  .enter-page {
    img {
      width: 30dpx;
    }
  }
}
.connect-wallet {
  border: 1px solid #999;
  color: black;
  padding:10dpx 32dpx;
  margin-bottom: 20dpx;
  &.mb {
    display: none;
  }
  .link {
    width: 60dpx;
    height: 60dpx;
    border-radius: 50%;
    img {
      width: 50dpx;
    }
  }
}
.account {
  .linked {
    height: 70dpx;
    background: #fedced;
    border-radius: 28px;
    color: #f74fa5;
    padding: 0 28dpx;
  }
  .address {
    font-size: 20dpx;
    color: black;
  }
  .btns {
    margin-top: 30dpx;
    img {
      width: 36dpx;
      margin-right: 5dpx;
    }
    div,
    a,
    span {
      display: flex;
      cursor: pointer;
      color: #999;
      align-items: center;
      font-size: 20dpx;
    }
  }
}
.go-google {
  text-align: center;
  a {
    color: #f74fa5;
  }
}

@media screen and (max-width: 768px) {
  .header {
    background: white;
    height: 90rpx;
    padding: 0 25rpx;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .pc {
      display: none;
    }
    .mobile {
      height: 100%;
      display: flex;
      position: relative;
      .more {
        width: 35rpx;
      }
      .logo {
        width: 240rpx;
      }
      .enter {
        height: 45rpx;
        border-radius: 22rpx;
        line-height: 45rpx;
        font-size: 26rpx;
        padding: 0 30rpx;
      }
      .mobile-nav {
        top: 90rpx;
        left: -25rpx;
        width: 100vw;
        z-index: 1000;
        text-align: center;
        color: white;
        height: 0;
        overflow: hidden;
        transition: all 0.2s;
        & > div {
          height: 100rpx;
          line-height: 100rpx;
          font-size: 26rpx;
        }
        &.open {
          height: 400rpx;
        }
      }
      .connect{
        .white{
          height: 45rpx;
          line-height: 45rpx;
          font-size: 24rpx;
          border-radius: 23rpx;
        }
        .balance,.connected{
          height: 45rpx;
          line-height: 45rpx;
          border-radius: 23rpx;
          padding: 0 18rpx;
          font-size: 24rpx;
        }
      }
      .doc{
        font-size: 24rpx;
      }
    }
  }
  .connect-wallet {
    display: none;
    &.mb {
      display: flex;
    }
  }
  .wallet-status {
    font-size: 24rpx;
    & > div {
      height: 50rpx;
      border-radius: 25rpx;
      line-height: 50rpx;
      &.balance {
        padding: 0 40rpx 0 15rpx;
      }
      &:last-child {
        margin-left: -30rpx;
        padding: 0 15rpx;
      }
    }
  }
  .account {
    .linked {
      height: 60rpx;
      padding: 0 20rpx;
      font-size: 24rpx;
    }
    .address {
      font-size: 24rpx;
      padding-left: 20rpx;
    }
    .btns {
      margin-top: 30rpx;
      font-size: 24rpx;
      img {
        width: 40rpx;
      }
      div,
      a,
      span {
        display: flex;
        cursor: pointer;
        color: #999;
        align-items: center;
        font-size: 24rpx;
      }
    }
  }
}
@media screen and (min-width: 1920px) {
  .header {
      padding: 20px 42px 0;
  .pc{
    div{
      font-size: 20px
    }
  }
  .logo {
    width: 200px;
  }
  .nav-container {
    a,
    div {
      margin-left: 88px;
    }
    div {
      height: 56px;
      padding: 0 18px;
    }
  }
  .connect {
    & > div:first-child {
      height: 56px;
      border-radius: 28px;
      padding: 0 24px;
      line-height: 56px;
    }
    .balance {
      padding: 0 40px 0 20px;
    }
    .balance,
    .connected {
      height: 56px;
      border-radius: 28px;
      line-height: 56px;
    }
    .connected {
      padding: 0 14px;
      margin-left: -30px;
    }
    div.doc {
      margin-left: 70px;
    }
  }
  .enter-page {
    img {
      width: 30px;
    }
  }
}
.connect-wallet {
  padding: 32px;
  margin-bottom: 20px;
  .link {
    width: 60px;
    height: 60px;
    img {
      width: 55px;
    }
  }
}
.account {
  .linked {
    height: 70px;
    border-radius: 28px;
    padding: 0 28px;
  }
  .address {
    font-size: 36px;
  }
  .btns {
    margin-top: 40px;
    img {
      width: 36px;
      margin-right: 20px;
    }
  }
}
}
</style>
