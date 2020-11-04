<template lang="pug">
  .user-menu
    primary-button.user-menu__dropdown-toggle(
      :label="statusLabel"
      :icon="statusIcon"
      icon-size="10px"
      reverse-icon
      text
      @click="toggleDropdown"
    )
    .user-menu__dropdown(v-if="dropdownOpen")
      primary-button.user-menu__dropdown-action(label="Log Out" text)
</template>

<script>
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';

  export default {
    name: 'UserMenu',
    components: {
      PrimaryButton,
    },
    data() {
      return {
        dropdownOpen: false,
      };
    },
    computed: {
      statusLabel() {
        return 'Log In';
      },
      statusIcon() {
        return this.dropdownOpen ? 'chevron-up' : 'chevron-down';
      },
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
    },
  };
</script>

<style scoped lang="scss">
  .user-menu {
    position: relative;
  }

  .user-menu__dropdown {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
  }

  .user-menu__dropdown-toggle,
  .user-menu__dropdown-action {
    padding: 4px 8px;
    background-color: $bg--main;
  }
</style>
