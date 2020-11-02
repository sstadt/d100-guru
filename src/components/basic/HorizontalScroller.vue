<template lang="pug">
  .horizontal-scroller(ref="container" @wheel="onWheel")
    .horizontal-scroller__content(
      ref="scroller"
      :style="scrollerStyle"
      @touchstart="onTouchStart"
      @touchmove="onMove"
    )
      slot
</template>

<script>
  export default {
    name: 'HorizontalScroller',
    data() {
      return {
        left: 0,
        isTouching: false,
        lastTouchPosition: 0,
      };
    },
    computed: {
      scrollerStyle() {
        return {
          transform: `translateX(${-this.left}px)`,
        };
      },
    },
    methods: {
      onWheel(event) {
        if (event.deltaX !== 0) {
          this.incrementPosition(event.deltaX);
        }
      },
      onTouchStart(event) {
        this.lastTouchPosition = event.touches[0].clientX;
      },
      onMove(event) {
        const currentTouchPosition = event.touches[0].clientX;
        const distance = (this.lastTouchPosition - currentTouchPosition) * 1.5;

        if (distance !== 0) {
          this.incrementPosition(distance);
          this.lastTouchPosition = currentTouchPosition;
        }
      },
      incrementPosition(pixels) {
        const distance = this.left + pixels;
        const limit = this.$refs.scroller.scrollWidth - this.$refs.scroller.offsetWidth;

        // content is smaller than wrapper, cannot scroll
        if (limit <= 0) {
          return;
        }

        if (distance !== 0) {
          this.left = Math.min(Math.max(distance, 0), limit);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .horizontal-scroller {
    overflow: hidden;
    max-width: 100%;
  }
</style>
