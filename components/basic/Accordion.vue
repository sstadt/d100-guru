<template lang="pug">
  .accordion(:class="accordionClass")
    a.accordion__header(href="#", :class="headerClass", @click.prevent="activate")
      h2.h4 {{ heading }}
      transition(name="fade")
        span.accordion__cta(v-if="ctaLabel" @click.stop.prevent="$emit('cta-click')") {{ ctaLabel }}
      icon.accordion__icon(:name="currentIcon", size="13px")
    transition(:name="transition")
      .accordion__content(v-if="active", ref="content", :style="contentStyle")
        slot
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'Accordion',
    components: { Icon },
    props: {
      selected: Boolean,
      ctaLabel: String,
      heading: {
        type: String,
        required: true,
      },
      activeIcon: {
        type: String,
        default: 'minus',
      },
      inactiveIcon: {
        type: String,
        default: 'plus',
      },
      theme: {
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'footer'].includes(value);
        },
      },
    },
    data() {
      return {
        active: true,
        contentStyle: {},
        scrollHeight: 0,
        transition: 'none',
      };
    },
    computed: {
      accordionClass() {
        const classes = [];

        if (this.theme !== 'default') {
          classes.push(`accordion--${this.theme}`);
        }

        return classes;
      },
      headerClass() {
        return {
          'is-open': this.active,
        };
      },
      currentIcon() {
        return this.active ? this.activeIcon : this.inactiveIcon;
      },
    },
    mounted() {
      this.setContentHeight();

      // NOTE: this has to be set to false after mount or scrollHeight will be 0
      this.active = this.selected;
      this.transition = 'slide-vertical';

      if (this.$parent.addAccordion) {
        this.$parent.addAccordion(this);
      }
    },
    beforeDestroy() {
      this.active = false;
      if (this.$parent.removeAccordion) {
        this.$parent.removeAccordion(this);
      }
    },
    methods: {
      setContentHeight() {
        const height = this.$refs.content.scrollHeight;
        const containerPadding = 50;

        // Set max height for animation
        this.contentStyle = {
          'max-height': `${height + containerPadding}px`,
        };
      },
      activate() {
        if (this.$parent.activate && !this.active) {
          this.$parent.activate(this);
          this.$emit('active');
        } else {
          this.active = !this.active;
        }

        this.$nextTick(() => this.active && this.setContentHeight());
      },
    },
  };
</script>

<style scoped lang="scss">
  .accordion {
    border-bottom: 1px solid $border--light;
    background-color: transparent;
  }

  .accordion__header {
    width: 100%;
    padding: 24px 10px;
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      background-color: $bg--light;
    }

    .filter-accordion & {
      &:hover,
      &:focus {
        color: $color-black;
      }
    }
  }

  .accordion__content {
    overflow: hidden;
    padding: 0 10px 22px;
  }

  .accordion__content--wrapper {
    overflow: hidden;
  }

  .accordion__cta {
    display: inline-block;
    padding: 1px 9px 0;
    font-size: rem(12);
    line-height: 15px;
    letter-spacing: -0.09px;
    color: $text--dark;
    text-transform: none;
  }

  .accordion__icon {
    margin-left: auto;

    .accordion--footer & {
      fill: $text--dark;
    }

    .accordion__header:hover &,
    .accordion__header:focus & {
      fill: $text--dark;
    }
  }
</style>
