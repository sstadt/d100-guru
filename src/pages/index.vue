<template lang="pug">
  .container
    .row
      .column-small-12
        primary-button(:icon="check" label="Foo")
</template>

<script>
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';

  export default {
    component: {
      PrimaryButton,
    },
  };
</script>

<style lang="scss"></style>
