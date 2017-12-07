import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 登录
const Login = () => import('pages/login/login');
// 填写完成
const InvestigationSuc = () => import('pages/investigation-suc/investigation-suc');
// 芝麻认证
const Zmrz = () => import('pages/zmrz/zmrz');
// 身份证上传
const Sfzsc = () => import('pages/sfzsc/sfzsc');
// 基本信息
const Information = () => import('pages/information/information');
// 行业关注清单认证
const Hygzqd = () => import('pages/hygzqd/hygzqd');
// 芝麻分认证
const Zmfrz = () => import('pages/zmfrz/zmfrz');
// 运营商认证
const Yysrz = () => import('pages/yysrz/yysrz');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/investigation-suc',
      component: InvestigationSuc
    },
    {
      path: '/zmrz',
      component: Zmrz
    },
    {
      path: '/sfzsc',
      component: Sfzsc
    },
    {
      path: '/info',
      component: Information
    },
    {
      path: '/hygzqd',
      component: Hygzqd
    },
    {
      path: '/zmfrz',
      component: Zmfrz
    },
    {
      path: '/yysrz',
      component: Yysrz
    }
  ]
});
