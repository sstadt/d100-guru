<template lang="pug">
  button.button(
    type="button",
    :class="buttonClass",
    :disabled="isDisabled",
    @click.stop="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import Icon from '~/components/basic/Icon.vue';

  export default {
    name: 'PrimaryButton',
    components: { Icon },
    props: {
      label: {
        type: String,
        default: 'my button',
      },
      icon: {
        type: String,
        default: null,
      },
      iconSize: {
        type: String,
        default() {
          return this.small ? '12px' : '16px';
        },
      },
      small: {
        type: Boolean,
        default: false,
      },
      full: {
        type: Boolean,
        default: false,
      },
      secondary: {
        type: Boolean,
        default: false,
      },
      outline: {
        type: Boolean,
        default: false,
      },
      text: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        active: false,
        rippleX: 0,
        rippleY: 0,
        hasRipple: !this.text && !this.textSimple,
      };
    },
    computed: {
      buttonClass() {
        return {
          'button--primary': this.secondary === false,
          'button--secondary': this.secondary === true,
          'button--outline': this.outline === true,
          'button--small': this.small === true,
          'button--full': this.full === true,
          'button--text': this.text === true,
          'button--inline': this.inline === true,
        };
      },
      isDisabled() {
        return this.disabled || this.loading;
      },
      rippleStyles() {
        return {
          top: `${this.rippleY}px`,
          left: `${this.rippleX}px`,
        };
      },
      contentClass() {
        return {
          'u-transparent': this.showRipple,
        };
      },
      showRipple() {
        return this.hasRipple && this.active;
      },
    },
  };
</script>

<style lang="scss">
  .button {
    cursor: pointer;
    position: relative;
    display: inline-block;
    text-align: center;
    padding: 18px 32px;
    background-color: $color--primary;
    border-width: 0;
    border-style: solid;
    border-color: $color--primary;
    transition: 0.3s ease all;
    font-family: $font-body--accent;
    font-size: rem(12);
    font-weight: $font-weight--bold;
    line-height: 1.5;
    letter-spacing: rem(0.6);
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;

    &,
    &:hover,
    &:focus {
      color: $text--main;

      .icon {
        fill: $text--main;
      }
    }

    &:not(.button--icon) {
      .button__content .icon {
        margin-right: $content-gutter * 0.4;
      }
    }

    &[disabled] {
      cursor: unset;

      &,
      &:hover {
        color: $text--light;
        border-color: $color--disabled;
        background-color: $color--disabled;
      }
    }

    span,
    .icon {
      vertical-align: middle;
      fill: $text--main;
    }
  }

  .button--secondary {
    background-color: $color--secondary;
    border-color: $color--secondary;
  }

  .button--outline {
    background-color: transparent;

    // using pseudo-element for border so that ripple effect can overlay it
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid $color--primary;
    }
  }

  .button--small {
    font-size: rem(12);
    padding: 10px 16px;
  }

  .button--full {
    width: 100%;
    position: relative;

    .button__content .icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      fill: $text--main;
    }
  }

  .button--text {
    position: relative;
    padding: 0;
    font-family: $font-body--accent;
    font-size: rem(12);
    font-weight: $font-weight--medium;
    text-transform: uppercase;
    letter-spacing: rem(0.36);
    line-height: 1;

    .icon {
      vertical-align: middle;

      &:not(:last-child) {
        margin-right: 4px;
      }

      &:not(:first-child) {
        margin-left: 4px;
      }
    }

    &,
    &:hover {
      background-color: transparent;
    }

    &:hover,
    &:focus {
      color: $color--primary;

      .icon {
        fill: $color--primary;
      }
    }

    &:not(.button--text--simple) {
      padding: 0 0 1px 0;
      overflow: visible;
      border-bottom: 1px solid $color-gray;

      &,
      &:hover {
        color: unset;
        border-color: $color-gray;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: $text--main;
        transform: scale(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }

      &:hover::after {
        z-index: 1;
        transform: scale(1);
      }
    }
  }

  .button--inline {
    padding-top: 12px;
    padding-bottom: 12px;
  }
</style>
