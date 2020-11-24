<template lang="pug">
  .list-controls
    toggle-input(
      v-model="isPublished"
      label="Shared"
      :disabled="publishDisabled"
    )
</template>

<script>
  import { MIN_LIST_ITEMS_TO_PUBLISH } from '~/scripts/config/lists.js';
  import { debounce } from '~/scripts/helpers/utils.js';
  import Icon from '~/components/basic/Icon.vue';
  import ToggleInput from '~/components/inputs/ToggleInput.vue';

  export default {
    name: 'ListControls',
    components: {
      Icon,
      ToggleInput,
    },
    props: {
      list: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        isPublished: Boolean(this.list.published),
      };
    },
    computed: {
      publishDisabled() {
        return this.list.items.length < MIN_LIST_ITEMS_TO_PUBLISH;
      },
    },
    watch: {
      isPublished() {
        if (this.isPublished !== this.list.published) {
          this.saveList({ published: this.isPublished });
        }
      },
      publishDisabled() {
        if (this.publishDisabled && this.list.published) {
          this.saveList({ published: false });
        }
      },
    },
    methods: {
      saveList: debounce(function (updatedList) {
        updatedList.id = this.list.id;
        this.$store.dispatch('lists/update', updatedList);
      }, 1500),
    },
  };
</script>

<style scoped lang="scss">
  .list-controls {
    margin-bottom: $content-gutter;
  }
</style>
