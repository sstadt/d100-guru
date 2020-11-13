<template lang="pug">
  .page.page--list
    sticky-hero
      .container
        h1(v-if="list") {{ list.title }}
        h1(v-else) Loading list...
    .container.container--page(v-if="list")
      list-display(:list="list")
</template>

<script>
  import { mapState } from 'vuex';
  import StickyHero from '~/components/hero/StickyHero.vue';
  import ListDisplay from '~/components/lists/ListDisplay.vue';

  export default {
    name: 'ListPage',
    transition: 'page',
    components: {
      StickyHero,
      ListDisplay,
    },
    asyncData({ params }) {
      return {
        listId: params.slug,
      };
    },
    computed: {
      ...mapState({
        lists: (state) => state.lists.all,
      }),
      list() {
        return this.lists.find((list) => list.id === this.listId);
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
