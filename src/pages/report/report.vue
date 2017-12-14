<template>
  <div class="report-wrapper">
    <sjrz-list :data="sjrzInfo"></sjrz-list>
    <zmrz-list :data="zmrzInfo"></zmrz-list>
    <jbxx-list :data="jbxxList" :dict="hygzDict"></jbxx-list>
    <sfz-list :data="sfzPics"></sfz-list>
    <dw-list :data="dwInfo"></dw-list>
    <txl-list :data="txlList"></txl-list>
    <yys-list :data="yysInfo"></yys-list>
    <zmf-list :data="zmfInfo"></zmf-list>
    <hygz-list :data="hygzList"></hygz-list>
    <qz-list :data="qzList"></qz-list>
    <td-list :data="tdInfo"></td-list>
    <full-loading v-show="loadFlag"></full-loading>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import SjrzList from 'components/sjrz-list/sjrz-list';
  import ZmrzList from 'components/zmrz-list/zmrz-list';
  import JbxxList from 'components/jbxx-list/jbxx-list';
  import SfzList from 'components/sfz-list/sfz-list';
  import DwList from 'components/dw-list/dw-list';
  import TxlList from 'components/txl-list/txl-list';
  import YysList from 'components/yys-list/yys-list';
  import ZmfList from 'components/zmf-list/zmf-list';
  import HygzList from 'components/hygz-list/hygz-list';
  import QzList from 'components/qz-list/qz-list';
  import TdList from 'components/td-list/td-list';
  import {setTitle, getReportCode} from 'common/js/util';
  import {getReport} from 'api/biz';
  import {getDictList} from 'api/general';

  export default {
    data() {
      return {
        loadFlag: true,
        sjrzInfo: null,
        zmrzInfo: null,
        jbxxList: null,
        sfzPics: null,
        dwInfo: null,
        txlList: null,
        yysInfo: null,
        zmfInfo: null,
        hygzList: null,
        hygzDict: null,
        qzList: null,
        tdInfo: null
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
          // 手机认证
          this.sjrzInfo = this.getDataByKey('F1', data);
          // 芝麻认证
          this.zmrzInfo = this.getDataByKey('F2', data);
          // 基本信息
          this.jbxxList = this.getDataByKey('F3', data);
          // 身份证正反面
          this.sfzPics = this.getDataByKey('PID1', data);
          // 强制定位
          this.dwInfo = this.getDataByKey('PDW2', data);
          // 通讯录
          this.txlList = this.getDataByKey('PTXL3', data);
          // 运营商
          this.yysInfo = this.getDataByKey('PYYS4', data);
          // 芝麻分
          this.zmfInfo = this.getDataByKey('PZM5', data);
          // 行业关注清单
          this.hygzList = this.getDataByKey('PZM6', data);
          // 欺诈三接口
          this.qzList = this.getDataByKey('PZM7', data);
          // 同盾
          this.tdInfo = this.getDataByKey('PTD8', data);
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
      },
      getDataByKey(key, data) {
        try {
          return data[key] ? JSON.parse(data[key]) : null;
        } catch (e) {
          return null;
        }
      }
    },
    components: {
      FullLoading,
      SjrzList,
      ZmrzList,
      JbxxList,
      SfzList,
      DwList,
      TxlList,
      YysList,
      ZmfList,
      HygzList,
      QzList,
      TdList
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
