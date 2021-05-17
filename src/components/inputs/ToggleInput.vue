<template lang="pug">
  .input.input--toggle(:class="toggleClass")
    input.u-sr-only(type="checkbox" :id="inputId" v-model="currentValue" :disabled="disabled")
    label.input--toggle__hitbox(:for="inputId")
      .input--toggle__track
      .input--toggle__icon-wrapper
        Icon.input--toggle__die-icon(name="d20")
        transition(name="zoom-in")
          Icon.input--toggle__check-icon(v-if="currentValue" name="check" :size="12")
    label.input--toggle__label(:for="inputId") {{ label }}
</template>

<script>
  import Icon from '~/components/basic/Icon.vue';
  import CheckboxInput from '~/components/inputs/CheckboxInput.vue';

  export default {
    name: 'ToggleInput',
    components: {
      Icon,
    },
    extends: CheckboxInput,
    computed: {
      toggleClass() {
        return {
          'input--toggle__active': this.currentValue,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  $toggle-track-height: 8px;

  .input--toggle {
    display: flex;
    align-items: center;
  }

  .input--toggle__label {
    margin-right: $content-gutter / 2;
    color: $text--subtle;

    .input--toggle__active & {
      color: $color-primary;
    }
  }

  .input--toggle__hitbox {
    position: relative;
    display: flex;
    padding: 8px;
    width: 50px;
  }

  .input--toggle__track {
    width: 100%;
    height: $toggle-track-height;
    background-color: $bg--placeholder;
    border: 1px solid $border--input;
    border-radius: $toggle-track-height / 2;
  }

  .input--toggle__icon-wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: 0.3s ease left, 0.3s ease fill;

    .input--toggle__active & {
      left: calc(100% - 24px);
    }
  }

  .input--toggle__die-icon {
    fill: $bg--control;
    transform: translateY(2px);

    .input--toggle__active & {
      fill: $color-primary;
    }
  }

  .input--toggle__check-icon {
    fill: $bg--main;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-35%, -60%);
  }
</style>
