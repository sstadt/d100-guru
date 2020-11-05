<template lang="pug">
  .signup
    h2.auth__title Signup
    .auth__subtitle
      a.auth__link(href="#", @click.prevent="switchToLogin") Login
    validation-observer(v-slot="{ invalid, handleSubmit }")
      form.auth__form(@submit.prevent="handleSubmit(signUp)", novalidate)
        validation-provider(name="Password" rules="required" v-slot="{ errors }")
          .form-input
            text-input(
              label="Display Name"
              :class="{ 'error': errors.length > 0 }"
              placeholder="Display Name"
              v-model="name"
              :errors="errors"
            )
        validation-provider(name="Password" rules="required|email" v-slot="{ errors }")
          .form-input
            email-input(
              label="Email Address"
              :class="{ 'error': errors.length > 0 }"
              placeholder="Email"
              v-model="email"
              :errors="errors"
            )
        validation-provider(name="Password" rules="required" v-slot="{ errors }")
          .form-input
            password-input(
              label="Password"
              :class="{ 'error': errors.length > 0 }"
              placeholder="Password"
              v-model="password"
              :errors="errors"
            )
            password-strength(:password="password")
        submit-button(label="Sign Up" :disabled="invalid" full)
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import TextInput from '~/components/inputs/TextInput.vue';
  import EmailInput from '~/components/inputs/EmailInput.vue';
  import PasswordInput from '~/components/inputs/PasswordInput.vue';
  import SubmitButton from '~/components/buttons/SubmitButton.vue';
  import PasswordStrength from '~/components/basic/PasswordStrength.vue';

  export default {
    name: 'Signup',
    components: {
      ValidationObserver,
      ValidationProvider,
      TextInput,
      EmailInput,
      PasswordInput,
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
        this.$store.dispatch('user/signup', {
          email: this.email,
          password: this.password,
          displayName: this.name,
        });
      },
    },
  };
</script>

<style scoped lang="scss"></style>
