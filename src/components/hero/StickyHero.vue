<template lang="pug">
  .sticky-hero
    .sticky-hero__content
      slot
</template>

<script>
  export default {
    name: 'Hero',
  };
</script>

<style scoped lang="scss">
  .sticky-hero {
    position: sticky;
    top: 0;
    padding: 20px 0;
    box-shadow: $drop-shadow--tight;
    border-bottom: 1px solid $border--subtle;
    background-color: $bg--main;
  }
</style>
