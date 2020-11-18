<template lang="pug">
  .list-grid
    .list-grid__controls
      create-list-form
    ul.u-list-bordered
      li.u-list-bordered__item(
        v-for="list in lists"
        :key="list.id"
      )
        nuxt-link(:to="`/list/${list.id}`") {{ list.title | clean }}
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
  .list-grid__controls {
    display: flex;
    justify-content: flex-end;
  }
</style>
