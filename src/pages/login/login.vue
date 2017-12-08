<template>
  <div class="change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">密码</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="pwd" v-model="pwd" v-validate="'required'" placeholder="请输入密码">
          <span v-show="errors.has('pwd')" class="error-tip">{{errors.first('pwd')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="login">登录</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    <comm-confirm ref="commConfirm"></comm-confirm>
  </div>
</template>
<script>
  import {login} from 'api/user';
  import {setTitle, setUser} from 'common/js/util';
  import {directiveMixin, interfaceMixin} from 'common/js/mixin';
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';

  export default {
    mixins: [directiveMixin, interfaceMixin],
    data() {
      return {
        loadFlag: false,
        loadText: '',
        mobile: '',
        pwd: ''
      };
    },
    created() {
      setTitle('登录');
    },
    methods: {
      login() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            this.loadText = '登录中...';
            login(this.mobile, this.pwd).then((data) => {
              setUser(data);
              this.loadFlag = false;
              this.$router.replace('/zmrz');
              /**
               * 1、获取调查单详情
               * 2、获取未完成的接口，并跳转到指定页面 this.getNextPage('F1', [])
               * 3、如果已经填写完成，则提示已经填写完成
               */
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
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .change-mobile-wrapper {
    background-color: $color-background;
    .other-info {
      margin-top: 0.4rem;
      padding: 0 0.3rem;
      a {
        font-size: $font-size-medium-s;
        color: #fbab46;
        float: left;
        &+a {
          float: right;
        }
      }
    }
  }
</style>
