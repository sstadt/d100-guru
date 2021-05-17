<template lang="pug">
  .navbar.navbar--desktop
    .container
      NuxtLink.navbar__escape-hatch(to="/")
        Logo
      UserMenu
</template>

<script>
  import Logo from '~/components/basic/Logo.vue';
  import UserMenu from '~/components/navigation/UserMenu.vue';

  export default {
    name: 'NavbarDesktop',
    components: {
      Logo,
      UserMenu,
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
