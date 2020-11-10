<template lang="pug">
  .input.input--text(:class="inputClass")
    label.input__label(v-if="label" :for="inputId") {{ label }}
    input.input__input(
      type="text"
      :class="inputClass"
      :id="inputId"
      v-model="currentValue"
      :disabled="disabled"
    )
    span.error(v-show="errors.length > 0") {{ errors[0] }}
</template>

<script>
  export default {
    name: 'TextInput',
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      label: {
        type: String,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      errors: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        initialized: false,
        currentValue: this.value,
      };
    },
    computed: {
      inputClass() {
        return {
          'input--error': this.errors.length > 0,
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
    methods: {
      set(val) {
        this.currentValue = val;
      },
    },
  };
</script>

<style lang="scss">
  .input {
    [type='text'],
    [type='password'],
    [type='date'],
    [type='datetime'],
    [type='datetime-local'],
    [type='month'],
    [type='week'],
    [type='email'],
    [type='number'],
    [type='search'],
    [type='tel'],
    [type='time'],
    [type='url'],
    [type='color'],
    textarea,
    select {
      font-size: rem(16);
      line-height: 1.25;
      color: $text--main;
      padding: 12px 18px;
      margin: 0;
      background-color: $bg--main;
      border: 1px solid $border--input;
      border-radius: 0; // iOS reset
      -webkit-appearance: none; // iOS reset (legacy)
      width: 100%;
      transition: border-color 0.5s ease;

      &:hover,
      &:active {
        border-color: $border--input-active;
      }

      &.input--error {
        border-color: $color--error;
        background-color: $color--error-light;
      }
    }
  }

  .input__label {
    display: block;
    margin-bottom: 2px;
  }

  .input--select {
    position: relative;

    > select {
      // Resetting default styles across browsers...
      display: inline-block;
      background-color: $bg--main;
      -webkit-appearance: none;
      -moz-appearance: none;
      border-radius: 0;

      // Custom styling
      color: $text--main;
      font-family: $font-body--main;
      padding: 16px 40px 16px 16px;
      width: 100%;
      border: 0;
      border-bottom: 1px solid $border--input;
      transition: border-color 0.5s ease;

      &::-ms-expand {
        display: none;
      }

      &:hover,
      &:active {
        border-color: $text--main;
      }
    }

    > .icon {
      position: absolute;
      pointer-events: none;
      bottom: 19px;
      right: 17px;
      fill: #909090;
    }
  }

  .input--radio {
    &:hover .input--radio__button {
      border-color: $color-black;
    }

    input {
      display: none;

      &:checked + .input--radio__button {
        border-color: $border--input;

        &::after {
          opacity: 1;
        }
      }
    }
  }

  .input--radio__label {
    cursor: pointer;
    position: relative;
    font-size: rem(16);
    line-height: 20px; // match image height
  }

  // TODO: no more than 1 child deep !!!
  .input--radio__label__content {
    padding-left: 35px;
  }

  .input--radio__button {
    top: 1px;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid $border--input;

    &,
    &::after {
      position: absolute;
      display: block;
      transition: 0.3s ease all;
      border-radius: 50%;
    }

    &::after {
      content: '';
      height: 10px;
      width: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $bg--dark;
      opacity: 0;
    }
  }
</style>
