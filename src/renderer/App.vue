<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    beforeMount() { // addCollection
      // this.$db.loadDatabase();
      // console.log('app00', this.$db.getCollection('users'), this.$db);
    },
  };
</script>

<style>
  /* CSS */
</style>
