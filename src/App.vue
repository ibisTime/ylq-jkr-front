<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {isLogin} from 'common/js/util';
  export default {
    created() {
      if (!isLogin() && location.pathname !== '/find-pwd' && location.pathname !== '/login') {
        this.$router.replace('/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
