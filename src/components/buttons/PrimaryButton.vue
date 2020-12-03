<template lang="pug">
  button.button(
    type="button"
    :class="buttonClass"
    :disabled="isDisabled"
    @click="$emit('click')"
    v-tooltip="tooltipText"
  )
    icon(v-if="icon && !reverseIcon" :name="icon" :size="iconSize")
    span {{ label }}
    icon(v-if="icon && reverseIcon" :name="icon" :size="iconSize")
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
          return this.small ? '10px' : '14px';
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
      reverseIcon: {
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
      tooltip: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      buttonClass() {
        return {
          'button--primary': this.secondary === false,
          'button--secondary': this.secondary === true,
          'button--outline': this.outline === true,
          'button--small': this.small === true || this.inline === true,
          'button--full': this.full === true,
          'button--text': this.text === true,
          'button--inline': this.inline === true,
        };
      },
      isDisabled() {
        return this.disabled || this.loading;
      },
      tooltipText() {
        return this.tooltip ? this.label : '';
      },
    },
  };
</script>

<style lang="scss">
  .button {
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 10px 28px;
    border-width: 0;
    border-style: solid;
    border-color: $color-primary;
    border-radius: $border-radius--input;
    font-size: rem(18);
    font-weight: $font-weight--bold;
    line-height: 1.5;
    letter-spacing: rem(0.6);
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    background-color: $color-primary;
    transition: 0.3s ease all;

    &,
    &:hover,
    &:focus {
      color: $text--light;

      .icon {
        fill: $text--light;
      }
    }

    &:hover,
    &:focus {
      background-color: $color-primary--hover;
      border-color: $color-primary--hover;
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

    .icon {
      &:not(:last-child) {
        margin-right: 4px;
      }

      &:not(:first-child) {
        margin-left: 4px;
      }
    }

    span,
    .icon {
      vertical-align: middle;
    }
  }

  .button--secondary {
    background-color: $color-secondary;
    border-color: $color-secondary;
  }

  .button--outline {
    background-color: transparent;
  }

  .button--small {
    padding: 0 16px;
    font-size: rem(12);
    line-height: 44px;
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
    color: $text--main;
    border-radius: none;

    &,
    &:hover,
    &:focus {
      background-color: transparent;
    }

    &:hover,
    &:focus {
      color: $color-primary;

      .icon {
        fill: $color-primary;
      }
    }

    .icon {
      fill: $text--main;
    }
  }

  .button--inline {
    margin-top: 20px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
