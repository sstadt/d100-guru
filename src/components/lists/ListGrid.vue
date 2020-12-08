<template lang="pug">
  ul.u-list-bordered
    li.u-list-bordered__item(v-for="list in lists" :key="list.id")
      nuxt-link(:to="`/list/${list.id}`") {{ list.title | clean }}
      .u-list-bordered__controls
        icon-button(
          label="Roll"
          icon="d20"
          :icon-size="22"
          @click="rollList(list.id)"
          tooltip
        )
        icon-button(
          v-if="list.author === currentUser.uid"
          label="Delete"
          icon="trash"
          :icon-size="16"
          @click="deleteList(list.id)"
        )
</template>

<script>
  import { mapState } from 'vuex';
  import IconButton from '~/components/buttons/IconButton.vue';

  const events = {
    // ask the parent to roll on this list
    rollList: 'roll-list',
  };

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
      rollList(listId) {
        const list = this.lists.find((list) => list.id === listId);
        this.$emit(events.rollList, list);
      },
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
