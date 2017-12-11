<template>
  <div class="report-wrapper">
    <jbxx-list :data="jbxxList" :dict="hygzDict"></jbxx-list>
    <div class="split-bar border-bottom-1px">身份证照片</div>
    <div class="split-bar border-bottom-1px">通讯录认证</div>
    <div class="split-bar border-bottom-1px">运营商认证</div>
    <div class="split-bar border-bottom-1px">芝麻分认证</div>
    <hygz-list :data="hygzList"></hygz-list>
    <div class="split-bar border-bottom-1px">欺诈三接口</div>
    <div class="split-bar border-bottom-1px">同盾认证</div>
    <full-loading v-show="loadFlag"></full-loading>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import JbxxList from 'components/jbxx-list/jbxx-list';
  import HygzList from 'components/hygz-list/hygz-list';
  import {setTitle, getReportCode} from 'common/js/util';
  import {getReport} from 'api/biz';
  import {getDictList} from 'api/general';
  // import testData from './data';
  export default {
    data() {
      return {
        loadFlag: true,
        jbxxList: null,
        hygzList: null,
        hygzDict: null
      };
    },
    created() {
      setTitle('调查报告');
      Promise.all([
        this.getReport(),
        this.getDictList()
      ]).then(() => {
        this.loadFlag = false;
      }).catch(() => {
        this.loadFlag = false;
      });
    },
    methods: {
      getReport() {
        return getReport(getReportCode()).then((data) => {
          let f1 = data['F1'] ? JSON.parse(data['F1']) : {};
          let f2 = data['F2'] ? JSON.parse(data['F2']) : {};
          let f3 = data['F3'] ? JSON.parse(data['F3']) : {};
          this.jbxxList = {
            ...f1,
            ...f2,
            ...f3
          };
          // this.hygzList = testData;
          this.hygzList = data['PZM6'] ? JSON.parse(data['PZM6']) : null;
        });
      },
      getDictList() {
        return getDictList().then((data) => {
          let obj = {
            'education': {},
            'marriage': {},
            'live_time': {},
            'occupation': {},
            'income': {},
            'family_relation': {},
            'society_relation': {}
          };
          data.forEach((item) => {
            switch (item.parentKey) {
              case 'education':
                obj.education[item.dkey] = item.dvalue; break;
              case 'marriage':
                obj.marriage[item.dkey] = item.dvalue; break;
              case 'live_time':
                obj.live_time[item.dkey] = item.dvalue; break;
              case 'occupation':
                obj.occupation[item.dkey] = item.dvalue; break;
              case 'income':
                obj.income[item.dkey] = item.dvalue; break;
              case 'family_relation':
                obj.family_relation[item.dkey] = item.dvalue; break;
              case 'society_relation':
                obj.society_relation[item.dkey] = item.dvalue; break;
              default: break;
            }
          });
          this.hygzDict = obj;
        });
      }
    },
    components: {
      FullLoading,
      JbxxList,
      HygzList
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .report-wrapper {
    .split-bar {
      padding: 0 0.3rem;
      line-height: 0.8rem;
      font-size: $font-size-medium;
      background: $primary-color;
      color: #fff;
      @include border-bottom-1px(#fff);
    }
  }
</style>
