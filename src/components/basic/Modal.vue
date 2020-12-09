<template lang="pug">
  transition(name="fade")
    .modal(v-if="isVisible")
      .modal__overlay(@click="close")
      icon-button.modal__close-video(v-if="video" label="Close Modal" icon="close", size="12px" @click="close")
      .modal__content--video(v-if="video")
        .modal__content--video__container
          iframe(width="853" height="480" :src="videoUrl" frameborder="0" allowfullscreen)
      .modal__content-wrapper(v-else)
        icon-button.modal__close(label="Close Modal" icon="close" size="12px" @click="close")
        .modal__header(v-if="title")
          icon.modal__title-icon(v-if="icon" :name="icon" :size="19")
          p.modal__title {{ title }}
        .modal__content
          slot(name="content")
</template>

<script>
  import Icon from '~/components/basic/Icon.vue';
  import IconButton from '~/components/buttons/IconButton.vue';

  export default {
    name: 'Modal',
    components: {
      Icon,
      IconButton,
    },
    props: {
      title: {
        type: String,
        default: null,
      },
      icon: {
        type: String,
        default: null,
      },
      video: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        isVisible: false,
      };
    },
    computed: {
      videoUrl() {
        return this.video && this.isVisible
          ? `https://www.youtube.com/embed/${this.video}?autoplay=1`
          : '';
      },
    },
    methods: {
      open() {
        this.isVisible = true;
        this.$emit('open');
      },
      close() {
        this.isVisible = false;
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    overflow-y: auto;
    background-color: $bg--overlay;

    .video-modal & {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .modal__close-video {
    position: absolute;
    top: $grid-gutter;
    right: $grid-gutter;
  }

  .modal__content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 850px;
    max-width: 100%;
    min-height: 100%;
    background-color: $bg--main;

    @include mobile-only {
      display: flex;
      flex-direction: column;
    }

    @include tablet-up {
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 50px;
      max-width: calc(100% - 36px);
    }
  }

  .modal__header {
    display: flex;
    padding: 14px 17px;
    background-color: $bg--placeholder;
  }

  .modal__title {
    margin: 2px 0 0;
    font-size: rem(14);
    line-height: 1.42;
    letter-spacing: 0.3px;
    font-weight: $font-weight--bold;
  }

  .modal__title-icon {
    margin-right: 9px;
  }

  .modal__content {
    padding: 40px 35px 50px;

    @include mobile-only {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    @include tablet-up {
      padding: 65px;
    }
  }

  .modal__content--video {
    z-index: 1;
  }

  .modal--video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: $container-max-width;
    max-width: 100%;
  }

  .modal--video__container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;

    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .modal__close {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    right: 10px;
    height: 32px;
    width: 32px;
  }
</style>
