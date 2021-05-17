<template lang="pug">
  .page.page--index
    StickyHero
      .container
        transition(name="fade" mode="out-in" @after-enter="heroTransitioning")
          ListRoller(ref="roller" v-if="activeList" :list="activeList")
          div(v-else)
            h2 D100 Guru
            p Click the #[Icon(name="d20")] icon on a list below to roll something!
    .container.container--page
      transition(name="slide-fade-left")
        .page-controls(v-if="showCreateList")
          CreateListForm
      Tabs
        Tab(heading="Browse Lists" selected)
          ListGrid(:lists="publishedLists" @roll-list="rollList")
          PrimaryButton.page--index__load-more(
            v-if="!endOfPublished"
            label="Load More"
            @click="loadMore"
          )
        Tab(heading="My Lists" v-if="loggedIn")
          ListGrid(:lists="ownedLists" @roll-list="rollList")
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
        endOfPublished: (state) => state.lists.endOfPublished,
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
        return (
          (this.currentUser && this.currentUser.admin) ||
          (this.loggedIn && !this.atListCap)
        );
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
      loadMore() {
        this.$store.dispatch('lists/bindNext');
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

  .page--index__load-more {
    margin-top: $content-gutter;
  }
</style>
