<template>
  <div class="sfz-list-wrapper" v-show="data">
    <split-bar @toggle="toggle" :isHide="isHide" title="身份证照片认证"></split-bar>
    <div class="sfz-wrapper" ref="listWrap" :class="{hide: isHide}">
      <div class="top-pics">
        <div class="inner">
          <div class="pic" :style="identifyPic"></div>
        </div>
        <div class="inner">
          <div class="pic" :style="identifyPicReverse"></div>
        </div>
      </div>
      <div class="bottom-pics">
        <div class="big-pic" :style="identifyPicHand"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import SplitBar from 'components/split-bar/split-bar';
  import {formatImg} from 'common/js/util';

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
      identifyPic() {
        return this.data ? { backgroundImage: `url(${formatImg(this.data.identifyPic)})` } : null;
      },
      identifyPicReverse() {
        return this.data ? { backgroundImage: `url(${formatImg(this.data.identifyPicReverse)})` } : null;
      },
      identifyPicHand() {
        return this.data ? { backgroundImage: `url(${formatImg(this.data.identifyPicHand)})` } : null;
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
  .sfz-list-wrapper {
    background-color: #fff;
    .sfz-wrapper {
      overflow: hidden;
      transition: height 0.3s;
      &.hide {
        height: 0 !important;
      }
      .top-pics {
        font-size: 0;
        .inner {
          position: relative;
          display: inline-block;
          height: 0;
          width: 50%;
          padding-top: 50%;
          .pic {
            position: absolute;
            top: 0.3rem;
            left: 0.3rem;
            bottom: 0.3rem;
            right: 0.15rem;
            background-size: cover;
            background-position: center;
          }
          &+.inner {
            .pic {
              right: 0.3rem;
              left: 0.15rem;
            }
          }
        }
      }
      .bottom-pics {
        position: relative;
        height: 0;
        width: 100%;
        padding-top: 50%;
        .big-pic {
          position: absolute;
          top: 0;
          left: 0.3rem;
          right: 0.3rem;
          bottom: 0.3rem;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
  }
</style>
