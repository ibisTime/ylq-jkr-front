<template>
  <div class="sjrz-list-wrapper" v-show="data">
    <split-bar @toggle="toggle" :isHide="isHide" title="手机认证"></split-bar>
    <div class="list-wrapper" ref="listWrap" :class="{hide: isHide}">
      <div class="list-item cd-flexbox" v-if="data">
        <div class="title">手机号</div>
        <div class="desc cd-flex1">{{data.mobile}}</div>
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
  @import "~common/scss/mixin";

  .sjrz-list-wrapper {
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
