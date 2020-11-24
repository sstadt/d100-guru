<template lang="pug">
  .create-list-form
    transition(name="slide-fade-left" mode="out-in")
      .create-list-form__toggle(v-if="!formVisible" key="toggle")
        .form-input
          primary-button(label="New List" @click="showForm" small)
      .create-list-form__form(v-else key="form")
        validation-observer(v-slot="{ invalid, handleSubmit }")
          form(@submit.prevent="handleSubmit(createList)" novalidate)
            validation-provider(name="Email" rules="required" v-slot="{ errors }")
              .form-input.form-input__inline
                text-input(
                  ref="listNameInput"
                  label="New List"
                  :placeholder="newListPlaceholder"
                  v-model="newListTitle"
                )
                submit-button(label="Create" :disabled="invalid" inline)
                icon-button.create-list-form__cancel(icon="times" label="Cancel" @click="hideForm")
</template>

<script>
  import { mapState } from 'vuex';
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import cleanAndSanitize from '~/scripts/filters/cleanAndSanitize.js';
  import TextInput from '~/components/inputs/TextInput.vue';
  import PrimaryButton from '~/components/buttons/PrimaryButton.vue';
  import IconButton from '~/components/buttons/IconButton.vue';
  import SubmitButton from '~/components/buttons/SubmitButton.vue';

  import List from '~/scripts/schema/List.js';
  import { NEW_LIST_PLACEHOLDERS } from '~/scripts/config/lists.js';
  import { getRandomNumber } from '~/scripts/helpers/dice.js';

  export default {
    name: 'CreateListForm',
    components: {
      ValidationObserver,
      ValidationProvider,
      TextInput,
      PrimaryButton,
      IconButton,
      SubmitButton,
    },
    data() {
      return {
        newListTitle: '',
        newListPlaceholder: '',
        formVisible: false,
        formDisabled: false,
        formLoading: false,
      };
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.user.currentUser,
      }),
    },
    mounted() {
      const randomIndex = getRandomNumber(1, NEW_LIST_PLACEHOLDERS.length);
      this.newListPlaceholder = NEW_LIST_PLACEHOLDERS[randomIndex];
    },
    methods: {
      showForm() {
        this.formVisible = true;
      },
      hideForm() {
        this.formVisible = false;
      },
      enableForm() {
        this.formDisabled = false;
        this.formLoading = false;
      },
      resetForm() {
        this.formVisible = false;
        this.enableForm();
        this.$refs.listNameInput.set('');
      },
      listCreated() {
        // TODO: redirect to created list page
        this.enableForm();
      },
      createList() {
        const newList = List({
          title: cleanAndSanitize(this.newListTitle),
          author: this.currentUser.uid,
        });

        if (newList.title.length > 0) {
          this.formLoading = true;
          this.formDisabled = true;

          this.$store
            .dispatch('lists/create', newList)
            .then(() => this.resetForm())
            .catch(() => this.listCreated());
        } else {
          this.$store.dispatch('toast/send', 'Invalid list title');
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .create-list-form__toggle {
    padding-top: 20px;
  }

  .create-list-form__cancel {
    margin-top: 20px;
    margin-left: 10px;
  }
</style>
