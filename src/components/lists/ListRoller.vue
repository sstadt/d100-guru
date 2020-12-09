<template lang="pug">
  .list-roller
    .list-roller__content(ref="mainContent")
      h1.list-roller__title {{ list.title }}
      transition(name="slide-fade-left")
        .list-roller__last-result(v-if="history.length > 0")
          roll-result-icon(:roll="lastResult.roll" :size="50")
          p.list-roller__subtitle.h2 {{ lastResult.value }}
      primary-button(label="Roll" :small="$mq === 'mobile'" @click="roll")
    transition(name="slide-fade-left" appear)
      .list-roller-history(v-if="showHistory" :style="historyStyle")
        p.list-roller-history__title History
        transition-group.list-roller-history__list.u-list-simple(tag="ul" name="slide-fade-left" appear)
          li.list-roller-history__item(v-for="result in historyResults" :key="result.id")
            roll-result-icon.list-roller-history__icon(:roll="result.roll")
            span.list-roller-history__label {{ result.value }}
</template>

<script>
  import smoothReflow from 'vue-smooth-reflow';
  import newResult from '~/scripts/schema/newResult.js';
  import { clone, debounce } from '~/scripts/helpers/utils.js';
  import { getRandomNumber } from '~/scripts/helpers/dice.js';
  import RollResultIcon from '~/components/rolls/RollResultIcon.vue';

  export default {
    name: 'ListRoller',
    components: {
      RollResultIcon,
    },
    mixins: [smoothReflow],
    props: {
      list: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        history: [],
        contentHeight: 300,
      };
    },
    computed: {
      lastResult() {
        return this.history.length > 0 ? this.history[0] : {};
      },
      historyResults() {
        return this.history.slice(1);
      },
      showHistory() {
        return this.historyResults.length > 0 && this.$mq !== 'mobile';
      },
      historyStyle() {
        return {
          'max-height': `${this.contentHeight}px`,
        };
      },
    },
    watch: {
      'lastResult.id'() {
        if (this.lastResult.id) {
          this.$nextTick(() => this.updateContentHeight());
        }
      },
      'list.id'(newVal, oldVal) {
        if (newVal !== oldVal) this.history = [];
      },
    },
    mounted() {
      this.$smoothReflow();
    },
    methods: {
      roll() {
        if (!this.list.items || this.list.items.length < 1) return;

        const randomIndex = getRandomNumber(1, this.list.items.length);
        const randomItem = clone(this.list.items[randomIndex - 1]);
        const result = newResult({
          value: randomItem.value,
          roll: randomIndex,
        });

        this.history.unshift(result);
      },
      updateContentHeight: debounce(function () {
        this.contentHeight = this.$refs.mainContent.offsetHeight;
      }, 100),
    },
  };
</script>

<style scoped lang="scss">
  .list-roller {
    display: flex;
  }

  .list-roller__content {
    flex-grow: 1;
  }

  .list-roller__last-result {
    display: flex;
  }

  .list-roller__subtitle {
    margin-top: 4px;
  }

  .list-roller-history {
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    flex-shrink: 0;
    padding-left: $grid-gutter;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .list-roller-history__list {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .list-roller-history__item {
    position: relative;
    min-height: 30px;
    margin-bottom: 4px;
  }

  .list-roller-history__icon {
    position: absolute;
    top: 0;
    left: 0;
  }

  .list-roller-history__label {
    display: inline-block;
    padding-left: 34px;
    padding-top: 5px;
  }
</style>
