<template lang="pug">
  .tabs
    .tabs__nav(ref="nav")
      button.tabs__nav-button(
        type="button",
        v-for="tab in tabs",
        ref="navButtons"
        @click="activate(tab)"
      ) {{ tab.heading }}
      .tabs__nav-indicator(:style="indicatorPosition")
    .tabs__content
      slot
</template>

<script>
  export default {
    name: 'Tabs',
    data() {
      return {
        tabs: [],
      };
    },
    computed: {
      activeIndex() {
        return this.tabs.findIndex((tab) => tab.active);
      },
      indicatorPosition() {
        const buttonWidth = 100 / this.tabs.length;
        const position = Math.max(this.activeIndex, 0) * buttonWidth;

        return {
          left: `${position}%`,
          width: `${buttonWidth}%`,
        };
      },
    },
    methods: {
      addTab(newTab) {
        this.tabs.push(newTab);
      },
      removeTab(tabToRemove) {
        const index = this.tabs.findIndex((tab) => tab.heading === tabToRemove.heading);
        this.tabs.splice(index, 1);
      },
      activate({ heading }) {
        this.tabs.forEach((tab) => {
          tab.$set(tab, 'active', Boolean(heading === tab.heading));
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .tabs__nav {
    display: flex;
    position: relative;
  }

  .tabs__nav-button {
    cursor: pointer;
    position: relative;
    flex-grow: 1;
    margin: 0;
    padding: 18px 0 16px;
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

  .tabs__nav-indicator {
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: $color-mid-green;
    transition: 0.3s ease-in-out left;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -6px;
      left: 50%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 5px 0 5px;
      border-color: $color-mid-green transparent transparent transparent;
    }
  }
</style>
