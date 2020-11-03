<template lang="pug">
  div
    navbar-desktop
    nuxt
</template>

<script>
  import NavbarDesktop from '~/components/navigation/NavbarDesktop.vue';

  export default {
    middleware: 'setup-lists',
    components: {
      NavbarDesktop,
    },
  };
</script>

<style lang="scss">
  @import '~/styles/style';
</style>
