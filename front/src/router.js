import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Summary from '@/components/Summary.vue'
import Detail from '@/components/Detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
