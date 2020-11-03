<template lang="pug">
  .container
    .row
      .column.small-12
        hero
          h1 D100 Guru
          primary-button(icon="check" label="Foo")
</template>

<script>
  import Hero from '~/components/hero/Hero.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';

  export default {
    component: {
      Hero,
      PrimaryButton,
    },
  };
</script>

<style lang="scss"></style>
