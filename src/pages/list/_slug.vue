<template lang="pug">
  .page.page--list
    StickyHero
      .container
        transition(name="fade" mode="out-in")
          ListRoller(ref="roller" v-if="list" :list="list")
          p.h1(v-else) Loading list...
    .container.container--page(v-if="list")
      ListControls(v-if="list && isAuthor" :list="list")
      ListDisplay(:list="list")
</template>

<script>
  import { mapState } from 'vuex';
  import StickyHero from '~/components/hero/StickyHero.vue';
  import ListControls from '~/components/lists/ListControls.vue';
  import ListDisplay from '~/components/lists/ListDisplay.vue';
  import ListRoller from '~/components/lists/ListRoller.vue';

  export default {
    name: 'ListPage',
    transition: 'page',
    components: {
      StickyHero,
      ListControls,
      ListDisplay,
      ListRoller,
    },
    asyncData({ params }) {
      return {
        listId: params.slug,
      };
    },
    computed: {
      ...mapState({
        lists: (state) => state.lists.all,
        currentUser: (state) => state.user.currentUser,
      }),
      list() {
        return this.lists.find((list) => list.id === this.listId);
      },
      isAuthor() {
        return (
          this.currentUser.uid && this.currentUser.uid === this.list.author
        );
      },
    },
    mounted() {
      // NOTE: Show loading bar if this page loads
      //       before binding lists
      if (!this.list) {
        const interval = setInterval(() => {
          if (this.list) {
            this.$nuxt.$loading.finish();
            clearInterval(interval);
          }
        }, 200);

        this.$nextTick(() => {
          this.$nuxt.$loading.start();
        });
      }
    },
  };
</script>

<style scoped lang="scss"></style>
