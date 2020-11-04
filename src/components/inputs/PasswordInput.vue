<template lang="pug">
  .input.input--password
    label.input__label(v-if="label" :for="inputId") {{ label }}
    input.input__input(type="password" :id="inputId" v-model="currentValue")
</template>

<script>
  import TextInput from '~/components/inputs/TextInput.vue';

  export default {
    name: 'PasswordInput',
    extends: TextInput,
  };
</script>

<style scoped lang="scss"></style>
