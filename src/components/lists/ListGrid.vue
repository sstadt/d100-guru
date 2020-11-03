<template lang="pug">
  .list-grid
    ul.list-grid__list.u-list-simple
      li.list-grid__item(
        v-for="list in fauxLists"
        :key="list.name"
      ) {{ list.title }}
</template>

<script>
  import { mapState } from 'vuex';
  import { clone } from '~/scripts/helpers/utils.js';

  export default {
    name: 'ListGrid',
    computed: {
      ...mapState({
        lists: (state) => state.lists.all,
      }),
      fauxLists() {
        const [list] = this.lists;
        const fauxLists = [];

        if (!list) return fauxLists;

        for (let i = 0, j = 50; i < j; i++) {
          fauxLists.push(clone(list));
        }

        return fauxLists;
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-grid {
    padding: $page-gutter 0;
  }

  .list-grid__item {
    position: relative;
    display: block;
    padding: 12px 20px;
    margin-bottom: -1px;
    background-color: $bg--main;
    border: 1px solid $border--main;

    &:first-child {
      border-top-left-radius: $border-radius--input;
      border-top-right-radius: $border-radius--input;
    }

    &:last-child {
      border-bottom-left-radius: $border-radius--input;
      border-bottom-right-radius: $border-radius--input;
    }
  }
</style>
