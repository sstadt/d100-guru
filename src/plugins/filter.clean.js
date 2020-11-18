import Vue from 'vue';
import cleanAndSanitize from '~/scripts/filters/cleanAndSanitize.js';

Vue.filter('clean', cleanAndSanitize);
