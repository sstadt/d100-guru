<template lang="pug">
  .page.page--index
    sticky-hero
      .container
        transition(name="fade" mode="out-in" @after-enter="heroTransitioning")
          list-roller(ref="roller" v-if="activeList" :list="activeList")
          div(v-else)
            h2 D100 Guru
            p Click the #[icon(name="d20")] icon on a list below to roll something!
    .container.container--page
      transition(name="slide-fade-left")
        .page-controls(v-if="showCreateList")
          create-list-form
      tabs
        tab(heading="Browse Lists" selected)
          list-grid(:lists="publishedLists" @roll-list="rollList")
        tab(heading="My Lists" v-if="loggedIn")
          list-grid(:lists="ownedLists" @roll-list="rollList")
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { MAX_LISTS_PER_USER } from '~/scripts/config/lists.js';
  import { clone } from '~/scripts/helpers/utils.js';
  import Icon from '~/components/basic/Icon.vue';
  import Tabs from '~/components/basic/Tabs.vue';
  import Tab from '~/components/basic/Tab.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import StickyHero from '~/components/hero/StickyHero.vue';
  import ListGrid from '~/components/lists/ListGrid.vue';
  import ListRoller from '~/components/lists/ListRoller.vue';

  export default {
    name: 'IndexPage',
    transition: 'page',
    component: {
      Icon,
      Tabs,
      Tab,
      PrimaryButton,
      StickyHero,
      ListGrid,
      ListRoller,
    },
    data() {
      return {
        activeList: null,
        rollAfterTransition: false,
      };
    },
    computed: {
      ...mapState({
        loggedIn: (state) => state.user.loggedIn,
        currentUser: (state) => state.user.currentUser,
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
      showCreateList() {
        return this.currentUser.admin || (this.loggedIn && !this.atListCap);
      },
    },
    methods: {
      rollList(list) {
        if (this.activeList && this.activeList.id === list.id) {
          this.rollActiveList();
        } else if (list.id) {
          this.setActiveList(list);
          this.$nextTick(() => this.rollActiveList());
        }
      },
      setActiveList(list) {
        this.activeList = clone(list);
      },
      rollActiveList() {
        if (!this.$refs.roller) {
          this.rollAfterTransition = true;
        } else {
          this.$refs.roller.roll();
        }
      },
      heroTransitioning() {
        if (this.rollAfterTransition) {
          this.rollActiveList();
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .page--index {
    position: relative;
  }

  .page-controls {
    display: flex;
    justify-content: flex-end;
  }
</style>
