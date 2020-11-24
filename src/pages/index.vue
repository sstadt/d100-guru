<template lang="pug">
  .page.page--index
    sticky-hero
      .container
        h2 D100 Guru
        primary-button(icon="check" label="Foo")
    .container.container--page
      transition(name="slide-fade-left")
        .list-controls(v-if="loggedIn && !atListCap")
          create-list-form
      tabs
        tab(heading="Browse Lists")
          list-grid(:lists="publishedLists" selected)
        tab(heading="My Lists" v-if="loggedIn")
          list-grid(:lists="ownedLists")
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { MAX_LISTS_PER_USER } from '~/scripts/config/lists.js';
  import Tabs from '~/components/basic/Tabs.vue';
  import Tab from '~/components/basic/Tab.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import StickyHero from '~/components/hero/StickyHero.vue';
  import ListGrid from '~/components/lists/ListGrid.vue';

  export default {
    name: 'IndexPage',
    transition: 'page',
    component: {
      Tabs,
      Tab,
      PrimaryButton,
      StickyHero,
      ListGrid,
    },
    computed: {
      ...mapState({
        loggedIn: (state) => state.user.loggedIn,
      }),
      ...mapGetters('lists', {
        publishedLists: 'published',
        ownedLists: 'owned',
      }),
      userListCount() {
        return this.loggedIn ? this.ownedLists.length : 0;
      },
      atListCap() {
        if (!this.loggedIn) return true;
        return this.userListCount >= MAX_LISTS_PER_USER;
      },
    },
  };
</script>

<style lang="scss">
  .page--index {
    position: relative;
  }

  .list-controls {
    display: flex;
    justify-content: flex-end;
  }
</style>
