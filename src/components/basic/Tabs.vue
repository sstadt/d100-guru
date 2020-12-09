<template lang="pug">
  .tabs
    .tabs-nav(ref="nav")
      button.tabs-nav__button(
        type="button"
        ref="navButtons"
        v-for="(tab, index) in tabs"
        @click="activate(tab, index)"
      ) {{ tab.heading }}
      .tabs-nav__indicator(:style="indicatorStyle")
    .tabs__content
      slot
</template>

<script>
  export default {
    name: 'Tabs',
    data() {
      return {
        tabs: [],
        indicatorWidth: 0,
        indicatorPosition: 0,
      };
    },
    computed: {
      activeIndex() {
        return this.tabs.findIndex((tab) => tab.active);
      },
      indicatorStyle() {
        return {
          left: `${this.indicatorPosition}px`,
          width: `${this.indicatorWidth}px`,
        };
      },
    },
    mounted() {
      const interval = setInterval(() => {
        if (this.tabs.length > 0) {
          const activeTab = this.tabs.find((tab) => tab.active) || this.tabs[0];
          this.activate(activeTab);
          clearInterval(interval);
        }
      }, 200);
    },
    methods: {
      addTab(newTab) {
        this.tabs.push(newTab);
      },
      removeTab(tabToRemove) {
        const index = this.tabs.findIndex(
          (tab) => tab.heading === tabToRemove.heading
        );

        this.tabs.splice(index, 1);
      },
      activate({ heading }) {
        // set active tab
        this.tabs.forEach((tab) => {
          tab.$set(tab, 'active', Boolean(heading === tab.heading));
        });

        // set indicator position
        this.$nextTick(() => {
          const $currentButton = this.$refs.navButtons[this.activeIndex];

          this.indicatorWidth = $currentButton.offsetWidth;
          this.indicatorPosition = $currentButton.offsetLeft;
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .tabs-nav {
    position: relative;
  }

  .tabs-nav__button {
    cursor: pointer;
    position: relative;
    flex-grow: 1;
    margin: 0 12px 0 0;
    padding: 8px 0;
    border-width: 0 0 3px 0;
    border-style: solid;
    border-color: $border--mid;
    font-weight: bold;
    font-size: rem(12);
    line-height: 1.33;
    letter-spacing: 0.6px;
    font-family: $font-body--accent;
    text-align: center;
    text-transform: uppercase;
    color: $text--main;
    background-color: $bg--light;
    transition: 0.3s ease all;

    &:focus {
      outline: none;
    }
  }

  .tabs-nav__indicator {
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: $border--tabs;
    transition: 0.3s ease-in-out left, 0.3s ease-in-out width;
  }
</style>
