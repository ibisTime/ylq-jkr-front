<template>
  <div class="hygzqd-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">姓名</div>
        <div class="inner-label">为了我</div>
      </div>
      <div class="form-item">
        <div class="item-label">身份证号</div>
        <div class="inner-label">3333333333333333333</div>
      </div>
      <div class="form-btn">
        <button @click="submit">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import {setTitle, setCurRouter} from 'common/js/util';
  export default {
    data() {
      return {
        loadFlag: false,
        loadText: ''
      };
    },
    created() {
      setCurRouter('PZM5');
      setTitle('芝麻分认证');
    },
    methods: {
      submit() {}
    },
    components: {
      setTitle,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
</style>
