<template lang="pug">
  .page--index
    sticky-hero
      .container
        h2(v-if="$mq === 'desktop'") D100 Guru
        h2(v-else) Foo
        primary-button(icon="check" label="Foo")
    .container
      list-grid
</template>

<script>
  import StickyHero from '~/components/hero/StickyHero.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import ListGrid from '~/components/lists/ListGrid.vue';

  export default {
    component: {
      StickyHero,
      PrimaryButton,
      ListGrid,
    },
  };
</script>

<style lang="scss">
  .page--index {
    position: relative;
  }
</style>
