<template>
  <div class="redirect-wrapper">
    <comm-confirm :noResult="noSearchResult" ref="commConfirm" @checkSuc="checkSuc"></comm-confirm>
  </div>
</template>
<script>
  import {interfaceMixin} from 'common/js/mixin';
  import CommConfirm from 'components/comm-confirm/comm-confirm';

  export default {
    mixins: [interfaceMixin],
    mounted() {
      this.$nextTick(() => {
        this.getPageInvestigation();
      });
    },
    components: {
      CommConfirm
    }
  };
</script>
<style lang="scss" scoped>
</style>
