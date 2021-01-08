<template lang="pug">
  .list-controls
    nuxt-link(to="/")
      icon(name="chevron-left" size="8")
      span Back
    toggle-input(
      ref="publishToggle"
      v-model="isPublished"
      label="Shared"
      :disabled="publishDisabled"
      v-tooltip="publishTooltip"
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
      publishTooltip() {
        const itemsShort = MIN_LIST_ITEMS_TO_PUBLISH - this.list.items.length;
        const itemsShortMsg =
          itemsShort > 1
            ? `${itemsShort} more items`
            : `${itemsShort} more item`;

        return this.publishDisabled
          ? `You need at least ${itemsShortMsg} to share with the community`
          : 'Share this list with the community';
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
          // NOTE: v-model will trigger an update and the
          //       isPublished watcher will save the change
          this.$refs.publishToggle.set(false);
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
    display: flex;
    justify-content: space-between;
    margin-bottom: $content-gutter;
  }
</style>
