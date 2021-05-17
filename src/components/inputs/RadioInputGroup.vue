<template lang="pug">
  .radio-group
    RadioInput(
      ref="radioInputs"
      v-for="option in options"
      :key="option.value"
      v-model="currentValue"
      :label="option.label"
      :value="option.value"
      :disabled="disabled"
    )
    span(v-if="error") {{ error }}
</template>

<script>
  import TextInput from 'scripts/components/forms/TextInput.vue';
  import RadioInput from 'scripts/components/forms/RadioInput.vue';

  export default {
    name: 'RadioInputGroup',
    components: { RadioInput },
    extends: TextInput,
    props: {
      options: {
        type: Array,
        required: true,
        default: () => [],
      },
      group: {
        type: String,
        required: true,
      },
      disabled: Boolean,
      error: String,
      value: String,
    },
    mounted() {
      this.currentValue = this.value ? this.value : this.options[0].value;
      this.$emit('input', this.currentValue);
    },
    methods: {
      onChange() {
        this.$emit('input', this.currentValue);
      },
    },
  };
</script>

<style scoped lang="scss"></style>
