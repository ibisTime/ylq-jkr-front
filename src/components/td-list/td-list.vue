<template>
    <div class="qz-list-wrapper" v-show="data">
      <split-bar @toggle="toggle" :isHide="isHide" title="同盾认证"></split-bar>
      <div class="list-wrap" ref="listWrap" :class="{hide: isHide}">
        <div class="list-item border-bottom-1px">
           <p>风险指数：{{tdData.final_score}}</p>
        </div>
        <div class="list-item border-bottom-1px">
           <p>{{tip}}</p>
        </div>
        <div class="list-item border-bottom-1px">
           <p>共发现<span class="num-tip">{{riskItems.length}}</span>条异常信息，详情请查看web端</p>
        </div>
        <div class="list-item border-bottom-1px" v-for="(item,index) in riskItems">
           <p>{{index+1}}、{{item.item_name}}</p>
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
        tdData: {},
        riskItems: [],
        isHide: false
      };
    },
    computed: {
      tip() {
        switch(this.tdData.final_decision) {
          case 'Accept':
            return '申请用户未检出高危风险，建议通过';
          case 'Review':
            return '申请用户存在较大风险，建议进行人工审核';
          case 'Reject':
            return '申请用户检测出高危风险，建议拒绝';
          default:
            return '';
        }
      }
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
      },
      analyzeTdData(newData) {
        if (newData) {
          this.tdData = JSON.parse(newData.tdData);
          this.riskItems = this.tdData.risk_items;
          setTimeout(() => {
            this.$refs.listWrap.style.height = this.$refs.listWrap.clientHeight + 'px';
          }, 40);
        }
      }
    },
    watch: {
      data(newData) {
        this.analyzeTdData(newData);
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
        @include border-bottom-1px($color-border);
        &:last-child {
          @include border-none();
        }
        .num-tip {
          color: $color-red;
        }
      }
    }
  }
</style>
