<template lang="pug">
  .input.input--radio(:class="inputClass")
    label.input--radio__label(tabindex="0", @keydown.space.prevent="select")
      .input--radio__label__content
        span(v-if="label") {{ label }}
        slot(v-else)
        input.input--radio__check(type="radio", ref="radio", :value="value", :checked="state", :disabled="disabled", @change="onChange")
        span.input--radio__button
</template>

<script>
  export default {
    name: 'RadioInput',
    model: {
      prop: 'modelValue',
      event: 'input',
    },
    props: {
      value: String,
      label: String,
      disabled: Boolean,
      modelValue: {
        type: String,
        default: undefined,
      },
    },
    computed: {
      state() {
        return this.modelValue === this.value;
      },
      inputClass() {
        return {
          disabled: this.disabled,
        };
      },
    },
    methods: {
      onChange() {
        this.$emit('input', this.state ? '' : this.value);
      },
      select() {
        this.$emit('input', this.value);
      },
    },
  };
</script>

<style scoped lang="scss"></style>
