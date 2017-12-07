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
        <button @click="login">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" title="提交中..."></full-loading>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        loadFlag: false,
        realname: '',
        idCard: ''
      };
    },
    created() {
      setTitle('芝麻认证');
    },
    methods: {
      login() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log(result);
          }
        });
      }
    },
    components: {
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
</style>
