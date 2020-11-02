<template lang="pug">
  .carousel(ref="carousel", v-touch:swipe.left="slideNext" v-touch:swipe.right="slidePrev")
    .carousel__track.carousel__track--clone(v-if="infinite" :style="beforeTrackStyles")
      slot(name="clone-before")
    .carousel__track(:style="trackStyles")
      slot
    .carousel__track.carousel__track--clone(v-if="infinite" :style="afterTrackStyles")
      slot(name="clone-after")
    ul.carousel__dots.u-list-simple.u-list-inline(v-if="dots")
      li(v-for="n in slides.length" :key="n")
        button.u-clear-button(
          :class="{ 'is-active': n === currentSlideIndex + 1, 'carousel__dots__button': thumbnailImages.length === 0, 'carousel__dots__thumbnail': thumbnailImages.length > 0 }",
          @click="slideTo(n - 1)"
        )
          .carousel__dots__thumbnail__image(
            v-if="thumbnailImages.length > 0"
            :class="{ 'carousel__dots__thumbnail__image--video': thumbnailImages[n - 1].alt.includes('video') }"
          )
            img(:src="thumbnailImages[n - 1].src")
            icon.carousel__dots__thumbnail__icon(v-if="thumbnailImages[n - 1].alt.includes('video')" name="play" size="26px")
          .u-sr-only Show Slide {{ n }}
</template>

<script>
  import { debounce } from 'scripts/helpers/util.js';
  import { cloneSlide } from 'scripts/helpers/vue.js';
  import { getInRange, normalizeSlideIndex } from 'scripts/helpers/carousel.js';

  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'Carousel',
    components: {
      Icon,
    },
    provide() {
      const data = {};

      Object.defineProperty(data, 'slideWidth', {
        enumerable: true,
        get: () => this.slideWidth,
      });

      return {
        data,
      };
    },
    props: {
      slidesToShow: {
        type: Number,
        default: 1,
      },
      slidesToScroll: {
        type: Number,
        default: 1,
      },
      duration: {
        type: Number,
        default: 300,
      },
      centerMode: {
        type: Boolean,
        deault: false,
      },
      infinite: {
        type: Boolean,
        default: false,
      },
      dots: {
        type: Boolean,
        default: false,
      },
      thumbnailImages: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        slides: [],
        beforeSlides: [],
        afterSlides: [],
        carouselWidth: 0,
        offsetX: 0,
        enableTransition: false,
        nagivating: false,
      };
    },
    computed: {
      trackWidth() {
        return this.slideWidth * this.slides.length;
      },
      cloneTrackWidth() {
        return this.trackWidth * 2;
      },
      trackTransition() {
        return this.enableTransition ? `${this.duration}ms ease all` : 'none';
      },
      trackStyles() {
        return {
          width: `${this.trackWidth}px`,
          transform: `translateX(${this.offsetX}px)`,
          transition: this.enableTransition ? `${this.duration}ms ease all` : 'none',
        };
      },
      beforeTrackStyles() {
        return {
          width: `${this.cloneTrackWidth}px`,
          transform: `translateX(${this.offsetX - this.cloneTrackWidth}px)`,
          transition: this.enableTransition ? `${this.duration}ms ease all` : 'none',
        };
      },
      afterTrackStyles() {
        return {
          width: `${this.cloneTrackWidth}px`,
          transform: `translateX(${this.offsetX + this.trackWidth}px)`,
          transition: this.enableTransition ? `${this.duration}ms ease all` : 'none',
        };
      },
      slideWidth() {
        return this.carouselWidth / this.slidesToShow;
      },
      currentSlideIndex() {
        return this.slides.findIndex((slide) => slide.componentInstance.active);
      },
    },
    watch: {
      slidesToShow() {
        this.onResize();
      },
      centerMode() {
        this.onResize();
      },
      infinite() {
        this.onResize();
      },
    },
    mounted() {
      this.slides = this.getChildSlides();
      this.slides[0].componentInstance.active = true;
      if (this.slides[1]) this.slides[1].componentInstance.next = true;
      this.updateTrackWidth();
      window.addEventListener('resize', () => this.onResize());

      this.$nextTick(() => {
        if (this.centerMode) {
          this.offsetX = this.carouselWidth / 2 - this.slideWidth / 2;
        }

        if (this.infinite) this.initClones();
        this.enableTransition = true;
      });

      this.$emit('init', {
        numSlides: this.slides.length,
      });

      /*
       * FIXME: for some reason our slide widths will occassionally
       * get calculated to be too small until the user resizes the screen.
       * This is a temporary fix, but we will need to find a permanent fix in the future.
       */
      setTimeout(() => {
        this.onResize();
      }, 100);
    },
    beforeUpdate() {
      const isForcedUpdate = this.infinite && (!this.$slots.before || !this.$slots.after);

      if (isForcedUpdate) {
        this.initClones();
      }
    },
    methods: {
      getActiveIndex() {
        return this.slides.findIndex((slide) => slide.componentInstance.active);
      },
      getSlideClones(set) {
        const slides = [];

        for (let i = 0, j = this.slides.length; i < j; i += 1) {
          slides.push(cloneSlide(this.slides[i], Math.abs(i - this.slides.length * set)));
        }

        return slides;
      },
      initClones() {
        this.$slots['clone-before'] = this.getSlideClones(1).concat(this.getSlideClones(2));
        this.$slots['clone-after'] = this.getSlideClones(3).concat(this.getSlideClones(4));
      },
      getChildSlides() {
        return this.$slots.default.filter((el) => {
          if (!el.componentOptions || !el.componentOptions.Ctor) {
            return false;
          }
          return el.componentOptions.Ctor.options.name === 'Slide';
        });
      },
      onResize: debounce(function onResizeDebounce() {
        this.updateTrackWidth();
        this.slideTo(this.currentSlideIndex);
      }, 50),
      updateTrackWidth() {
        this.carouselWidth = this.$refs.carousel.offsetWidth;
      },
      setCurrentSlide(currentIndex) {
        this.slides.forEach((slide, index) => {
          /* eslint-disable no-param-reassign */
          slide.componentInstance.active = currentIndex === index;
          slide.componentInstance.next = currentIndex + 1 === index;
          slide.componentInstance.prev = currentIndex - 1 === index;
          this.slides[index] = slide;
          /* eslint-enable no-param-reassign */
        });

        setTimeout(() => {
          this.navigating = false;
          this.enableTransition = true;
          this.$emit('after-slide', this.getActiveIndex());
        }, 50);
      },
      getNewOffset(index) {
        const offset = -(index * this.slideWidth);

        return this.centerMode ? this.carouselWidth / 2 - this.slideWidth / 2 + offset : offset;
      },
      slideTo(index) {
        if (!this.navigating && index !== this.currentSlideIndex) {
          this.$emit('before-slide', { from: this.getActiveIndex(), to: index });
          this.navigating = true;

          if (!this.infinite) {
            /* eslint-disable no-param-reassign */
            index = this.centerMode ? getInRange(index, 0, this.slides.length - 1) : getInRange(index, 0, this.slides.length - this.slidesToShow);
            /* eslint-enable no-param-reassign */
          }

          this.offsetX = this.getNewOffset(index);

          if (this.infinite) {
            setTimeout(() => {
              /* eslint-disable no-param-reassign */
              index = normalizeSlideIndex(index, this.slides.length);
              /* eslint-enable no-param-reassign */
              this.enableTransition = false;
              this.$nextTick(() => {
                this.offsetX = this.getNewOffset(index);
                this.setCurrentSlide(index);
              });
            }, this.duration + 1);
          } else {
            this.setCurrentSlide(index);
          }
        }
      },
      slideNext() {
        this.slideTo(this.currentSlideIndex + this.slidesToScroll);
      },
      slidePrev() {
        this.slideTo(this.currentSlideIndex - this.slidesToScroll);
      },
    },
  };
