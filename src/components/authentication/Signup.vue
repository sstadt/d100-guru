<template lang="pug">
  .signup
    h2.modal__title Signup
    form.auth__form(@submit.prevent="signUp", novalidate)
      .form-input
        input(
          type="text"
          :class="{ 'error': errors.has('name') }"
          name="name"
          placeholder="Display Name"
          v-model="name"
          v-validate="'required'"
        )
        span.error(v-show="errors.has('name')") {{ errors.first('name') }}
      .form-input
        input(
          type="email"
          :class="{ 'error': errors.has('email') }"
          name="email"
          placeholder="Email"
          v-model="email"
          v-validate="'required|email'"
        )
        span.error(v-show="errors.has('email')") {{ errors.first('email') }}
      .form-input
        input(
          type="password"
          :class="{ 'error': errors.has('password') }"
          name="password"
          placeholder="Password"
          v-model="password"
          v-validate="'required'"
        )
        password-strength(:password="password")
        span.error(v-show="errors.has('password')") {{ errors.first('password') }}
      submit-button(label="Sign Up", :wide="true")
    .auth__links
      a(href="#", @click.prevent="switchToLogin") Login
</template>

<script>
  import SubmitButton from '~/components/buttons/SubmitButton.vue';
  import PasswordStrength from '~/components/basic/PasswordStrength.vue';

  export default {
    name: 'Signup',
    components: {
      SubmitButton,
      PasswordStrength,
    },
    data() {
      return {
        email: '',
        password: '',
        name: '',
      };
    },
    methods: {
      switchToLogin() {
        this.$emit('change-auth-view', 'Login');
      },
      signUp() {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/signup', {
              email: this.email,
              password: this.password,
              displayName: this.name,
            });
          }
        });
      },
    },
  };
</script>

<style scoped lang="scss"></style>
