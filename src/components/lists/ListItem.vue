<template lang="pug">
  li.list-item(:class="itemClass")
    textarea.list-item__input(
      ref="input"
      v-if="editable"
      type="text"
      rows="1"
      v-model="currentValue"
      :placeholder="placeholder"
      @input="valueUpdated(currentValue)"
      @keypress.enter.prevent="enterHandler"
      @keyup.delete="deleteItem"
      @keyup.38="checkKeys"
      @keyup.40="checkKeys"
    )
    span.list-item__label(v-else) {{ item }}
</template>

<script>
  import { debounce } from '~/scripts/helpers/utils.js';

  const events = {
    // more than one line of text was entered, returns extra lines as an array
    itemOverflow: 'item-overflow',
    // item was updated, returns the updated item object
    itemUpdated: 'item-updated',
    // a new line was started, create a new item for it
    newInput: 'new-input',
    // delete the current item
    deleteItem: 'delete-item',
    // navigate to the previous item
    prevInput: 'prev-input',
    // navigate to the next item
    nextInput: 'next-input',
  };

  export default {
    name: 'ListItem',
    props: {
      item: {
        type: Object,
        required: true,
      },
      listItems: {
        type: Array,
        default: () => [],
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        currentValue: this.item.value,
        saved: true,
        oldValue: this.currentValue,
        empty: false,
      };
    },
    computed: {
      itemClass() {
        return {
          'u-no-padding': this.editable,
        };
      },
      placeholder() {
        return this.editable ? 'New Item' : '';
      },
    },
    watch: {
      saved(newVal, oldVal) {
        if (newVal !== oldVal && !this.saved) {
          const interval = setInterval(() => {
            const savedItem = this.list.items.find(
              (item) => item.id === this.item.id
            );

            if (savedItem.value === this.currentValue) {
              this.saved = true;
              this.oldValue = this.currentValue;
              clearInterval(interval);
            }
          }, 200);
        }
      },
    },
    methods: {
      valueUpdated(value) {
        if (value === this.oldValue) return;
        if (value !== '') this.empty = false;

        const newItems = value.split(/\r?\n/);

        if (newItems.length > 1) {
          const validItems = newItems.filter((item) => item.value !== '');

          this.currentValue = validItems.shift();
          this.$emit(events.itemOverflow, validItems);
        }

        this.$emit(events.itemUpdated, {
          id: this.item.id,
          value: this.currentValue,
        });
      },
      startLoading: debounce(function () {
        if (this.saved) this.saved = false;
      }, 500),
      enterHandler() {
        this.$emit(events.newInput);
      },
      focus() {
        this.$refs.input.focus();
      },
      getValue() {
        return this.currentValue;
      },
      getId() {
        return this.item.id;
      },
      deleteItem() {
        if (this.empty) {
          this.$emit(events.deleteItem);
        } else if (this.currentValue === '') {
          this.empty = true;
        }
      },
      checkKeys($event) {
        // up arrow
        if ($event.keyCode === 38) {
          this.$emit(events.prevInput);
        }

        if (event.keyCode === 40) {
          this.$emit(events.nextInput);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-item__input {
    display: block;
    width: 100%;
    border: 0;
    padding: 12px 20px;
    resize: none;
    background-color: transparent;
  }
</style>
