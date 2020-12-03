<template lang="pug">
  .list-roller {{ list.title }}
</template>

<script>
  export default {
    name: 'ListRoller',
    props: {
      list: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>

<style scoped lang="scss"></style>
