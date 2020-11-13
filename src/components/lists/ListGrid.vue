<template lang="pug">
  .list-grid
    .list-grid__controls
      create-list-form
    ul.list-grid__list.u-list-simple
      li.list-grid__item(
        v-for="list in lists"
        :key="list.id"
      )
        nuxt-link(:to="`/list/${list.id}`") {{ list.title }}
</template>

<script>
  import { mapState } from 'vuex';
  import CreateListForm from '~/components/lists/CreateListForm.vue';

  export default {
    name: 'ListGrid',
    components: {
      CreateListForm,
    },
    computed: {
      ...mapState({
        lists: (state) => state.lists.all,
      }),
    },
  };
</script>

<style scoped lang="scss">
  .list-grid {
    padding: $page-gutter 0;
  }

  .list-grid__controls {
    display: flex;
    justify-content: flex-end;
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
