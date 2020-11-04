<template lang="pug">
  .input.input--password
    label(v-if="label") {{ label }}
    input(type="password" v-model="currentValue")
</template>

<script>
  import TextInput from '~/components/inputs/TextInput.vue';

  export default {
    name: 'PasswordInput',
    extends: TextInput,
  };
</script>

<style scoped lang="scss"></style>
