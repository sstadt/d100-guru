<template lang="pug">
  .login
    h2.auth__title Login
    .auth__subtitle
      a.auth__link(href="#" @click.prevent="switchView('Signup')") Sign Up
      a.auth__link(href="#" @click.prevent="switchView('ForgotPassword')") Forgot Password
    validation-observer(v-slot="{ invalid }")
      form.auth__form(@submit.prevent="login" novalidate)
        validation-provider(name="Email" rules="required|email" v-slot="{ errors }")
          .form-input
            email-input(label="Email Address" placeholder="example@gmail.com" v-model="email")
            span.error(v-show="errors.length > 0") {{ errors[0] }}
        validation-provider(name="Password" rules="required" v-slot="{ errors }")
          .form-input
            password-input(label="Password" name="password" placeholder="Password" v-model="password")
            span.error(v-show="errors.length > 0") {{ errors[0] }}
        submit-button(label="Sign In" :wide="true" :disabled="invalid" full)
    primary-button(label="Sign in with Google" icon="google" full @click="googleLogin")
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import SubmitButton from '~/components/buttons/SubmitButton.vue';
  import Icon from '~/components/basic/Icon.vue';
  import PasswordInput from '~/components/inputs/PasswordInput.vue';
  import EmailInput from '~/components/inputs/EmailInput.vue';

  export default {
    name: 'Login',
    components: {
      ValidationObserver,
      ValidationProvider,
      PrimaryButton,
      SubmitButton,
      Icon,
      PasswordInput,
      EmailInput,
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
