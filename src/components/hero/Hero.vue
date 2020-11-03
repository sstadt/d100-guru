<template lang="pug">
  .hero
    slot
</template>

<script>
  export default {
    name: 'Hero',
  };
</script>

<style scoped lang="scss">
  .hero {
    border-radius: 20px;
    border: 1px solid $border--main;
  }
</style>
