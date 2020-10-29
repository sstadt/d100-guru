
module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    // component style code does not take parents into account
    // and throws many false positives on nested selectors
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep']
    }],
  },
};
