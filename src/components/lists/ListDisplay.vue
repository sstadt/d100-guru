<template lang="pug">
  .list-display
    ul.u-list-bordered
      list-item.u-list-bordered__item(
        ref="listItems"
        v-for="(item, index) in listItems"
        :key="item.id"
        :item="item"
        :list-items="listItems"
        :editable="editable"
        @item-overflow="parseOverflowItems($event, index)"
        @item-updated="checkForUpdates"
        @next-input="insertBlankItemAtIndex(index)"
      )
</template>

<script>
  import { mapState } from 'vuex';
  import { debounce } from '~/scripts/helpers/utils.js';
  import ListEntry from '~/scripts/schema/ListEntry.js';
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
      this.listItems.push(ListEntry({ value: '' }));
    },
    methods: {
      parseOverflowItems(overflowItems, index) {
        for (let i = 0, j = overflowItems.length; i < j; i++) {
          const newItemOptions = { value: overflowItems[i] };
          this.listItems.splice(index + i, 0, ListEntry(newItemOptions));
        }

        this.saveItems();
      },
      checkForUpdates(updatedItem) {
        const getById = (item) => item.id === updatedItem.id;
        const localIndex = this.listItems.findIndex(getById);
        const savedIndex = this.list.items.findIndex(getById);
        const localValue = this.listItems[localIndex].value;
        const savedValue = this.list.items[savedIndex].value;

        if (localValue !== savedValue) {
          this.listItems.splice(localIndex, 1, updatedItem);
          this.saveItems();
        }
      },
      saveItems: debounce(function () {
        const id = this.list.id;
        const items = this.listItems
          .slice()
          .filter((item) => item.value !== '');
        const updatedItems = items.filter((item) => {
          const savedItem = this.list.items.find((i) => i.id === item.id);
          return !savedItem || savedItem.value !== item.value;
        });

        if (updatedItems.length > 0) {
          console.log('saving...');
          this.$store.dispatch('lists/update', { id, items });
        }
      }, 500),
      insertBlankItemAtIndex(index) {
        const newIndex = index + 1;

        this.listItems.splice(newIndex, 0, ListEntry({ value: '' }));

        const interval = setInterval(() => {
          if (this.listItems[newIndex].value === '') {
            this.focusInput(newIndex);
            // TODO: this is focusing the wrong input
            console.log(this.listItems[newIndex]);
            clearInterval(interval);
          }
        }, 200);
      },
      focusInput(index) {
        this.$refs.listItems[index].focus();
      },
    },
  };
</script>

<style scoped lang="scss"></style>
