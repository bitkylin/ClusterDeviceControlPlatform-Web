import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }, {
    path: '/404',
    component: () => import('@/views/page404/1'),
    hidden: true
  }, {
    path: '/disconnect',
    component: () => import('@/views/page404/2'),
    hidden: true
  }, {
    path: '/solo/msg/feedbacklist',
    component: () => import('@/views/msg/FeedbackList'),
    hidden: true
  }, {
    path: '/solo/devicegroup/outline',
    component: () => import('@/views/devicegroup/GroupDeviceOutline'),
    hidden: true
  }, {
    path: '/solo/devicegroup/single',
    component: () => import('@/views/devicegroup/SingleGroupOutline'),
    hidden: true
  }, {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'dashboardTop',
    meta: { title: '', icon: 'example' },
    children: [{
      name: 'dashboard',
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'table' }
    }]
  }, {
    path: '/devicegroup',
    component: Layout,
    redirect: '/devicegroup/outline',
    name: 'deviceGroup',
    meta: { title: '设备当前状态', icon: 'example' },
    children: [{
      path: 'outline',
      name: 'groupDeviceOutline',
      component: () => import('@/views/devicegroup/GroupDeviceOutline'),
      meta: { title: '概览', icon: 'table' }
    }, {
      path: 'single',
      name: 'singleDeviceOutline',
      component: () => import('@/views/devicegroup/SingleGroupOutline'),
      meta: { title: '单组', icon: 'table' }
    }]
  }, {
    path: '/dataprocess',
    component: Layout,
    redirect: '/dataprocess/outline',
    name: 'dataprocess',
    meta: { title: '数据处理负载', icon: 'example' },
    children: [{
      path: 'outline',
      name: 'dataProcessPressureOutline',
      component: () => import('@/views/dataprocess/DataProcessPressureOutline'),
      meta: { title: '概览', icon: 'table' }
    }, {
      path: 'single',
      name: 'dataProcessPressureDetail',
      component: () => import('@/views/dataprocess/DataProcessPressureDetail'),
      meta: { title: '详情', icon: 'table' }
    }]
  }, {
    path: '/tcp',
    component: Layout,
    redirect: '/tcp/outline',
    name: 'tcp',
    meta: { title: 'TCP接口负载', icon: 'example' },
    children: [{
      path: 'outline',
      name: 'tcpPressureOutline',
      component: () => import('@/views/tcp/TcpPressureOutline'),
      meta: { title: '概览', icon: 'table' }
    }, {
      path: 'detail',
      name: 'tcpPressureDetail',
      component: () => import('@/views/tcp/TcpPressureDetail'),
      meta: { title: '详情', icon: 'table' }
    }]
  }, {
    path: '/msgsending',
    component: Layout,
    redirect: '/msgsending/outline',
    name: 'msgsending',
    meta: { title: '消息发送进度', icon: 'example' },
    children: [{
      path: 'outline',
      name: 'msgSendingOutline',
      component: () => import('@/views/msgsending/msgSendingOutline'),
      meta: { title: '概览', icon: 'table' }
    }, {
      path: 'singlegroup',
      name: 'msgSendingSingleGroup',
      component: () => import('@/views/msgsending/msgSendingSingleGroup'),
      meta: { title: '单组', icon: 'table' }
    }, {
      path: 'singledevice',
      name: 'msgSendingSingleDevice',
      component: () => import('@/views/msgsending/msgSendingSingleDevice'),
      meta: { title: '单设备', icon: 'table' }
    }]
  }, {
    path: '/msg',
    component: Layout,
    redirect: '/msg/feedbacklist',
    name: 'msg',
    hidden: true,
    meta: { title: '消息', icon: 'example' },
    children: [{
      name: 'feedbackList',
      path: 'feedbacklist',
      component: () => import('@/views/msg/FeedbackList'),
      meta: { title: '反馈消息', icon: 'table' }
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

