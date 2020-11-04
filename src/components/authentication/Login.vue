<template lang="pug">
  .login
    h2.modal__title Login
    form.auth__form(@submit.prevent="login" novalidate)
      .form-input
        input(
          type="email"
          name="email"
          placeholder="Email"
          v-model="email"
          v-validate="'required|email'"
        )
        span.error(v-show="errors.has('email')") {{ errors.first('email') }}
      .form-input
        input(
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
          v-validate="'required'"
        )
        span.error(v-show="errors.has('password')") {{ errors.first('password') }}
      submit-button(label="Sign In", :wide="true")
    primary-button(
      label="Sign in with Google"
      icon="google"
      :wide="true"
      @click="googleLogin"
    )
    .auth__links
      a(href="#", @click.prevent="switchView('Signup')") Sign Up
      a(href="#", @click.prevent="switchView('ForgotPassword')") forgot password?
</template>

<script>
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import SubmitButton from '~/components/buttons/SubmitButton.vue';
  import Icon from '~/components/basic/Icon.vue';

  export default {
    name: 'Login',
    components: {
      PrimaryButton,
      SubmitButton,
      Icon,
    },
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      switchView(view) {
        this.$emit('change-auth-view', view);
      },
      login() {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/login', {
              email: this.email,
              password: this.password,
            });
          }
        });
      },
      googleLogin() {
        this.$store.dispatch('user/googleLogin');
      },
    },
  };
</script>

<style lang="scss">
  .login {
    button[type='button'] {
      margin-top: $content-gutter;
    }
  }
</style>
