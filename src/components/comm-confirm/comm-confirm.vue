<template>
  <div class="comm-confirm-wrapper">
    <confirm ref="dwConfirm" text="点击确定进行位置认证" :isAlert="isAlert" @confirm="handleDw"></confirm>
    <confirm ref="qzConfirm" text="点击确定进行欺诈认证" :isAlert="isAlert" @confirm="handleQz"></confirm>
    <confirm ref="tdConfirm" text="点击确定进行同盾认证" :isAlert="isAlert" @confirm="handleTd"></confirm>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    <toast ref="toast" :text="toastText" :delay="delay"></toast>
  </div>
</template>
<script>
  import Confirm from 'base/confirm/confirm';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import {getLocation} from 'common/js/location';

  export default {
    data() {
      return {
        loadFlag: false,
        loadText: '',
        toastText: ''
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
        }
      },
      hide(type) {
        if (type === 'DW') {
          this.$refs.dwConfirm.hide();
        } else if (type === 'QZ') {
          this.$refs.qzConfirm.hide();
        } else if (type === 'TD') {
          this.$refs.tdConfirm.hide();
        }
      },
      handleDw() {
        this.loadFlag = true;
        this.loadText = '定位中...';
        getLocation().then((data) => {
          /**
           * data.position.lng, data.position.lat
           * data.addressComponent.address
           */
          this.loadFlag = false;
        }).catch(() => {
          this.showToast('定位失败，请重新进行定位');
          setTimeout(() => {
            this.$refs.dwConfirm.show();
          }, 500);
          this.loadFlag = false;
        });
      },
      handleQz() {},
      handleTd() {},
      showToast(msg) {
        this.toastText = msg;
        this.$refs.toast.show();
      }
    },
    components: {
      Toast,
      Confirm,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
</style>
