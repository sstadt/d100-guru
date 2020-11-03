<template lang="pug">
  .navbar.navbar--desktop
    .container
      .row
        .column.small-12
          nuxt-link.navbar__escape-hatch(to="/") D100 Guru
</template>

<script>
  export default {
    name: 'NavbarDesktop',
  };
</script>

<style scoped lang="scss">
  .navbar {
    padding: 20px 0;
    background-color: $bg--navbar;
  }
</style>
