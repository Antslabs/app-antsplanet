import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha'
import { Dialog, Message } from 'element-ui'
Vue.use(Dialog)
Vue.component('VueRecaptcha', VueRecaptcha)
Vue.prototype.$message = Message
