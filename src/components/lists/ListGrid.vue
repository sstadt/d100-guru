<template lang="pug">
  ul.u-list-bordered
    li.u-list-bordered__item(
      v-for="list in lists"
      :key="list.id"
    )
      nuxt-link(:to="`/list/${list.id}`") {{ list.title | clean }}
      .u-list-bordered__controls(v-if="list.author === currentUser.uid")
        icon-button(icon="trash" @click="deleteList(list.id)")
</template>

<script>
  import { mapState } from 'vuex';
  import IconButton from '~/components/buttons/IconButton.vue';

  export default {
    name: 'ListGrid',
    components: {
      IconButton,
    },
    props: {
      lists: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.user.currentUser,
      }),
    },
    methods: {
      deleteList(listId) {
        const list = this.lists.find((list) => list.id === listId);
        const message = `Are you sure you want to delete ${list.title}\n!!! This cannot be undone !!!`;

        if (confirm(message)) {
          this.$store.dispatch('lists/delete', list.id);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-grid__controls {
    display: flex;
    justify-content: flex-end;
  }
</style>
