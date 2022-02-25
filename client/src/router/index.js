import Vue from 'vue'
import Router from 'vue-router'
import Skeleton from '@/components/Skeleton'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Skeleton',
      component: Skeleton
    }
  ]
})
