<template lang="pug">
  .list-display
    ul.u-list-bordered
      list-item.u-list-bordered__item(
        v-for="(item, index) in listItems"
        :key="`${item}_${index}`"
        :item="item"
        :editable="editable"
      )
</template>

<script>
  import { mapState } from 'vuex';
  import ListItem from '~/components/lists/ListItem.vue';

  export default {
    name: 'ListDisplay',
    components: {
      ListItem,
    },
    props: {
      list: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        listItems: this.list.items.slice(),
      };
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.user.currentUser,
      }),
      editable() {
        return this.currentUser && this.currentUser.uid === this.list.author;
      },
    },
    mounted() {
      this.listItems.push('');
    },
  };
</script>

<style scoped lang="scss"></style>
