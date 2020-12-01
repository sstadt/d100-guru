<template lang="pug">
  .input.input--password(:class="wrapperClass")
    label.input__label(v-if="label" :for="inputId") {{ label }}
    input.input__input(
      type="password"
      :class="wrapperClass"
      :id="inputId"
      v-model="currentValue"
    )
    span.error(v-show="errors.length > 0") {{ errors[0] }}
</template>

<script>
  import TextInput from '~/components/inputs/TextInput.vue';

  export default {
    name: 'PasswordInput',
    extends: TextInput,
  };
</script>

<style scoped lang="scss"></style>
