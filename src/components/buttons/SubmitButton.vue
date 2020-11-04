<template lang="pug">
  button.button(
    type="submit",
    :class="buttonClass",
    :disabled="isDisabled",
    @mouseenter="mouseEnter",
    @mouseleave="mouseLeave",
    @click.stop="$emit('click')"
  )
    icon(v-if="icon && !reverseIcon" :name="icon" :size="iconSize")
    span {{ label }}
    icon(v-if="icon && reverseIcon" :name="icon" :size="iconSize")
</template>

<script>
  import Icon from '~/components/basic/Icon.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';

  export default {
    name: 'SubmitButton',
    components: { Icon },
    extends: PrimaryButton,
  };
</script>

<style scoped lang="scss"></style>
