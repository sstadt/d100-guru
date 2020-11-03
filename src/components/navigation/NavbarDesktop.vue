<template lang="pug">
  .navbar.navbar--desktop
    .container
      nuxt-link.navbar__escape-hatch(to="/")
        logo
</template>

<script>
  import Logo from '~/components/basic/Logo.vue';

  export default {
    name: 'NavbarDesktop',
    components: {
      Logo,
    },
  };
</script>

<style scoped lang="scss">
  .navbar {
    position: relative;
    background-color: $bg--main;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: $navbar-height--mobile;

      @include tablet-up {
        height: $navbar-height--desktop;
      }
    }
  }
</style>
