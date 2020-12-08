<template lang="pug">
  .input.input--quantity
    label.u-sr-only(v-if="label") {{ label }}
    icon-button.input--quantity__decrement.u-icon-primary(
      label="Decrease Quantity"
      icon="minus"
      :size="10"
      :disabled="disableDecrement"
      @click="decrement"
    )
    input.input--quantity__input(
      type="text"
      v-model="currentValue"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      readonly
    )
    icon-button.input--quantity__increment.u-icon-primary(
      label="Increase Quantity"
      icon="plus"
      :size="10"
      :disabled="disableIncrement"
      @click="increment"
    )
</template>

<script>
  import TextInput from 'scripts/components/forms/TextInput.vue';
  import IconButton from 'scripts/components/buttons/IconButton.vue';

  export default {
    name: 'QuantityInput',
    components: { TextInput, IconButton },
    extends: TextInput,
    props: {
      min: {
        type: Number,
        default: 0,
      },
      max: Number,
      value: Number,
      disableIncrement: {
        type: Boolean,
        default: false,
      },
      disableDecrement: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      increment() {
        if (typeof this.max === 'undefined' || this.currentValue < this.max) this.currentValue += 1;
      },
      decrement() {
        if (this.currentValue > this.min) this.currentValue -= 1;
      },
    },
  };
</script>

<style scoped lang="scss">
  .input--quantity {
    display: flex;
    max-width: 70px;
    flex-shrink: 0;
    margin: 0;

    [type='text'] {
      border: 0;
      padding: 2px 0 0;
      color: $text--main;
      text-align: center;
      font-size: rem(14);
      line-height: 16px;
      background-color: transparent;
    }
  }

  .input--quantity__increment,
  .input--quantity__decrement {
    padding: 4px;
    width: 18px;

    &[disabled] {
      opacity: 0.4;

      &,
      &:hover {
        background-color: transparent;
      }
    }

    &::v-deep .icon {
      fill: $text--main;
    }
  }
</style>
