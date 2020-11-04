<template lang="pug">
  .auth
    transition(name="fade", mode="out-in")
      component(:is="currentAuthView", @change-auth-view="changeView")
</template>

<script>
  import Login from '~/components/authentication/Login.vue';
  import Signup from '~/components/authentication/Signup.vue';
  import ForgotPassword from '~/components/authentication/ForgotPassword.vue';

  export default {
    name: 'Auth',
    components: {
      Login,
      Signup,
      ForgotPassword,
    },
    data() {
      return {
        currentAuthView: 'Login',
      };
    },
    methods: {
      changeView(view) {
        this.currentAuthView = view;
      },
    },
  };
</script>

<style lang="scss">
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
