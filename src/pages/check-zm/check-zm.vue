<template>
  <div class="check-zm-wrapper">
    <full-loading v-show="loadFlag" title="认证中..."></full-loading>
    <comm-confirm ref="commConfirm"></comm-confirm>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {checkZM, checkHygzqd} from 'api/biz';
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
      }
    },
    methods: {
      checkZM() {
        checkZM(getSearchCode()).then((data) => {
          this.loadFlag = false;
          if (data.authorized) {
            let info = getRealInfo();
            if (info) {
              this.updateInterface('F2', true, {idNo: info.info, realName: info.realname});
              this.goNextPage();
            } else {
              this.$router.push('/redirect');
            }
          } else {
            this.checkError(data);
          }
        }).catch(() => {
          setTimeout(() => {
            this.$router.push('/redirect');
          }, 500);
        });
      },
      checkHygzqd() {
        checkHygzqd(getSearchCode()).then((data) => {
          if (data.authorized) {
            this.updateInterface('PZM6', true, {authorized: true});
            this.goNextPage();
          } else {
            this.checkError(data);
          }
        });
      },
      checkError(data) {
        this.$refs.commConfirm.showToast('非常抱歉，认证失败');
        if (data.url) {
          setTimeout(() => {
            location.href = data.url;
          }, 500);
        } else {
          setTimeout(() => {
            this.$router.push('/redirect');
          }, 500);
        }
      }
    },
    components: {
      FullLoading,
      CommConfirm
    }
  };
</script>
<style></style>