<template lang="pug">
  svg(:class="iconClass", :style="iconStyle")
    use(xmlns:xlink="http://www.w3.org/1999/xlink", :xlink:href="iconName")
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: String,
      size: {
        type: String,
        default: '24px',
      },
      sizeWidth: String,
      sizeHeight: String,
    },
    data() {
      return {
        isNotSquare: this.sizeWidth && this.sizeHeight,
      };
    },
    computed: {
      iconClass() {
        const iconClass = { icon: true };

        iconClass[`icon--${this.name}`] = true;

        return iconClass;
      },
      iconStyle() {
        return {
          height: this.isNotSquare ? this.sizeHeight : this.size,
          width: this.isNotSquare ? this.sizeWidth : this.size,
        };
      },
      iconName() {
        return `#${this.name}`;
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
    vertical-align: middle;

    &--underline {
      transform: translateY(22%);
    }

    h1 &,
    h2 &,
    h3 &,
    h4 &,
    h5 &,
    h6 &,
    p & {
      letter-spacing: 1px;
      vertical-align: bottom;
    }
  }
</style>
