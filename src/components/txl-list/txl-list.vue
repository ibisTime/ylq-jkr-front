<template>
    <div class="txl-list-wrapper" v-show="data">
      <split-bar @toggle="toggle" :isHide="isHide" title="通讯录认证"></split-bar>
      <table class="list-wrap" ref="listWrap" :class="{hide: isHide}">
        <tr v-for="item in txlList" class="list-item">
          <td class="border-bottom-1px">{{item.name}}</td>
          <td class="border-bottom-1px">{{item.mobile}}</td>
        </tr>
      </table>
    </div>
</template>
<script>
  import SplitBar from 'components/split-bar/split-bar';

  export default {
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        txlList: [],
        isHide: false
      };
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
      },
      analyzeTxlData(newData) {
        if (newData) {
          this.txlList = newData.filter(v => (v.name || v.mobile));
          setTimeout(() => {
            this.$refs.listWrap.style.height = this.$refs.listWrap.clientHeight + 'px';
          }, 40);
        }
      }
    },
    watch: {
      data(newData) {
        this.analyzeTxlData(newData);
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

  .txl-list-wrapper {
    background-color: #fff;
    .list-wrap {
      display: block;
      padding-left: 0.3rem;
      overflow: hidden;
      transition: height 0.3s;
      &.hide {
        height: 0 !important;
      }
      .list-item {
        font-size: $font-size-medium;
        td {
          padding: 0.2rem 0.3rem;
          line-height: 0.4rem;
          @include border-bottom-1px($color-border);
          &+td {
            padding-left: 0;
          }
        }
        &:last-child td {
          @include border-none();
        }
      }
    }
  }
</style>
