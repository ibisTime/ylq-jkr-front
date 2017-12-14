<template>
  <div class="qz-list-wrapper" v-show="data">
    <split-bar @toggle="toggle" :isHide="isHide" title="运营商认证"></split-bar>
    <div class="list-wrap" ref="listWrap" :class="{hide: isHide}">
      <div class="list-item cd-flexbox" :class="{'border-bottom-1px': realnameCheck=='匹配'}">
        <div class="title">姓名</div>
        <div class="cd-flex1">{{realname}}（和运营商数据{{realnameCheck}}）</div>
      </div>
      <div class="list-item border-bottom-1px tip" v-if="realnameCheck!='匹配'">
        <p>运营商登记姓名: {{mobRealname}}</p>
      </div>
      <div class="list-item cd-flexbox">
        <div class="title">身份证</div>
        <div class="cd-flex1">{{idNo}}</div>
      </div>
      <div class="list-item border-bottom-1px tip">
        <p>{{idNoValid}}，和运营商数据{{idNoCheck}}</p>
        <p>运营商登记身份证: {{mobIdNo}}</p>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">性别</div>
        <div class="cd-flex1">{{gender}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">年龄</div>
        <div class="cd-flex1">{{age}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px" v-if="homeAddr">
        <div class="title">家庭地址</div>
        <div class="cd-flex1">{{homeAddr}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px" v-if="homeTel">
        <div class="title">家庭电话</div>
        <div class="cd-flex1">{{homeTel}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px" v-if="companyName">
        <div class="title">工作单位</div>
        <div class="cd-flex1">{{companyName}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px" v-if="workAddr">
        <div class="title">单位地址</div>
        <div class="cd-flex1">{{workAddr}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px" v-if="workTel">
        <div class="title">单位电话</div>
        <div class="cd-flex1">{{workTel}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px" v-if="email">
        <div class="title">邮箱</div>
        <div class="cd-flex1">{{email}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">手机号</div>
        <div class="cd-flex1">{{mobile}}（{{isMobIdentity ? '已实名' : '未实名'}}）</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">号码归属地</div>
        <div class="cd-flex1">{{mobileAddr}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">运营商</div>
        <div class="cd-flex1">{{mobileCarrier}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">账号状态</div>
        <div class="cd-flex1">{{accountStatus}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">账号余额</div>
        <div class="cd-flex1">{{accountBalance}}</div>
      </div>
      <div class="list-item cd-flexbox border-bottom-1px">
        <div class="title">入网时间</div>
        <div class="cd-flex1">{{mobileNetTime}}</div>
      </div>
      <div class="list-item cd-flexbox" v-if="jjlxrList.length">
        <div class="title">紧急联系人</div>
        <div class="cd-flex1">
          <p v-for="phone in jjlxrList">{{phone}}</p>
        </div>
      </div>
      <div class="list-item border-bottom-1px tip">
        <p>其它认证信息请登录web端查看</p>
      </div>
    </div>
  </div>
</template>
<script>
  import SplitBar from 'components/split-bar/split-bar';

  export default {
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        jjlxrList: [],
        isHide: false
      };
    },
    computed: {
      realname() {
        return this.data ? this.data.user_info.real_name : '';
      },
      realnameCheck() {
        if (this.data) {
          if (this.data.info_match.real_name_check_yys === '无数据') {
            return '匹配度未知';
          }
          return this.data.info_match.real_name_check_yys;
        }
        return '';
      },
      mobRealname() {
        return this.data ? this.data.mobile_info.real_name : '';
      },
      idNo() {
        return this.data ? this.data.user_info.identity_code : '';
      },
      idNoValid() {
        if (this.data) {
          if (this.data.info_check.is_identity_code_valid === '是') {
            return '身份证有效';
          }
          if (this.data.info_check.is_identity_code_valid === '否') {
            return '身份证无效';
          }
          return '身份证有效性未知';
        }
      },
      idNoCheck() {
        if (this.data) {
          if (this.data.info_match.identity_code_check_yys === '无数据') {
            return '匹配度未知';
          }
          return this.data.info_match.identity_code_check_yys;
        }
        return '';
      },
      mobIdNo() {
        return this.data ? this.data.mobile_info.identity_code : '';
      },
      gender() {
        return this.data ? this.data.user_info.gender : '';
      },
      age() {
        return this.data ? this.data.user_info.age : '';
      },
      homeAddr() {
        return this.data ? this.data.user_info.home_addr : '';
      },
      homeTel() {
        return this.data ? this.data.user_info.home_tel : '';
      },
      companyName() {
        return this.data ? this.data.user_info.company_name : '';
      },
      workAddr() {
        return this.data ? this.data.user_info.work_addr : '';
      },
      workTel() {
        return this.data ? this.data.user_info.work_tel : '';
      },
      email() {
        return this.data ? this.data.user_info.email : '';
      },
      mobile() {
        return this.data ? this.data.mobile_info.user_mobile : '';
      },
      isMobIdentity() {
        return !!(this.data && this.data.mobile_info.identity_code);
      },
      mobileAddr() {
        return this.data ? this.data.mobile_info.mobile_net_addr : '';
      },
      mobileCarrier() {
        return this.data ? this.data.mobile_info.mobile_carrier : '';
      },
      accountStatus() {
        return this.data ? this.data.mobile_info.account_status : '';
      },
      accountBalance() {
        return this.data ? this.data.mobile_info.account_balance / 100 : '';
      },
      mobileNetTime() {
        return this.data ? this.data.mobile_info.mobile_net_time : '';
      }
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
      },
      analyzeQzList(newData) {
        if (newData) {
          let arr = ['emergency_contact1_detail', 'emergency_contact2_detail',
            'emergency_contact3_detail', 'emergency_contact4_detail', 'emergency_contact5_detail'];
          this.jjlxrList = arr.filter(key => this.data[key]).map(key => this.data[key].contact_number);
          setTimeout(() => {
            this.$refs.listWrap.style.height = this.$refs.listWrap.clientHeight + 'px';
          }, 40);
        }
      }
    },
    watch: {
      data(newData) {
        this.analyzeQzList(newData);
      }
    },
    components: {
      SplitBar
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .qz-list-wrapper {
    background-color: #fff;
    .list-wrap {
      padding-left: 0.3rem;
      overflow: hidden;
      transition: height 0.3s;
      &.hide {
        height: 0 !important;
      }
      .list-item {
        padding: 0.2rem 0.3rem 0.2rem 0;
        line-height: 0.4rem;
        font-size: $font-size-medium;
        &.border-bottom-1px {
          @include border-bottom-1px($color-border);
        }
        &:last-child {
          @include border-none();
        }
        &.tip {
          padding-top: 0;
          color: $color-text-l;
        }
        .title {
          flex: 0 0 6em;
        }
      }
    }
  }
</style>
