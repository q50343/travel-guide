import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home.vue'
import Search from './../views/Search.vue'
import Detail from './../views/Detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/'},
    { path: '/', name: 'Home', component: Home },
    { path: '/D/:ID', name: 'Detail', component: Detail },
    {
      path: '/:mode/:city/:keyword?',
      name: 'Search',
      component: Search
    },
    {
      path: '/:mode/:lat(\\d+\\.\\d+)/:lon(\\d+\\.\\d+)',
      name: 'Nearby',
      component: Search
    },
    { path: '/:pathMatch(.*)*', name: 'error', redirect: '/' }
  ]
})
