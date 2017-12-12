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
            <div class="inner-content">
              <qiniu class="qiniu" @afterUpload="afterUpload1" :multiple="multiple" :token="token">
                <img v-show="!pic1.status" src="./sfz1@2x.png"/>
                <div class="img" v-show="pic1.status=='OK'" :style="getBg(pic1)"></div>
              </qiniu>
            </div>
            <div class="text">上传身份证正面照片</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="inner-content">
              <qiniu class="qiniu" @afterUpload="afterUpload2" :multiple="multiple" :token="token">
                <img v-show="!pic2.status" src="./sfz2@2x.png"/>
                <div class="img" v-show="pic2.status=='OK'" :style="getBg(pic2)"></div>
              </qiniu>
            </div>
            <div class="text">上传身份证反面照片</div>
          </div>
        </div>
      </div>
    </div>
    <div class="photos photos1">
      <qiniu class="qiniu" @afterUpload="afterUpload3" :multiple="multiple" :token="token">
        <img v-show="!pic3.status" width="100%" src="./sfz3@2x.png"/>
        <img v-show="pic3.status=='OK'" width="100%" :src="formatImg(pic3)"/>
      </qiniu>
      <div class="text1">上传手持身份证照片</div>
    </div>
    <div class="btn-wrap"><button class="btn-primary" @click="submit">提交</button></div>
    <toast :text="errTxt" ref="toast"></toast>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    <comm-confirm ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
  </div>
</template>
<script>
  import Qiniu from 'base/qiniu/qiniu';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import CommConfirm from 'components/comm-confirm/comm-confirm';
  import {setTitle, formatImg, getSearchCode} from 'common/js/util';
  import {interfaceMixin} from 'common/js/mixin';
  import {getQiniuToken} from 'api/general';
  import {checkSfz} from 'api/biz';

  const OK = 'OK';
  const PENDING = 'PENDING';
  const ERR = 'ERR';

  export default {
    mixins: [interfaceMixin],
    data() {
      return {
        loadFlag: true,
        loadText: '加载中...',
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
      getQiniuToken().then((data) => {
        this.loadFlag = false;
        this.token = data.uploadToken;
      }).catch(() => {
        this.loadFlag = false;
      });
    },
    methods: {
      afterUpload1(file) {
        this.handlePicUpload('pic1', file);
      },
      afterUpload2(file) {
        this.handlePicUpload('pic2', file);
      },
      afterUpload3(file) {
        this.handlePicUpload('pic3', file);
      },
      handlePicUpload(picKey, file) {
        this[picKey] = {
          preview: file.preview,
          status: PENDING
        };
        file.uploadPromise.then((data) => {
          this[picKey].key = data.body.key;
          this[picKey].status = OK;
        }).catch(() => {
          this[picKey].status = ERR;
          this.handleError();
        });
      },
      handleError(msg) {
        this.errTxt = msg || '图片上传出错';
        this.$refs.toast.show();
      },
      submit() {
        if (!(this.pic1.key && this.pic1.status === OK)) {
          this.handleError('身份证正面照片未上传成功');
        } else if (!(this.pic2.key && this.pic2.status === OK)) {
          this.handleError('身份证反面照片未上传成功');
        } else if (!(this.pic3.key && this.pic3.status === OK)) {
          this.handleError('手持身份证照片未上传成功');
        } else {
          this.loadText = '提交中...';
          this.loadFlag = true;
          checkSfz(this.pic1.key, this.pic2.key, this.pic3.key, getSearchCode()).then((data) => {
            this.loadFlag = false;
            if (data.isSuccess) {
              this.updateInterface('PID1', true);
              this.goNextPage();
            } else {
              this.handleError('身份证认证失败，请检查数据无误后，重新提交');
            }
          }).catch(() => {
            this.loadFlag = false;
          });
        }
      },
      getBg(photo) {
        let url = photo.preview || formatImg(photo.key);
        return {
          backgroundImage: `url(${url})`
        };
      },
      formatImg(photo) {
        return photo.preview || formatImg(photo.key);
      }
    },
    components: {
      Qiniu,
      Toast,
      CommConfirm,
      FullLoading
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
      position: absolute;
      bottom: 0;
      width: 100%;
      /*margin-top: 0.4rem;*/
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-l;
    }
    .text1 {
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
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
    .inner-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0.78rem;
    }
    .btn-wrap {
      margin-top: 0.64rem;
      padding: 0 0.3rem;
    }
  }
</style>
