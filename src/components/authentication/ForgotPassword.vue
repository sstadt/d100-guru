<template lang="pug">
  .request-reset
    h2.auth__title Forgot Password
    .auth__subtitle
      a.auth__link(href="#" @click.prevent="switchView('Login')") Login
    transition(name="fade")
      .alert.alert--success(v-if="requestSubmitted") Check your email!
    validation-observer(v-slot="{ invalid, handleSubmit }")
      form.auth__form(@submit.prevent="handleSubmit(requestReset)" novalidate)
        validation-provider(name="Email" rules="required|email" v-slot="{ errors }")
          .form-input
            email-input(
              label="Email Address"
              placeholder="example@gmail.com"
              v-model="email"
              :errors="errors"
            )
        submit-button(label="Send Reset Instructons" :disabled="invalid" full)
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import SubmitButton from '~/components/buttons/SubmitButton.vue';
  import EmailInput from '~/components/inputs/EmailInput.vue';

  export default {
    name: 'ForgotPassword',
    components: {
      ValidationObserver,
      ValidationProvider,
      SubmitButton,
      EmailInput,
    },
    data() {
      return {
        requestSubmitted: false,
        email: '',
      };
    },
    methods: {
      switchView(view) {
        this.$emit('change-auth-view', view);
      },
      requestReset() {
        this.$store.dispatch('user/requestReset', this.email);
        this.requestSubmitted = true;
      },
    },
  };
</script>

<style scoped lang="scss"></style>
