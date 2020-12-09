<template lang="pug">
  .input.input--select(:class="inputClass")
    label.u-sr-only(:for="'select' + _uid") {{ label }}
    select(v-model="currentValue", :disabled="disabled", :id="'select' + _uid")
      option(v-if="!required", :value="null") {{ defaultOption }}
      option(v-for="option in options", :value="option.value", :key="option.value") {{ option.label }}
    icon(v-if="showNativeSelect", name="chevron-down", :size="14")
    p.input__error-text(v-if="error") {{ error }}
</template>

<script>
  import TextInput from 'scripts/components/forms/TextInput.vue';
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'SelectInput',
    components: {
      Icon,
    },
    extends: TextInput,
    props: {
      options: {
        type: Array,
        required: true,
        validator: (arr) => {
          return arr.length > 0;
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        currentValue: this.value,
      };
    },
    computed: {
      defaultOption() {
        const label = this.hideLabel ? '' : this.label;
        return this.required ? this.options[0].value : label;
      },
      optionSet() {
        return this.required ? this.options : [{ label: this.defaultOption, value: 'default' }, ...this.options];
      },
      selectedValue() {
        return this.options.find((option) => option.value === this.currentValue);
      },
      showNativeSelect() {
        return this.$mq === 'mobile';
      },
      inputClass() {
        return {
          error: Boolean(this.error),
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
      if (this.required && this.currentValue === '' && this.options.length > 0) {
        this.currentValue = this.options[0].value;
        this.$emit('input', this.currentValue);
      } else {
        this.currentValue = this.value || null;
        this.$emit('input', this.currentValue);
      }
    },
    methods: {
      update(newValue) {
        this.currentValue = newValue.value;
      },
    },
  };
</script>

<style scoped lang="scss"></style>
