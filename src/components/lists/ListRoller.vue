<template lang="pug">
  .list-roller {{ list.title }}: {{ lastResult.value }}
</template>

<script>
  import { clone } from '~/scripts/helpers/utils.js';
  import { getRandomNumber } from '~/scripts/helpers/dice.js';

  export default {
    name: 'ListRoller',
    props: {
      list: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        history: [],
      };
    },
    computed: {
      lastResult() {
        return this.history.length > 0 ? this.history[0] : {};
      },
    },
    methods: {
      roll() {
        if (!this.list.items || this.list.items.length < 1) return;

        const randomIndex = getRandomNumber(0, this.list.items.length);
        const result = clone(this.list.items[randomIndex]);

        this.history.unshift(result);
      },
    },
  };
</script>

<style scoped lang="scss"></style>
