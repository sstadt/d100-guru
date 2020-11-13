<template lang="pug">
  .page.page--index
    sticky-hero
      .container
        h2 D100 Guru
        primary-button(icon="check" label="Foo")
    .container.container--page
      list-grid
</template>

<script>
  import StickyHero from '~/components/hero/StickyHero.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import ListGrid from '~/components/lists/ListGrid.vue';

  export default {
    name: 'IndexPage',
    transition: 'page',
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
