<template lang="pug">
  div
    navbar-desktop
    nuxt
    auth-modal
</template>

<script>
  import AuthModal from '~/components/authentication/AuthModal.vue';
  import NavbarDesktop from '~/components/navigation/NavbarDesktop.vue';

  export default {
    middleware: 'setup-lists',
    components: {
      AuthModal,
      NavbarDesktop,
    },
  };
</script>

<style lang="scss">
  @import '~/styles/style';
</style>
