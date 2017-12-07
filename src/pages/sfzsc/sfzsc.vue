<template>
  <div class="sfzsc-wrapper">
    <div class="top-wrapper">
      <div class="desc cd-flexbox cd-align-center">
        <div class="title">上传身份证</div>
        <div class="tips">
          <p>*照片清晰可辨，信息完整无缺失</p>
          <p>*身份照片真实，严禁经过ps处理</p>
        </div>
      </div>
      <div class="photos clearfix">
        <div class="item">
          <div class="inner">
            <qiniu class="qiniu" @beforeUpload="beforeUpload1" @error="handleError" :multiple="multiple" :token="token">
              <img src="./sfz1@2x.png"/>
            </qiniu>
            <div class="text">上传身份证正面照片</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <qiniu class="qiniu" @beforeUpload="beforeUpload2" @error="handleError" :multiple="multiple" :token="token">
              <img src="./sfz2@2x.png"/>
            </qiniu>
            <div class="text">上传身份证反面照片</div>
          </div>
        </div>
      </div>
    </div>
    <div class="photos photos1">
      <qiniu class="qiniu" @beforeUpload="beforeUpload3" @error="handleError" :multiple="multiple" :token="token">
        <img width="100%" src="./sfz3@2x.png"/>
      </qiniu>
      <div class="text">上传手持身份证照片</div>
    </div>
    <div class="btn-wrap"><button class="btn-primary">提交</button></div>
    <toast :text="errTxt" ref="toast"></toast>
  </div>
</template>
<script>
  import Qiniu from 'base/qiniu/qiniu';
  import Toast from 'base/toast/toast';
  import {setTitle} from 'common/js/util';

  export default {
    data() {
      return {
        token: '',
        pic1: {},
        pic2: {},
        pic3: {},
        errTxt: ''
      };
    },
    created() {
      setTitle('身份证上传');
      this.multiple = false;
    },
    methods: {
      beforeUpload1(file) {
        this.pic1 = {
          key: file.key,
          preview: file.preview
        };
        file.onprogress = (e) => {
          console.log(e);
        };
      },
      beforeUpload2(file) {
        this.pic2 = {
          key: file.key,
          preview: file.preview
        };
        file.onprogress = (e) => {
          console.log(e);
        };
      },
      beforeUpload3(file) {
        this.pic3 = {
          key: file.key,
          preview: file.preview
        };
        file.onprogress = (e) => {
          console.log(e);
        };
      },
      handleError(err) {
        this.errTxt = err.message || '图片上传出错';
        this.$refs.toast.show();
      }
    },
    components: {
      Qiniu,
      Toast
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .sfzsc-wrapper {
    .top-wrapper {
      padding: 0.3rem;
      background-color: #fff;
      .title {
        font-size: $font-size-medium-x;
      }
      .tips {
        padding-left: 0.5rem;
        line-height: 1.6;
        font-size: $font-size-small;
        color: $primary-color;
      }
    }
    .text {
      margin-top: 0.4rem;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-l;
    }
    .photos {
      padding-top: 0.3rem;
      font-size: 0;
      .item {
        position: relative;
        display: inline-block;
        width: 50%;
        height: 0;
        padding-top: 46%;
        .inner {
          position: absolute;
          height: 100%;
          top: 0;
          right: 0;
          left: 0.15rem;
        }
        .qiniu {
          img {
            width: 100%;
          }
        }
        &:first-child {
          .inner {
            right: 0.15rem;
            left: 0;
          }
        }
      }
      &.photos1 {
        position: relative;
        padding: 0.3rem;
        margin-top: 0.2rem;
        background: #fff;
      }
    }
    .btn-wrap {
      margin-top: 0.64rem;
      padding: 0 0.3rem;
    }
  }
</style>
