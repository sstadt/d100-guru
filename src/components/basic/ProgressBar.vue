<template lang="pug">
  .progress-bar
    .progress-bar__progress(:style="progressBarStyles")
</template>

<script>
  export default {
    name: 'ProgressBar',
    props: {
      percentage: Number,
    },
    computed: {
      progressBarStyles() {
        return {
          width: `${Math.round(this.percentage * 100)}%`,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  .progress-bar {
    overflow: hidden;
    background-color: $color-light-gray;
    height: 8px;
    width: 100%;
    border-radius: 4px;
  }

  .progress-bar__progress {
    height: 100%;
    background-color: $color-dark-gray;
  }
</style>
