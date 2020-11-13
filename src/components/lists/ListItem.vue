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
    )
    span.list-item__label(v-else) {{ item }}
</template>

<script>
  import { debounce } from '~/scripts/helpers/utils.js';

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

        const newItems = value.split(/\r?\n/);

        if (newItems.length > 1) {
          const validItems = newItems.filter((item) => item.value !== '');

          this.currentValue = validItems.shift();
          this.$emit('item-overflow', validItems);
        }

        this.$emit('item-updated', {
          id: this.item.id,
          value: this.currentValue,
        });
      },
      startLoading: debounce(function () {
        if (this.saved) this.saved = false;
      }, 500),
      enterHandler() {
        this.$emit('next-input');
      },
      focus() {
        this.$refs.input.focus();
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
