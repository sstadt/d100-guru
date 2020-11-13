<template lang="pug">
  li.list-item(:class="itemClass")
    input.list-item__input(
      v-if="editable"
      type="text"
      v-model="currentValue"
      :placeholder="placeholder"
      @input="valueUpdated(currentValue)"
    )
    span.list-item__label(v-else) {{ item }}
</template>

<script>
  export default {
    name: 'ListItem',
    props: {
      item: {
        type: String,
        default: '',
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        currentValue: this.item,
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
    methods: {
      valueUpdated(value) {
        console.log(value);
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-item__input {
    background-color: transparent;
    border: 0;
    padding: 12px 20px;
    width: 100%;
  }
</style>
