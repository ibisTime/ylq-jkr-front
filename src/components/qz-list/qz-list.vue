<template>
    <div class="qz-list-wrapper" v-show="data">
      <split-bar @toggle="toggle" :isHide="isHide" title="欺诈认证"></split-bar>
      <div class="list-wrap" ref="listWrap" :class="{hide: isHide}">
        <div class="list-item border-bottom-1px">
           <p>评分：{{score}}</p>
        </div>
        <div class="list-item border-bottom-1px">
           <p>欺诈关注清单是否命中：{{hit ? '命中' : '未命中'}}</p>
        </div>
        <template v-if="qzList.length">
          <div v-for="cont in qzList" class="list-item border-bottom-1px">{{cont}}</div>
        </template>
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
        qzList: [],
        hit: false,
        score: '',
        isHide: false
      };
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
      },
      analyzeQzList(newData) {
        if (newData) {
          this.hit = newData.hit === 'yes';
          this.score = newData.score;
          this.qzList = newData.verifyInfoList;
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
        @include border-bottom-1px($color-border);
        &:last-child {
          @include border-none();
        }
      }
    }
  }
</style>
