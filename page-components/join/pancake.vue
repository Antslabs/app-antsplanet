<template>
  <div class="pancake">
    <div class="title">
      Partner Farm
    </div>
    <div class="bg-white radius-28">
      <div class="bg-gradient header white flex font-28 a-center">
        <div>Pool</div>
        <div> Earned </div>
        <div>APR</div>
        <div>Farm</div>
      </div>
      <div class="content">
        <div class="main flex a-center">
          <div class="logo flex a-center">
            <div class="flex text-left a-center j-center">
              <img
                class="npt-bnb"
                src="~/assets/images/ants-bnb.png"
                alt=""
              >
            </div>
            <div class="font-28">
              NPT-BNB LP
            </div>
          </div>
          <div class="earn flex a-center">
            <div class=" flex a-center j-center">
              <img
                class="cake"
                src="~/assets/images/cake.png"
                alt=""
              >
            </div>
            <div class="font-28">
              CAKE
            </div>
          </div>
          <div class="font-28 flex">
            --%
          </div>
          <div class="font-28 flex">
            --
          </div>
          <div class="dis white go font-28">
            Go to Farm
          </div>
        </div>
        <div class="divider" />
        <div class="main flex">
          <div class="logo flex a-center text-left">
            <div class="flex a-center j-center ca">
              <img
                class="cake"
                src="~/assets/images/cake.png"
                alt=""
              >
            </div>
            <div class="font-28">
              CAKE
            </div>
          </div>
          <div class="earn flex a-center">
            <div class="bg-gradient flex a-center j-center ants">
              <img
                class="npt"
                src="~/assets/images/ants.png"
                alt=""
              >
            </div>
            <div class="font-28">
              NPT
            </div>
          </div>
          <div class="font-28 flex a-center">
            --%
          </div>
          <div class="font-28 flex a-center">
            --
          </div>
          <div class="dis white go font-28">
            Go to Farm
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pancake {
  .header {
    height: 100dpx;
    border-radius: 42dpx 42dpx 0 0;
    padding: 0 340dpx 0 50dpx;
    & > div {
      flex: 1;
      text-align: center;
    }
  }
  .title {
    font-size: 42dpx;
    margin: 50dpx 0;
  }
  .content {
    padding: 35dpx 50dpx 50dpx;
  }
  .divider {
    height: 1px;
    margin: 42dpx 0;
    background: #eee;
  }
  .dis{
    background: #ccc;
  }
  .main {
    .logo {
      div:first-child {
        width: 70dpx;
        height: 70dpx;
        border-radius: 50%;
        margin-right: 36dpx;
        img {
          width: 90dpx;
        }
      }
    }
    .earn {
      div:first-child {
        width: 70dpx;
        height: 70dpx;
        border-radius: 50%;
        margin-right: 36dpx;
      }
      .ants{
        padding-left: 5dpx;
        img {
          width: 50dpx;
        }
      }

      img {
        width: 70dpx;
      }
    }
    .go {
      width: 180dpx;
      height: 56dpx;
      line-height: 56dpx;
      border-radius: 45dpx;
      text-align: center;
      margin-left: 100dpx;
      cursor: pointer;
    }
    & > div:not(.go) {
      flex: 1;
      justify-content: center;
    }
    .text-left{
      justify-content: flex-start !important;
    }
  }
  @media screen and (max-width: 768px) {
    .title {
      font-size: 28rpx;
      margin: 45rpx 0;
    }
    .header {
      height: 75rpx;
      padding-right: 140rpx;
      div{
        text-align: left;
        &:nth-child(2){
          padding:0 40rpx 0 10rpx;
        }
      }
    }
    .main {
      align-items: center;
    }
    .main .logo > div {
      &:nth-child(1) {
        width: 84rpx;
        height: 84rpx;
        justify-content: flex-start;
        img {
          width: 60rpx;
        }
        &.ca{
          img{
            width: 50rpx;
          }
        }
      }
      &:nth-child(2) {
        display: none;
      }
    }
    .main .earn {
      & > div {
        &:first-child {
          width: 55rpx;
          height: 55rpx;
          border-radius: 30rpx;
          img {
            width: 50rpx;
          }
          &.ants{
            width: 50rpx;
            height: 50rpx;
            img {
              width: 35rpx;
            }
          }
        }
      }
    }
    .main .go {
      width: 112rpx;
      height: 50rpx;
      border-radius: 23rpx;
      line-height: 50rpx;
    }
    .divider {
      margin: 30rpx 0;
    }
  }
  @media screen and (min-width: 1920px) {
    .header {
      height: 100px;
      border-radius: 42px 42px 0 0;
      padding: 0 340px 0 50px;
    }
    .title {
      font-size: 42px;
      margin: 50px 0;
    }
    .content {
      padding: 35px 50px 50px;
    }
    .divider {
      margin: 42px 0;
    }
    .main {
      .logo {
        white-space: nowrap;
        div:first-child {
         .npt-bnb{
            min-width: 110px;
            max-width: 110px;
            margin-right: 36px;
         }
         .cake{
           width: 100px;
           height: 100px;
         }
        }
      }
      .earn {
        div:first-child {
          width: 100px;
          height: 100px;
          margin-right: 16px;
          &.ants{
            width: 100px;
            height: 100px;
          }
          .cake{
            width: 100px;
            height: 100px;
          }
          .npt{
            width: 70px;
          }
        }
      }
      .go {
        width: 180px;
        height: 90px;
        line-height: 90px;
        border-radius: 45px;
        margin-left: 100px;
      }
    }
  }
}
</style>
