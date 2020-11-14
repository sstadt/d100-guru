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
        @new-input="insertBlankItemAtIndex(index + 1)"
        @next-input="focusNextInput(index + 1)"
        @prev-input="focusNextInput(index - 1)"
        @delete-item="deleteItem(index)"
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
    methods: {
      parseOverflowItems(overflowItems, index) {
        for (let i = 0, j = overflowItems.length; i < j; i++) {
          const newItemOptions = { value: overflowItems[i] };
          this.listItems.splice(index + i, 0, ListEntry(newItemOptions));
        }

        this.saveItems();
      },
      checkForUpdates(updatedItem) {
        const index = this.listItems.findIndex((i) => i.id === updatedItem.id);

        if (updatedItem.value !== this.listItems[index].value) {
          this.listItems.splice(index, 1, updatedItem);
          this.saveItems();
        }
      },
      saveItems: debounce(function () {
        const itemsDeleted = this.list.items.length > this.listItems.length;
        const items = this.listItems.slice().filter((i) => i.value !== '');
        const updatedItems = items.filter((item) => {
          const savedItem = this.list.items.find((i) => i.id === item.id);
          return !savedItem || savedItem.value !== item.value;
        });

        if (itemsDeleted || updatedItems.length > 0) {
          this.$store.dispatch('lists/update', {
            items,
            id: this.list.id,
          });
        }
      }, 2500),
      insertBlankItemAtIndex(index) {
        this.listItems.splice(index, 0, ListEntry({ value: '' }));
        this.focusNewInput();
      },
      focusNewInput() {
        this.$nextTick(() => {
          // NOTE: new refs are pushed onto the array,
          //       so we always grab the last ref
          const lastIndex = this.$refs.listItems.length - 1;
          const $newRef = this.$refs.listItems[lastIndex];

          if ($newRef.getValue() === '') {
            this.focusInput(lastIndex);
          }
        });
      },
      focusNextInput(index) {
        // NOTE: since refs are always appended we
        //       need to find the right index by ID
        if (this.listItems[index]) {
          const id = this.listItems[index].id;
          const refIndex = this.$refs.listItems.findIndex(
            (ref) => ref.getId() === id
          );

          this.focusInput(refIndex);
        }
      },
      focusInput(index) {
        if (this.$refs.listItems[index]) {
          this.$refs.listItems[index].focus();
        }
      },
      deleteItem(index) {
        this.listItems.splice(index, 1);
        this.saveItems();
        this.focusInput(index - 1);
      },
    },
  };
</script>

<style scoped lang="scss"></style>
