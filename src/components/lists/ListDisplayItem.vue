<template lang="pug">
  li.list-display-item(:class="itemClass")
    textarea.list-display-item__input(
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
    .list-display-item__label(v-else) {{ item.value | clean }}
    .list-display-item__handle(v-if="editable")
      loading-icon(v-if="!saved" :size="12")
      icon.list-display-item__drag-icon(v-else name="drag-handle" :size="12")
</template>

<script>
  import cleanAndSanitize from '~/scripts/filters/cleanAndSanitize.js';
  import Icon from '~/components/basic/Icon.vue';
  import LoadingIcon from '~/components/basic/LoadingIcon.vue';

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
    name: 'ListDisplayItem',
    commponents: {
      Icon,
      LoadingIcon,
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      savedItems: {
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
        oldValue: this.item.value,
        empty: false,
      };
    },
    computed: {
      itemClass() {
        return {
          'u-no-padding': this.editable,
          'list-display-item--editable': this.editable,
        };
      },
      placeholder() {
        return this.editable ? 'New Item' : '';
      },
    },
    watch: {
      saved(newVal, oldVal) {
        if (newVal !== oldVal && !this.saved) {
          // if the value has changed and is flagged as not saved,
          // start checking for when it has been saved
          const interval = setInterval(() => {
            const savedItem = this.savedItems.find(
              (item) => item.id === this.item.id
            );

            if (savedItem && savedItem.value === this.currentValue) {
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

        const newItems = value.split(/\r?\n/).map(cleanAndSanitize);

        if (newItems.length > 1) {
          const validItems = newItems.filter((item) => item.value !== '');

          this.currentValue = validItems.shift();
          this.$emit(events.itemOverflow, validItems);
        }

        this.currentValue = cleanAndSanitize(this.currentValue);
        this.saved = false;
        this.$emit(events.itemUpdated, {
          id: this.item.id,
          value: this.currentValue,
        });
      },
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

        // down arrow
        if ($event.keyCode === 40) {
          this.$emit(events.nextInput);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-display-item {
    position: relative;
  }

  .list-display-item--editable {
    line-height: 0;
  }

  .list-display-item__input {
    width: 100%;
    border: 0;
    padding: 12px 30px 12px 20px;
    resize: none;
    background-color: transparent;
  }

  .list-display-item__handle {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-display-item__drag-icon {
    cursor: grab;
    fill: $border--input;
  }
</style>
