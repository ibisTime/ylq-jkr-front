<template>
  <div id="app" @touchmove.prevent>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {isLogin} from 'common/js/util';
  export default {
    created() {
      if (!isLogin()) {
        this.$router.push('/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
