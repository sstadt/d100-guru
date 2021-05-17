export default {
  srcDir: 'src',

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

  link: [
    {
      rel: 'stylesheet',
      hrel: 'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,500;1,400;1,500&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    },
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/filter.clean.js',
    '~/plugins/setupLists.js',
    '~/plugins/tooltip.js',
    '~/plugins/veeValidate.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
    '@nuxtjs/gtm',
    'nuxt-mq',
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
      firestore: true,
      auth: {
        initialize: {
          onAuthStateChangedAction: 'user/authStateChanged',
          subscribeManually: false,
        },
      },
    },
  },

  svgSprite: {
    input: '~/assets/icons/',
    output: '~/assets/icons/gen/'
  },

  styleResources: {
    scss: [
      '~/styles/boilerplate.scss',
    ],
  },

  googleFonts: {
    families: {
      Philosopher: true,
      Mulish: true,
    },
  },

  gtm: {
    id: 'G-YLHYF6Z9GM',
    enabled: true,
    pageTracking: true,
    scriptURL: 'https://www.googletagmanager.com/gtag/js'
  },

  mq: {
    // Default breakpoint for SSR
    defaultBreakpoint: 'default',
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: Infinity,
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    transpile: ['vee-validate/dist/rules'],
  },
};
