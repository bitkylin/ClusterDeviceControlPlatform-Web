import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
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
    component: _import('login/index'),
    hidden: true
  }, {
    path: '/404',
    component: _import('page404/1'),
    hidden: true
  }, {
    path: '/401',
    component: _import('page404/2'),
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
      component: _import('dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }, {
    path: '/devicegroup',
    component: Layout,
    redirect: '/devicegroup/outline',
    name: 'deviceGroup',
    meta: { title: '设备组', icon: 'example' },
    children: [{
      path: 'outline',
      name: 'deviceGroupOutline',
      component: _import('devicegroup/DeviceGroupOutline'),
      meta: { title: '设备组概览', icon: 'dashboard' }
    }, {
      path: 'single',
      name: 'deviceGroupOutline1',
      component: _import('devicegroup/SingleGroupOutline'),
      meta: { title: '单组概览', icon: 'dashboard' }
    }]
  }, {
    path: '/tcp',
    component: Layout,
    redirect: '/tcp/chart',
    name: 'tcp',
    meta: { title: 'TCP接口模块', icon: 'example' },
    children: [{
      path: 'chart',
      name: 'tcpChart',
      component: _import('tcp/Chart'),
      meta: { title: '图示', icon: 'table' }
    }, {
      path: 'table',
      name: 'tcpTable',
      component: _import('tcp/Table'),
      meta: { title: '详情', icon: 'table' }
    }]
  }, {
    path: '/test',
    component: Layout,
    redirect: '/test/first',
    name: 'test',
    meta: { title: '测试', icon: 'example' },
    children: [{
      path: 'first',
      name: 'first',
      component: _import('test/first'),
      meta: { title: '测试1', icon: 'table' }
    }, {
      path: 'second',
      name: 'second',
      component: _import('test/second'),
      meta: { title: '测试2', icon: 'tree' }
    }, {
      path: 'third',
      name: 'third',
      component: _import('test/third'),
      meta: { title: '测试3', icon: 'tree' }
    }, {
      path: 'forth',
      name: 'forth',
      component: _import('test/forth'),
      meta: { title: '测试4', icon: 'tree' }
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
