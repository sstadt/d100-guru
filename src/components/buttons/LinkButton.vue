<template lang="pug">
  a.button(
    :href="href",
    :class="buttonClass",
    :disabled="isDisabled",
    @mouseenter="mouseEnter",
    @mouseleave="mouseLeave",
    @click.stop="$emit('click')"
  )
    transition(name="ripple")
      .ripple(v-if="showRipple" :style="rippleStyles")
    transition(name="slide-fade-in-out")
      icon.button__arrow(v-if="showRipple" name="arrow-right-long" size="35px")
    .button__content(:class="contentClass")
      icon(v-if="icon", :name="icon", :size="iconSize")
      span {{ label }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';
  import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue';

  export default {
    name: 'LinkButton',
    components: { Icon },
    extends: PrimaryButton,
    props: {
      href: {
        type: String,
        default: '#',
      },
    },
  };
</script>

<style scoped lang="scss"></style>