</script>

<style lang="scss">
  .carousel {
    overflow: hidden;
    position: relative;

    &__track {
      display: flex;

      @include tablet-up {
        justify-content: center;
        min-width: 100%;
      }

      &--clone {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }

    &__dots {
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      list-style: none;

      &__button {
        position: relative;
        border: none;
        padding: 4.5px;
        height: 18px;
        width: 18px;
        margin: 0;
        background-color: transparent;

        &::after {
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 9px;
          width: 9px;
          border-radius: 50px;
          background-color: $color-true-light-gray;
          transition: transform 0.2s;
        }

        &.is-active::after {
          background-color: $color--primary;
        }
      }

      &__thumbnail {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0;
        margin: 4px $grid-gutter;

        &::after {
          content: '';
          display: block;
          height: 5px;
          width: 5px;
          border-radius: 50%;
          margin-top: 12px;
          opacity: 0;
          background-color: $bg--dark;
          transition: 0.3s ease opacity;
        }

        &.is-active::after {
          opacity: 1;
        }

        &__image {
          position: relative;
          width: 100px;
          height: 100px;
          padding: 4px;

          img {
            max-height: 100%;
          }

          &--video {
            &::after {
              content: '';
              display: block;
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background-color: $color-transparent-black--light;
            }
          }
        }

        &__icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          fill: $text--light;
        }
      }
    }
  }
</style>
