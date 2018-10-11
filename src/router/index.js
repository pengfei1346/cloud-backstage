import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/upload',
      meta:{
        title:"页面"
      },
      component: () => import('@/components/upload')
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      meta:{
        title:"云图书后台管理系统-登录页面"
      },
      component: () => import('@/views/login')
    },
    {
      path: '/layout',
      meta:{
        title:"云图书后台管理系统-管理页面"
      },
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'userList',
          meta:{
            title:"用户列表"
          },
          component: () => import('@/views/user/userList')
        },
        {
          path: 'swipeList',
          meta:{
            title:"获取轮播图列表"
          },
          component: () => import('@/views/swiper/swipeList')
        },
        {
          path: 'getSwipe',
          meta:{
            title:"轮播图"
          },
          component: () => import('@/views/swiper/getSwipe')
        },
        {
          path: 'modifySwipe',
          meta:{
            title:"修改轮播图"
          },
          component: () => import('@/views/swiper/modifySwipe')
        },
        {
          path: 'addSwipe',
          meta:{
            title:"添加轮播图"
          },
          component: () => import('@/views/swiper/addSwipe')
        },
        {
          path: 'addClassify',
          meta:{
            title:"添加分类"
          },
          component: () => import('@/views/classify/addClassify')
        },
        {
          path: 'getAllClassify',
          meta:{
            title:"获得全部分类"
          },
          component: () => import('@/views/classify/getAllClassify')
        },
        {
          path: 'getOneClassify',
          meta:{
            title:"获得分类下的图书"
          },
          component: () => import('@/views/classify/getOneClassify')
        },
        {
          path: 'modifyClassify',
          meta:{
            title:"修改分类"
          },
          component: () => import('@/views/classify/modifyClassify')
        },
        {
          path: 'getBook',
          meta:{
            title:"获取图书"
          },
          component: () => import('@/views/book/getBook')
        },
        {
          path: 'addBook',
          meta:{
            title:"添加图书"
          },
          component: () => import('@/views/book/addBook')
        },
        {
          path: 'modifyBook',
          meta:{
            title:"修改图书"
          },
          component: () => import('@/views/book/modifyBook')
        },
        {
          path: 'deleteBook',
          meta:{
            title:"删除图书"
          },
          component: () => import('@/views/book/deleteBook')
        },
        {
          path: 'getAdmin',
          meta:{
            title:"获取管理员"
          },
          component: () => import('@/views/admin/getAdmin')
        },
        {
          path: 'addAdmin',
          meta:{
            title:"添加管理员"
          },
          component: () => import('@/views/admin/addAdmin')
        },
        {
          path: 'modifyInfo',
          meta:{
            title:"修改信息"
          },
          component: () => import('@/views/admin/modifyInfo')
        },
        {
          path: 'modifyPassword',
          meta:{
            title:"修改密码"
          },
          component: () => import('@/views/admin/modifyPassword')
        },
      ]
    },
  ]
});

router.beforeEach((to,from,next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

export default router
