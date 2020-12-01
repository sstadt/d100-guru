<template lang="pug">
  .loading-icon(:style="iconStyle")
    .loading-icon__spinner(:style="spinnerStyle")
</template>

<script>
  export default {
    name: 'LoadingIcon',
    props: {
      size: {
        type: Number,
        default: 80,
      },
      color: {
        type: String,
        default: '#3c763d',
      },
    },
    computed: {
      iconStyle() {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`,
        };
      },
      spinnerStyle() {
        const size = Math.ceil(this.size * 0.8);
        const margin = Math.ceil(this.size * 0.1);
        const borderWidth = Math.ceil(this.size * 0.075);

        return {
          width: `${size}px`,
          height: `${size}px`,
          margin: `${margin}px`,
          border: `${borderWidth}px solid ${this.color}`,
          'border-color': `${this.color} transparent ${this.color} transparent`,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  .loading-icon {
    display: inline-block;
  }

  .loading-icon__spinner {
    display: block;
    border-radius: 50%;
    animation: loading-icon 1.2s linear infinite;
  }

  @keyframes loading-icon {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
