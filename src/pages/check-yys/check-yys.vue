<template>
  <div class="check-zm-wrapper">
    <full-loading v-show="loadFlag" title="运营商认证中，可能需要等待10几秒钟..."></full-loading>
    <comm-confirm :noResult="noSearchResult" ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {checkYYS, getSimpleReport} from 'api/biz';
  import {setTitle, getSearchCode, getReportCode} from 'common/js/util';
  import {interfaceMixin} from 'common/js/mixin';

  export default {
    mixins: [interfaceMixin],
    data() {
      return {
        loadFlag: true
      };
    },
    created() {
      setTitle('运营商认证');
      this.reportCode = getReportCode();
    },
    mounted() {
      let taskId = this.$route.query.task_id;
      if (taskId) {
        this.checkYys(getSearchCode(), taskId);
      } else {
        this.$router.push('/redirect');
      }
    },
    methods: {
      // 校验运营商认证的回调是否正确
      checkYys(searchCode, taskId) {
        checkYYS(searchCode, taskId).then((data) => {
          if (data.isSuccess) {
            this.checkRealYys();
          } else {
            this.checkFailed();
          }
        }).catch(() => {
          this.checkFailed();
        });
      },
      checkRealYys() {
        getSimpleReport(this.reportCode).then((data) => {
          // 0：未认证，1：结果拉取中，2：认证成功，3：认证失败
          if (data['PYYS4Status'] === '2') {
            this.loadFlag = false;
            this.checkSuc({ name: 'PYYS4', complete: true });
          } else if (data['PYYS4Status'] === '3') {
            this.checkFailed();
          } else {
            this.loopCheck();
          }
        }).catch(() => {
          this.loopCheck();
        });
      },
      loopCheck() {
        setTimeout(() => {
          this.checkRealYys();
        }, 3000);
      },
      checkFailed() {
        this.loadFlag = false;
        this.$refs.commConfirm.showToast('认证失败，请重新进行认证');
        setTimeout(() => {
          this.$refs.commConfirm.show('PYYS4');
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
