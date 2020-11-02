<template lang="pug">
  button.button.button--icon(
    type="button",
    :class="buttonClass",
    :disabled="isDisabled",
    @click="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="size")
    span.u-sr-only {{ label }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';
  import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue';

  export default {
    name: 'IconButton',
    components: { Icon },
    extends: PrimaryButton,
    props: {
      size: String,
    },
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
      fill: $color-black;
    }

    &.u-icon-primary .icon {
      fill: $color--primary;
    }

    &,
    &:hover {
      background-color: transparent;
    }

    &:hover {
      .icon {
        fill: $color--primary;
      }
    }
  }
</style>
