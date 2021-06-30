const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ants Planet',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'load.js'
      },
      {
        src: 'https://www.recaptcha.net/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
        async: true,
        defer: true
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: '3333'
  },
  publicRuntimeConfig: {
    dappWeb: process.env.DAPP_WEB,
    bridge: process.env.BRIDGE,
    api: process.env.API,
    chain: process.env.CHAIN
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    { src: '~/assets/css/index.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/copy',
    '@/plugins/filecoin'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API,
    timeout: 30000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }]
      ]
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          },
          compress: {
            warnings: false,
            drop_debugger: true, // console
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        cache: true,
        parallel: true
      })
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    transpile: [/^element-ui/],
    postcss: {
      plugins: {
        'postcss-px2viewport-pro': [
          {
            unitToConvert: 'rpx',
            viewportWidth: 750,
            mediaQuery: true,
            viewportUnit: 'vw',
            minPixelValue: 0
          },
          {
            unitToConvert: 'dpx',
            viewportWidth: 1920,
            viewportUnit: 'vw',
            minPixelValue: 0
          }

        ]
      }
    }
  }
}
