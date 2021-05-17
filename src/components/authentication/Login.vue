<template lang="pug">
  .login
    h2.auth__title Login
    .auth__subtitle
      a.auth__link(href="#" @click.prevent="switchView('Signup')") Sign Up
      a.auth__link(href="#" @click.prevent="switchView('ForgotPassword')") Forgot Password
    transition(name="slide-left")
      p.alert.alert--error(v-if="error.length > 0") {{ error }}
    ValidationObserver(v-slot="{ invalid, handleSubmit }")
      form.auth__form(@submit.prevent="handleSubmit(login)" novalidate)
        ValidationProvider(name="Email" rules="required|email" v-slot="{ errors }")
          .form-input
            EmailInput(
              label="Email Address"
              placeholder="example@gmail.com"
              v-model="email"
              :errors="errors"
            )
        ValidationProvider(name="Password" rules="required" v-slot="{ errors }")
          .form-input
            PasswordInput(
              label="Password"
              name="password"
              placeholder="Password"
              v-model="password"
              :errors="errors"
            )
        SubmitButton(label="Sign In" :wide="true" :disabled="invalid" full)
    PrimaryButton(label="Sign in with Google" icon="google" full @click="googleLogin")
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
        error: '',
      };
    },
    methods: {
      switchView(view) {
        this.$emit('change-auth-view', view);
      },
      startLogin() {
        this.error = '';
        this.$emit('start-loading');
      },
      login() {
        this.startLogin();
        this.$store
          .dispatch('user/login', {
            email: this.email,
            password: this.password,
          })
          .then(
            () => {},
            (error) => {
              this.$emit('stop-loading');
              this.handleSubmitError(error);
            }
          );
      },
      googleLogin() {
        this.startLogin();
        this.$store.dispatch('user/googleLogin').then(
          () => {},
          (error) => {
            this.$emit('stop-loading');
            this.handleSubmitError(error);
          }
        );
      },
      handleSubmitError(error) {
        switch (error.code) {
          case 'auth/wrong-password':
            this.error = 'Wrong username or password';
            break;
          case 'auth/too-many-requests':
            this.error = error.message;
            break;

          default:
            this.error =
              'There was an error logging you in, please try again later.';
            break;
        }
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
