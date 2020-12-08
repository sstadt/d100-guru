<template lang="pug">
  span.roll-result-icon(:style="wrapperStyle")
    icon.roll-result-icon__icon(name="d20" :size="size")
    span.roll-result-icon__roll(:style="textStyle") {{ roll }}
</template>

<script>
  import Icon from '~/components/basic/Icon.vue';

  export default {
    name: 'RollResultIcon',
    components: {
      Icon,
    },
    props: {
      roll: {
        type: [String, Number],
        default: '∞',
      },
      size: {
        type: Number,
        default: 30,
      },
    },
    computed: {
      wrapperStyle() {
        return {
          height: `${this.size}px`,
          width: `${this.size}px`,
        };
      },
      textStyle() {
        const textScale = String(this.roll).length > 2 ? 0.3 : 0.4;

        return {
          'font-size': `${this.size * textScale}px`,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  .roll-result-icon {
    position: relative;
    display: inline-block;
    line-height: 0;
  }

  .roll-result-icon__roll {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-58%, -55%);
    color: $text--light;
    font-weight: bold;
  }
</style>
