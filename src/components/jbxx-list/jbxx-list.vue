<template>
  <div class="jbxx-list-wrapper" v-show="data">
    <split-bar @toggle="toggle0" :isHide="isHide0" title="基本信息"></split-bar>
    <div class="list-wrapper" ref="listWrap0" :class="{hide: isHide0}">
      <div class="list-item cd-flexbox" v-for="item in jbxxList">
        <div class="title">{{item.title}}</div>
        <div class="desc cd-flex1">{{item.value}}</div>
      </div>
    </div>
    <split-bar @toggle="toggle1" :isHide="isHide1" title="职业信息"></split-bar>
    <div class="list-wrapper" ref="listWrap1" :class="{hide: isHide1}">
      <div class="list-item cd-flexbox" v-for="item in zyxxList">
        <div class="title">{{item.title}}</div>
        <div class="desc cd-flex1">{{item.value}}</div>
      </div>
    </div>
    <split-bar @toggle="toggle2" :isHide="isHide2" title="紧急联系人"></split-bar>
    <div class="list-wrapper" ref="listWrap2" :class="{hide: isHide2}">
      <div class="list-item cd-flexbox" v-for="item in jjlxrList">
        <div class="title">{{item.title}}</div>
        <div class="desc cd-flex1">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import SplitBar from 'components/split-bar/split-bar';
  import {JbxxDict, ZyxxDict, JjlxrDict, ListSequence} from './config';

  export default {
    props: {
      data: {
        type: Object,
        default: null
      },
      dict: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    data() {
      return {
        isHide0: false,
        isHide1: false,
        isHide2: false,
        jbxxList: [],
        zyxxList: [],
        jjlxrList: []
      };
    },
    methods: {
      toggle0() {
        this.isHide0 = !this.isHide0;
      },
      toggle1() {
        this.isHide1 = !this.isHide1;
      },
      toggle2() {
        this.isHide2 = !this.isHide2;
      },
      calcData(data, dict) {
        let _jbxxList = [];
        let _zyxxList = [];
        let _jjlxrList = [];
        ListSequence.forEach((key) => {
          let r = {};
          switch(key) {
            case 'education':
              r.value = dict.education[data[key]]; break;
            case 'marriage':
              r.value = dict.marriage[data[key]]; break;
            case 'liveTime':
              r.value = dict.live_time[data[key]]; break;
            case 'occupation':
              r.value = dict.occupation[data[key]]; break;
            case 'income':
              r.value = dict.income[data[key]]; break;
            case 'familyRelation':
              r.value = dict.family_relation[data[key]]; break;
            case 'societyRelation':
              r.value = dict.society_relation[data[key]]; break;
            default:
              r.value = data[key];
          }
          if (JbxxDict[key]) {
            r.title = JbxxDict[key];
            _jbxxList.push(r);
          } else if (ZyxxDict[key]) {
            r.title = ZyxxDict[key];
            _zyxxList.push(r);
          } else if (JjlxrDict[key]) {
            r.title = JjlxrDict[key];
            _jjlxrList.push(r);
          }
        });
        this.jbxxList = _jbxxList;
        this.zyxxList = _zyxxList;
        this.jjlxrList = _jjlxrList;
        setTimeout(() => {
          this.$refs.listWrap0.style.height = this.$refs.listWrap0.clientHeight + 'px';
          this.$refs.listWrap1.style.height = this.$refs.listWrap1.clientHeight + 'px';
          this.$refs.listWrap2.style.height = this.$refs.listWrap2.clientHeight + 'px';
        }, 40);
      }
    },
    watch: {
      data(newData) {
        if (newData && this.dict) {
          this.calcData(newData, this.dict);
        }
      },
      dict(newDict) {
        if (this.data && newDict) {
          this.calcData(this.data, newDict);
        }
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

  .jbxx-list-wrapper {
    background-color: #fff;
    .list-wrapper {
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
        @include border-bottom-1px($color-border);
        &:last-child {
          @include border-none();
        }
        .title {
          flex: 0 0 6em;
        }
      }
    }
  }
</style>
