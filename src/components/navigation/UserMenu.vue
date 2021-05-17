<template lang="pug">
  .user-menu
    PrimaryButton.user-menu__dropdown-toggle(
      :label="statusLabel"
      :icon="statusIcon"
      :icon-size="10"
      reverse-icon
      text
      @click="handleTopClick"
    )
    .user-menu__dropdown(v-if="currentUser && dropdownOpen")
      PrimaryButton.user-menu__dropdown-action(
        label="Log Out"
        text
        @click="logout"
      )
</template>

<script>
  import { mapState } from 'vuex';
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
      ...mapState({
        currentUser: (state) => state.user.currentUser,
        loggedIn: (state) => state.user.loggedIn,
        authInitialized: (state) => state.user.authInitialized,
      }),
      statusLabel() {
        return this.loggedIn
          ? `Hey, ${this.currentUser.displayName}!`
          : 'Log In';
      },
      statusIcon() {
        if (!this.loggedIn) return null;
        return this.dropdownOpen ? 'chevron-up' : 'chevron-down';
      },
    },
    methods: {
      handleTopClick() {
        if (this.loggedIn) {
          this.toggleDropdown();
        } else {
          this.$store.dispatch('user/openAuth');
        }
      },
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      logout() {
        this.dropdownOpen = false;
        this.$store.dispatch('user/logout');
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
