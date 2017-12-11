<template>
  <div class="comm-confirm-wrapper">
    <confirm ref="dwConfirm" text="点击确定进行位置认证" :isAlert="isAlert" @confirm="handleDw"></confirm>
    <confirm ref="qzConfirm" text="点击确定进行欺诈认证" :isAlert="isAlert" @confirm="handleQz"></confirm>
    <confirm ref="tdConfirm" text="点击确定进行同盾认证" :isAlert="isAlert" @confirm="handleTd"></confirm>
    <confirm ref="txlConfirm" text="您还剩通讯录未认证，点击确定前往app进行认证" @confirm="goApp"></confirm>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    <toast ref="toast" :text="toastText" :delay="delay"></toast>
    <no-result class="no-result-wrapper" v-show="noResult" title="暂无未完成的调查单"></no-result>
  </div>
</template>
<script>
  import Confirm from 'base/confirm/confirm';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import NoResult from 'base/no-result/no-result';
  import {getLocation} from 'common/js/location';
  import {getSearchCode} from 'common/js/util';
  import {setUserPosition} from 'api/biz';

  export default {
    data() {
      return {
        loadFlag: false,
        loadText: '',
        toastText: '',
        noResult: false
      };
    },
    created() {
      this.delay = 1000;
      this.isAlert = true;
    },
    methods: {
      show(type) {
        if (type === 'DW') {
          this.$refs.dwConfirm.show();
        } else if (type === 'QZ') {
          this.$refs.qzConfirm.show();
        } else if (type === 'TD') {
          this.$refs.tdConfirm.show();
        } else if (type === 'TXL') {
          this.$refs.txlConfirm.show();
        } else if (type === 'LOADING') {
          this.loadText = '加载中...';
          this.loadFlag = true;
        }
      },
      hide(type) {
        if (type === 'DW') {
          this.$refs.dwConfirm.hide();
        } else if (type === 'QZ') {
          this.$refs.qzConfirm.hide();
        } else if (type === 'TD') {
          this.$refs.tdConfirm.hide();
        } else if (type === 'TXL') {
          this.$refs.txlConfirm.hide();
        } else if (type === 'LOADING') {
          this.loadFlag = false;
        }
      },
      handleDw() {
        this.loadFlag = true;
        this.loadText = '定位中...';
        getLocation().then((data) => {
          let searchCode = getSearchCode();
          let {lng: longitude, lat: latitude} = data.position;
          let {province, city, area, address} = data.addressComponent;
          setUserPosition(province, city, area, address, longitude, latitude, searchCode).then(() => {
            this.$emit('checkSuc', {
              name: 'PDW2',
              complete: true
            });
            this.loadFlag = false;
          }).catch(() => {
            this.dwError();
          });
        }).catch(() => {
          this.dwError();
        });
      },
      dwError() {
        this.loadFlag = false;
        this.showToast('定位失败，请重新进行定位');
        setTimeout(() => {
          this.$refs.dwConfirm.show();
        }, 500);
        this.loadFlag = false;
      },
      handleQz() {},
      handleTd() {},
      showToast(msg) {
        this.toastText = msg;
        this.$refs.toast.show();
      },
      goApp() {
        alert('未实现');
      }
    },
    components: {
      Toast,
      Confirm,
      NoResult,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  .no-result-wrapper {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
