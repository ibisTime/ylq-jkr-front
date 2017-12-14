<template>
  <div class="hygzqd-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">姓名</div>
        <div class="inner-label">{{realName}}</div>
      </div>
      <div class="form-item">
        <div class="item-label">身份证号</div>
        <div class="inner-label">{{idNo}}</div>
      </div>
      <div class="form-btn">
        <button @click="submit">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" title="提交中..."></full-loading>
    <comm-confirm :noResult="noSearchResult" ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {setTitle, setCurRouter, getSearchCode, getRealNameInfo} from 'common/js/util';
  import {interfaceMixin} from 'common/js/mixin';
  import {checkZMF} from 'api/biz';
  export default {
    mixins: [interfaceMixin],
    data() {
      return {
        loadFlag: false,
        realName: '',
        idNo: ''
      };
    },
    created() {
      setCurRouter('PZM5');
      setTitle('芝麻分认证');
      this.init();
    },
    methods: {
      init() {
        let info = getRealNameInfo();
        if (info) {
          this.realName = info.realName;
          this.idNo = info.idNo;
        } else {
          this.$router.replace('/redirect');
        }
      },
      submit() {
        this.loadFlag = true;
        checkZMF(getSearchCode()).then((data) => {
          this.loadFlag = false;
          if (data.authorized) {
            this.checkSuc({ name: 'PZM5', complete: true, data: { authorized: true } });
          } else {
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
        }).catch(() => {
          this.loadFlag = false;
        });
      }
    },
    components: {
      setTitle,
      FullLoading,
      CommConfirm
    }
  };
</script>
<style lang="scss" scoped>
</style>
