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

  .auth__links {
    display: flex;
    justify-content: space-between;
    margin-top: $content-gutter;
  }
</style>
