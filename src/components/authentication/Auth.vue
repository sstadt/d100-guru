<template lang="pug">
  .auth
    transition(name="fade")
      .auth__loading(v-if="loading")
        LoadingIcon
    transition(name="fade", mode="out-in")
      component(
        :is="currentAuthView"
        @change-auth-view="changeView"
        @start-loading="showLoading"
        @stop-loading="hideLoading"
      )
</template>

<script>
  import { mapState } from 'vuex';
  import LoadingIcon from '~/components/basic/LoadingIcon.vue';
  import Login from '~/components/authentication/Login.vue';
  import Signup from '~/components/authentication/Signup.vue';
  import ForgotPassword from '~/components/authentication/ForgotPassword.vue';

  export default {
    name: 'Auth',
    components: {
      LoadingIcon,
      Login,
      Signup,
      ForgotPassword,
    },
    data() {
      return {
        currentAuthView: 'Login',
        loading: false,
      };
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.user.currentUser,
      }),
    },
    watch: {
      currentUser() {
        if (this.currentUser) {
          this.hideLoading();
        }
      },
    },
    methods: {
      changeView(view) {
        this.currentAuthView = view;
      },
      showLoading() {
        this.loading = true;
      },
      hideLoading() {
        this.loading = false;
      },
    },
  };
</script>

<style lang="scss">
  .auth {
    position: relative;
  }

  .auth__loading {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $bg--fade-main;
    z-index: 1;
  }

  .auth__form {
    width: 100%;
    max-width: 100%;
  }

  .auth__title {
    margin-bottom: 4px;
  }

  .auth__subtitle {
    font-size: rem(12);
    margin-bottom: $content-gutter;
  }

  .auth__link {
    margin-right: 8px;
  }
</style>
