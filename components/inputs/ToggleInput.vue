<template lang="pug">
  .input.input--toggle(:class="toggleClass")
    input.u-sr-only(type="checkbox" :id="toggleId" v-model="currentValue" :disabled="disabled")
    .input--toggle__indicator
    label.u-sr-only(:for="toggleId") {{ label }}
    label.input--toggle__label(:for="toggleId")
</template>

<script>
  import CheckboxInput from 'scripts/components/forms/CheckboxInput.vue';

  export default {
    name: 'ToggleInput',
    extends: CheckboxInput,
    computed: {
      toggleId() {
        /* eslint-disable no-underscore-dangle */
        return `toggle_${this._uid}`;
        /* eslint-enable no-underscore-dangle */
      },
      toggleClass() {
        return {
          'input--toggle__active': this.currentValue,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  $input-toggle-height: 28px;
  $input-toggle-width: 50px;
  $input-toggle-indicator-size: 20px;

  .input--toggle {
    position: relative;
    display: inline-block;
    height: $input-toggle-height;
    width: 50px;
    margin: 0;
  }

  .input--toggle__indicator {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    height: $input-toggle-indicator-size;
    width: $input-toggle-indicator-size;
    border-radius: 50%;
    background-color: $bg--main;
    transition: 0.3s ease-in-out left;

    .input--toggle__active & {
      left: calc(100% - #{$input-toggle-indicator-size + 5});
    }
  }

  .input--toggle__label {
    height: 100%;
    width: 100%;
    border: 1px solid $color-true-light-gray;
    border-radius: $input-toggle-height / 2;
    background-color: $color-mid-green;

    &:not([disabled]) {
      cursor: pointer;
    }
  }
</style>
