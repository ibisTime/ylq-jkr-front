<template>
    <div class="hygz-list-wrapper" v-show="data">
      <split-bar @toggle="toggle" :isHide="isHide" title="行业关注清单"></split-bar>
      <div class="list-wrap" ref="listWrap" :class="{hide: isHide}">
        <template ng-if="hygzList.length">
          <div v-for="item in hygzList" class="list-item border-bottom-1px">
            <p v-for="cont in item.detail">{{cont}}</p>
          </div>
        </template>
        <div ng-if="!hygzList.length" class="list-item border-bottom-1px">
           <p>未被关注</p>
        </div>
      </div>
    </div>
</template>
<script>
  import HY_DATA from 'common/js/hygzmd';
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
        hygzList: [],
        isHide: false
      };
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
      },
      analyzeHygzqd(newData) {
        if (newData.detail) {
          this.hygzList = newData.detail.map((item) => {
            let result = {
              detail: []
            };
            let bizCode = HY_DATA.bizCode[item.bizCode];
            let type = bizCode.type[item.type];
            // 解析bizCode和type
            result.detail.push(bizCode.name + type.name);
            // 解析code
            let codePrefix = type.code.name ? type.code.name + '：' : '';
            result.detail.push(codePrefix + type.code[item.code]);
            // 解析extendInfo
            if (type.extendInfo && item.extendInfo) {
              item.extendInfo.forEach((info) => {
                if (info.key !== 'id') {
                  let key = type.extendInfo[info.key];
                  let keyPrefix = key.name + '：';
                  let value = info.value;
                  if (info.key === 'event_max_amt_code') {
                    value = key[info.value] || '未知';
                  }
                  result.detail.push(keyPrefix + value);
                }
              });
            }
            return result;
          });
          let that = this;
          setTimeout(() => {
            that.$refs.listWrap.style.height = that.$refs.listWrap.clientHeight + 'px';
          }, 20);
        }
      }
    },
    watch: {
      data(newData) {
        this.analyzeHygzqd(newData);
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

  .hygz-list-wrapper {
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
        @include border-bottom-1px($color-border);
        &:last-child {
          @include border-none();
        }
      }
    }
  }
</style>
