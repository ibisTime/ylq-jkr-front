<template>
  <div class="check-zm-wrapper">
    <full-loading v-show="loadFlag" title="认证中..."></full-loading>
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
            this.loadFlag = false;
            this.$refs.commConfirm.showToast('认证失败，请重新进行认证');
            setTimeout(() => {
              this.$refs.commConfirm.show('PYYS4');
            }, 500);
          }
        }).catch(() => {
          this.loadFlag = false;
          setTimeout(() => {
            this.$refs.commConfirm.show('PYYS4');
          }, 500);
        });
      },
      checkRealYys() {
        getSimpleReport(this.reportCode).then((data) => {
          if (data['PYYS4'] && data['PYYS4'] === '1') {
            this.loadFlag = false;
            this.checkSuc({ name: 'PYYS4', complete: true });
          } else {
            setTimeout(() => {
              this.checkRealYys();
            }, 3000);
          }
        }).catch(() => {
          setTimeout(() => {
            this.checkRealYys();
          }, 3000);
        });
      }
    },
    components: {
      FullLoading,
      CommConfirm
    }
  };
</script>
<style></style>
