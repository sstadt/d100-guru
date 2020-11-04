<template lang="pug">
  button.button.button--icon(
    type="button",
    :class="buttonClass",
    :disabled="isDisabled",
    @click="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span.u-sr-only {{ label }}
</template>

<script>
  import Icon from '~/components/basic/Icon.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';

  export default {
    name: 'IconButton',
    components: { Icon },
    extends: PrimaryButton,
  };
</script>

<style lang="scss">
  .button--icon {
    padding: 0;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      fill: $text--main;
    }

    &.u-icon-primary .icon {
      fill: $color-primary;
    }

    &,
    &:hover {
      background-color: transparent;
    }

    &:hover {
      .icon {
        fill: $color-primary;
      }
    }
  }
</style>
