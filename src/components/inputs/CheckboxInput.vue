<template lang="pug">
  .input.input--checkbox(:class="inputClass")
    input(type="checkbox", :id="'checkbox' + _uid", v-model="currentValue", :disabled="disabled", :name="name" :value="value")
    .input--checkbox__indicator
    label(:for="'checkbox' + _uid") {{ label }}
</template>

<script>
  export default {
    name: 'CheckboxInput',
    props: {
      value: Boolean,
      label: String,
      disabled: Boolean,
      checked: Boolean,
      name: String,
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
