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
        type: String,
        default: '24px',
      },
    },
    computed: {
      iconClass() {
        return [`icon--${this.name}`];
      },
      iconStyle() {
        return {
          height: this.size,
          width: this.size,
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
    vertical-align: middle;

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

  .icon--underline {
    transform: translateY(22%);
  }
</style>
