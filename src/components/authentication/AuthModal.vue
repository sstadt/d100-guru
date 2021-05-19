<template lang="pug">
  .auth-modal
    modal(ref="authModal" @close="$store.dispatch('user/closeAuth')")
      template(slot="content")
        auth
</template>

<script>
  import { mapState } from 'vuex';
  import Modal from '~/components/basic/Modal.vue';
  import Auth from '~/components/authentication/Auth.vue';

  export default {
    name: 'AuthModal',
    components: {
      Modal,
      Auth,
    },
    computed: {
      ...mapState({
        authOpen: (state) => state.user.authOpen,
        currentUser: (state) => state.user.currentUser,
      }),
    },
    watch: {
      authOpen(newVal, oldVal) {
        if (newVal !== oldVal && this.authOpen) {
          this.$refs.authModal.open();
        }
      },
      currentUser() {
        if (this.currentUser) {
          this.$refs.authModal.close();
        }
      },
    },
  };
</script>

<style scoped lang="scss"></style>
