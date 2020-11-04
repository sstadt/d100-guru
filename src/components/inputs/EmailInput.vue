<template lang="pug">
  .input.input--email
    label.input__label(v-if="label" :for="inputId") {{ label }}
    input.input__input(type="email" :placeholder="placeholder" :id="inputId" v-model="currentValue")
</template>

<script>
  import TextInput from '~/components/inputs/TextInput.vue';

  export default {
    name: 'EmailInput',
    extends: TextInput,
  };
</script>

<style scoped lang="scss"></style>
