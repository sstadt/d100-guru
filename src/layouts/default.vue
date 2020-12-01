<template lang="pug">
  div
    navbar-desktop
    nuxt
    auth-modal
    toast
</template>

<script>
  import AuthModal from '~/components/authentication/AuthModal.vue';
  import NavbarDesktop from '~/components/navigation/NavbarDesktop.vue';
  import Toast from '~/components/basic/Toast.vue';

  export default {
    components: {
      AuthModal,
      NavbarDesktop,
      Toast,
    },
  };
</script>

<style lang="scss">
  @import '~/styles/style';
</style>
