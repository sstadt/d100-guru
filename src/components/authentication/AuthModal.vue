<template lang="pug">
  .auth-modal
    modal(ref="authModal")
      template(slot="content")
        auth
</template>

<script>
  import Modal from '~/components/basic/Modal.vue';
  import Auth from '~/components/authentication/Auth.vue';

  export default {
    name: 'AuthModal',
    components: {
      Modal,
      Auth,
    },
    mounted() {
      this.$refs.authModal.open();
    },
  };
</script>

<style scoped lang="scss"></style>
