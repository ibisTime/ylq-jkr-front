<template>
  <div class="zmrz-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">姓名</div>
        <div class="item-input-wrapper">
          <input v-focus type="text" name="realname" class="item-input" v-model="realname" v-validate="'required|max:20'" placeholder="请输入真实姓名">
          <span v-show="errors.has('realname')" class="error-tip">{{errors.first('realname')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">身份证号</div>
        <div class="item-input-wrapper">
          <input type="number" class="item-input" name="idCard" v-model="idCard" v-validate="'required|idCard'" placeholder="请输入身份证号">
          <span v-show="errors.has('idCard')" class="error-tip">{{errors.first('idCard')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="checkZMRZ">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" title="提交中..."></full-loading>
    <comm-confirm :noResult="noSearchResult" ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {setTitle, setCurRouter, setRealInfo} from 'common/js/util';
  import {directiveMixin, interfaceMixin} from 'common/js/mixin';
  import {getZhiMaUrl} from 'api/biz';

  export default {
    mixins: [directiveMixin, interfaceMixin],
    data() {
      return {
        loadFlag: false,
        realname: '',
        idCard: ''
      };
    },
    created() {
      setCurRouter('F2');
      setTitle('芝麻认证');
    },
    methods: {
      checkZMRZ() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            getZhiMaUrl(this.idCard, this.realname).then((data) => {
              this.loadFlag = false;
              if (data.authorized) {
                this.checkSuc({ name: 'F2', complete: true, data: { idNo: this.idCard, realName: this.realname } });
              } else if (data.url) {
                setRealInfo(this.idCard, this.realname);
                location.href = data.url;
              } else {
                this.$refs.commConfirm.showToast('非常抱歉，信息提交失败');
              }
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
      }
    },
    components: {
      FullLoading,
      CommConfirm
    }
  };
</script>
<style lang="scss" scoped>
</style>
