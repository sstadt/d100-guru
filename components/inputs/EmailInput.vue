<template lang="pug">
  .input.input--email
    label(v-if="label") {{ label }}
    input(type="email", :placeholder="placeholder", v-model="currentValue")
    transition(name="slide-fade-right")
      .u-text-error.input__error(v-if="!isValid" role="alert") Please enter a valid email address
</template>

<script>
  import { debounce } from 'scripts/helpers/util.js';

  import TextInput from 'scripts/components/forms/TextInput.vue';

  export default {
    name: 'NumberInput',
    extends: TextInput,
    data() {
      return {
        isValid: true,
      };
    },
    watch: {
      currentValue: debounce(function currentValueDebounce() {
        this.validate();
      }, 300),
    },
    methods: {
      validate() {
        this.isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.currentValue);

        if (this.isValid) {
          this.$emit('valid');
        } else {
          this.$emit('invalid');
        }
      },
    },
  };
</script>

<style scoped lang="scss"></style>
