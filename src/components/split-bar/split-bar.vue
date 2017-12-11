<template>
  <div class="split-bar-wrapper">
    <div class="split-bar border-bottom-1px" :class="{active: !hide}" @click="toggle">{{title}}<i class="arrow"></i></div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isHide: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        hide: this.isHide
      };
    },
    methods: {
      toggle() {
        this.hide = !this.hide;
        this.$emit('toggle');
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
  .split-bar-wrapper {
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
  }
</style>