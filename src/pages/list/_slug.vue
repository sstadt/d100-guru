<template lang="pug">
  .page--list
    sticky-hero
      .container
        h1 {{ list.title }}
</template>

<script>
  import { mapState } from 'vuex';
  import StickyHero from '~/components/hero/StickyHero.vue';

  export default {
    name: 'ListPage',
    transition: 'page',
    components: {
      StickyHero,
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
        return this.lists.find((list) => list.id === this.listId) || {};
      },
    },
    mounted() {
      if (!this.list) {
        const interval = setInterval(() => {
          if (this.list) {
            this.$nuxt.loading.finish();
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
