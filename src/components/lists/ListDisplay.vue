<template lang="pug">
  .list-display
    .list-display__empty.alert(v-if="list && list.items.length < 1")
      p.list-display__empty-title.h2 This list has no items
      p.list-display__empty-subtitle Add some below!
    draggable.u-list-bordered(
      tag="li"
      v-model="listItems"
      @end="saveItems"
    )
      list-display-item.u-list-bordered__item(
        ref="listItems"
        v-for="(item, index) in listItems"
        :key="item.id"
        :item="item"
        :saved-items="list.items"
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
  import Draggable from 'vuedraggable';
  import { debounce } from '~/scripts/helpers/utils.js';
  import ListEntry from '~/scripts/schema/ListEntry.js';
  import ListDisplayItem from '~/components/lists/ListDisplayItem.vue';

  export default {
    name: 'ListDisplay',
    components: {
      Draggable,
      ListDisplayItem,
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
      if (this.listItems.length < 1) {
        this.listItems.push(ListEntry());
      }
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
        const updatedItems = items.filter((item, index) => {
          const savedIndex = this.list.items.findIndex((i) => i.id === item.id);
          const savedItem = this.list.items[savedIndex];

          return (
            !savedItem || // doesn't exist
            savedItem.value !== item.value || // value has changed
            index !== savedIndex // order has changed
          );
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
          // NOTE: new refs are pushed onto the array (not spliced),
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

<style scoped lang="scss">
  .list-display__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px;
  }

  .list-display__empty-title {
    margin-bottom: $content-gutter;
  }

  .list-display__empty-subtitle {
    margin: 0;
  }
</style>
