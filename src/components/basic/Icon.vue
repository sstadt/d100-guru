<template lang="pug">
  svg-icon(:class="iconClass", :style="iconStyle", :name="name")
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        default: '',
      },
      size: {
        type: Number,
        default: 24,
      },
    },
    computed: {
      iconClass() {
        return [`icon--${this.name}`];
      },
      iconStyle() {
        return {
          height: `${this.size}px`,
          width: `${this.size}px`,
        };
      },
    },
  };
</script>

<style lang="scss">
  .icon {
    fill: $text--main;
  }
</style>

<style scoped lang="scss">
  .icon {
    transition: 0.3s ease all;

    h1 &,
    h2 &,
    h3 &,
    h4 &,
    h5 &,
    h6 &,
    p &,
    a & {
      vertical-align: middle;

      &:not(:first-child) {
        margin-left: 4px;
      }

      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }

  .icon--underline {
    transform: translateY(22%);
  }
</style>
