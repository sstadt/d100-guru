<template lang="pug">
  .checkbox-group
    .input.input--checkbox(
      v-for="option in options"
      :class="{ 'input--disabled': availableOptions.length > 0 && !availableOptions.includes(option) }"
    )
      input(
        type="checkbox"
        v-model="currentValue"
        :id="option + _uid"
        :value="option"
      )
      .input--checkbox__indicator
      label(:for="option + _uid") {{ option }}
    span.u-text-error(v-if="error") {{ error }}
</template>

<script>
  import TextInput from 'scripts/components/forms/TextInput.vue';
  import CheckboxInput from 'scripts/components/forms/CheckboxInput.vue';

  export default {
    name: 'CheckboxInputGroup',
    components: { CheckboxInput },
    extends: TextInput,
    props: {
      value: Array,
      options: {
        type: Array,
        required: true,
        default: () => [],
      },
      availableOptions: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style scoped lang="scss">
  .input--checkbox {
    transition: 0.3s ease-in-out opacity;
  }

  .input--disabled {
    opacity: 0.3;
    pointer-events: none;
  }
</style>
