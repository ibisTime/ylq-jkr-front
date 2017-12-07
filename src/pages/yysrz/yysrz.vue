<template>
  <div class="">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">服务密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" name="password" v-model="password" v-validate="'required'" placeholder="请输入服务密码">
          <span v-show="errors.has('password')" class="error-tip">{{errors.first('password')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="submit">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
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
        loadFlag: '',
        loadText: '加载中...',
        mobile: '',
        password: ''
      };
    },
    created() {
      setTitle('运营商认证');
    },
    methods: {
      submit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            alert('未实现');
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
