<template>
  <div class="check-zm-wrapper">
    <full-loading v-show="loadFlag" title="认证中..."></full-loading>
    <comm-confirm :noResult="noSearchResult" ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {checkZM, checkHygzqd, checkZMF, checkQZ} from 'api/biz';
  import {getSearchCode, getRealInfo, getCurRouter} from 'common/js/util';
  import {interfaceMixin} from 'common/js/mixin';

  export default {
    mixins: [interfaceMixin],
    data() {
      return {
        loadFlag: true
      };
    },
    mounted() {
      let curRouter = getCurRouter();
      if (curRouter === 'F2') {
        this.checkZM();
      } else if (curRouter === 'PZM6') {
        this.checkHygzqd();
      } else if (curRouter === 'PZM5') {
        this.checkZMF();
      } else if (curRouter === 'PZM7') {
        this.checkQZ();
      } else {
        this.$router.push('/redirect');
      }
    },
    methods: {
      // 校验芝麻认证的回调是否正确
      checkZM() {
        checkZM(getSearchCode()).then((data) => {
          this.loadFlag = false;
          if (data.authorized) {
            let info = getRealInfo();
            if (info) {
              this.checkSuc({ name: 'F2', complete: true, data: { idNo: info.idno, realName: info.realname } });
            } else {
              this.$router.push('/redirect');
            }
          } else {
            this.checkError(data);
          }
        }).catch(() => {
          this.loadFlag = false;
          this.goRedirect();
        });
      },
      // 校验行业关注清单认证的回调是否正确
      checkHygzqd() {
        checkHygzqd(getSearchCode()).then((data) => {
          this.loadFlag = false;
          if (data.authorized) {
            this.checkSuc({ name: 'PZM6', complete: true, data: { authorized: true } });
          } else {
            this.checkError(data);
          }
        }).catch(() => {
          this.loadFlag = false;
          this.goRedirect();
        });
      },
      // 校验芝麻分认证的回调是否正确
      checkZMF() {
        checkZMF(getSearchCode()).then((data) => {
          this.loadFlag = false;
          if (data.authorized) {
            this.checkSuc({ name: 'PZM5', complete: true, data: { authorized: true } });
          } else {
            this.checkError(data);
          }
        }).catch(() => {
          this.loadFlag = false;
          this.goRedirect();
        });
      },
      // 校验欺诈三接口认证的回调是否正确
      checkQZ() {
        checkQZ(getSearchCode()).then((data) => {
          this.loadFlag = false;
          if (data.authorized) {
            this.checkSuc({ name: 'PZM7', complete: true, data: { authorized: true } });
          } else {
            this.checkError(data);
          }
        }).catch(() => {
          this.loadFlag = false;
          this.goRedirect();
        });
      },
      checkError(data) {
        this.$refs.commConfirm.showToast('认证失败，请重新进行认证');
        if (data.url) {
          setTimeout(() => {
            location.href = data.url;
          }, 500);
        } else {
          this.goRedirect();
        }
      },
      goRedirect() {
        setTimeout(() => {
          this.$router.push('/redirect');
        }, 500);
      }
    },
    components: {
      FullLoading,
      CommConfirm
    }
  };
</script>
<style></style>
