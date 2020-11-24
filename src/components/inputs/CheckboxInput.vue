<template lang="pug">
  .input.input--checkbox(:class="inputClass")
    input(type="checkbox", :id="inputId" v-model="currentValue" :disabled="disabled" :value="value")
    .input--checkbox__indicator
    label(:for="inputId") {{ label }}
</template>

<script>
  export default {
    name: 'CheckboxInput',
    props: {
      value: Boolean,
      disabled: Boolean,
      checked: Boolean,
      label: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        currentValue: this.value,
      };
    },
    computed: {
      inputClass() {
        return {
          disabled: this.disabled,
        };
      },
      inputId() {
        return `input_${this._uid}`;
      },
    },
    watch: {
      currentValue() {
        this.$emit('input', this.currentValue);
      },
    },
    mounted() {
      if (this.checked) {
        this.currentValue = true;
      }
    },
  };
</script>

<style scoped lang="scss"></style>
