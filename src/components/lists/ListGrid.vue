<template lang="pug">
  .list-grid
    transition(name="slide-fade-left")
      .list-grid__controls(v-if="loggedIn && !atListCap")
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
  import { maxListsPerUser } from '~/scripts/config/lists.js';
  import CreateListForm from '~/components/lists/CreateListForm.vue';

  export default {
    name: 'ListGrid',
    components: {
      CreateListForm,
    },
    computed: {
      ...mapState({
        lists: (state) => state.lists.all,
        loggedIn: (state) => state.user.loggedIn,
        currentUser: (state) => state.user.currentUser,
      }),
      userListCount() {
        if (!this.loggedIn) return 0;

        const userLists = this.lists.filter(
          (list) => list.author === this.currentUser.uid
        );

        return userLists.length;
      },
      atListCap() {
        if (!this.loggedIn) return true;
        return this.userListCount >= maxListsPerUser;
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
