<template lang="pug">
  p.password-strength(:class="colorClass") {{ message }}
</template>

<script>
  import zxcvbn from 'zxcvbn';

  export default {
    name: 'PasswordStrength',
    props: {
      password: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        strengthLevels: [
          'A blind vegepygmy would handily plunder your tomb',
          'Those kobold traps should keep the common folk out',
          'Might give some low level adventurers a challenge',
          'Only the sagest of dragons could breach your locks',
          'The gods themselves weep at the beauty of your defenses',
        ],
        colorClasses: [
          'u-bg-error',
          'u-bg-orange',
          'u-bg-warning',
          'u-bg-warning',
          'u-bg-success',
        ],
      };
    },
    computed: {
      strength() {
        return zxcvbn(this.password).score;
      },
      message() {
        return this.strengthLevels[this.strength];
      },
      colorClass() {
        const colorClass = {};

        colorClass[this.colorClasses[this.strength]] = true;

        return colorClass;
      },
    },
  };
</script>

<style scoped lang="scss">
  .password-strength {
    text-align: center;
    font-size: rem(12);
    padding: 4px 0;
    color: $text--light;
    text-shadow: 2px 2px 2px rgba($color-black, 0.35);
    border-bottom-left-radius: $border-radius--input;
    border-bottom-right-radius: $border-radius--input;
  }
</style>
