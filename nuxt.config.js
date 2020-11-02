export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'd100-guru',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://firebase.nuxtjs.org/
    '@nuxtjs/firebase',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyDX5qRpyJ-rmvTGEE97Ii-8p-i-th5TiTM',
      authDomain: 'd100-guru.firebaseapp.com',
      databaseURL: 'https://d100-guru.firebaseio.com',
      projectId: 'd100-guru',
      storageBucket: 'd100-guru.appspot.com',
      messagingSenderId: '162997310327',
      appId: '1:162997310327:web:26c4723b173d2f17508772',
      measurementId: 'G-TFT1BJ0VHB',
    },
    services: {
      auth: true,
      firestore: true,
    },
  },

  svgSprite: {
    input: '~/assets/icons/',
    output: '~/assets/icons/gen/'
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
