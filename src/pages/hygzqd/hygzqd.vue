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
    <comm-confirm ref="commConfirm"></comm-confirm>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {setTitle, setCurRouter, getInterfaceInfo, getSearchCode} from 'common/js/util';
  import {interfaceMixin} from 'common/js/mixin';
  import {checkHygzqd} from 'api/biz';
  export default {
    mixins: [interfaceMixin],
    data() {
      return {
        loadFlag: false,
        idNo: '',
        realName: ''
      };
    },
    created() {
      setCurRouter('PZM6');
      setTitle('行业关注清单认证');
      this.init();
    },
    methods: {
      init() {
        let _interface = getInterfaceInfo().filter(v => v.name === 'F2');
        _interface = _interface.length && _interface[0] || {};
        if (_interface.data) {
          _interface.data = JSON.parse(_interface.data);
          this.realName = _interface.data.realName;
          this.idNo = _interface.data.idNo;
        } else {
          this.$router.replace('/redirect');
        }
      },
      submit() {
        checkHygzqd(getSearchCode()).then((data) => {
          if (data.authorized) {
            this.updateInterface('PZM6', true, {authorized: true});
            this.goNextPage();
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
        });
      }
    },
    components: {
      setTitle,
      CommConfirm,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
</style>
