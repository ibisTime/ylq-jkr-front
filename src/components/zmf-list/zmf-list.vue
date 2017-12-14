<template>
  <div class="jbxx-list-wrapper" v-show="data">
    <split-bar @toggle="toggle" :isHide="isHide" title="芝麻分认证"></split-bar>
    <div class="list-wrapper" ref="listWrap" :class="{hide: isHide}">
      <div class="list-item cd-flexbox">
        <div class="title">芝麻分</div>
        <div class="desc cd-flex1">{{score}}</div>
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
        isHide: false
      };
    },
    computed: {
      score() {
        return this.data ? this.data.zmScore : null;
      }
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
      }
    },
    watch: {
      data(newData) {
        if (newData) {
          setTimeout(() => {
            this.$refs.listWrap.style.height = this.$refs.listWrap.clientHeight + 'px';
          }, 40);
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
        .title {
          flex: 0 0 6em;
        }
      }
    }
  }
</style>
