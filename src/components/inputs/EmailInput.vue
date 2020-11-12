<template lang="pug">
  .input.input--email(:class="wrapperClass")
    label.input__label(v-if="label" :for="inputId") {{ label }}
    input.input__input(
      type="email"
      :class="wrapperClass"
      :placeholder="placeholder"
      :id="inputId"
      v-model="currentValue"
    )
    span.error(v-show="errors.length > 0") {{ errors[0] }}
</template>

<script>
  import TextInput from '~/components/inputs/TextInput.vue';

  export default {
    name: 'EmailInput',
    extends: TextInput,
  };
</script>

<style scoped lang="scss"></style>
