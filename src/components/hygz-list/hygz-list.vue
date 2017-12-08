<template>
    <div class="hygz-list-wrapper" v-show="data.length">
      <div class="split-bar border-bottom-1px" :class="{active: !isHide}" @click="toggle">行业关注清单<i class="arrow"></i></div>
      <div class="list-wrap" ref="listWrap" :class="{hide: isHide}">
        <div v-for="item in hygzList" class="list-item border-bottom-1px">
          <p v-for="cont in item.detail">{{cont}}</p>
        </div>
      </div>
    </div>
</template>
<script>
  import HY_DATA from 'common/js/hygzmd';

  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
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
      analyzeHygzqd(list) {
        this.hygzList = list.map((item) => {
          let result = {
            detail: []
          };
          let bizCode = HY_DATA.bizCode[item.bizCode];
          let type = bizCode.type[item.type];
          // 解析bizCode和type
          result.detail.push(bizCode.name + type.name);
          // 解析code
          let codePrefix = type.code.name + '：' || '';
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
    },
    watch: {
      data(newData) {
        this.analyzeHygzqd(newData);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .hygz-list-wrapper {
    background-color: #fff;
    .split-bar {
      position: relative;
      padding: 0 0.3rem;
      line-height: 0.8rem;
      font-size: $font-size-medium;
      background: $primary-color;
      color: #fff;
      @include border-bottom-1px(#fff);
      .arrow {
        position: absolute;
        right: 0.24rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        @include bg-image('more');
        width: 0.3rem;
        height: 0.3rem;
        top: 50%;
        margin-top: -0.15rem;
        transition: transform 0.3s;
      }
      &.active {
        .arrow {
          transform: rotate(90deg);
        }
      }
    }
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
