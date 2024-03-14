import Vue from 'vue'
import App from './App.vue'
// import micon from 'm-icon'
import micon from 'vue2-m-icon'
import 'vue2-m-icon/dist/mIcon.css'
Vue.config.productionTip = false
Vue.use(micon)
new Vue({
  render: h => h(App),
}).$mount('#app')
