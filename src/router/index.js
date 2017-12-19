import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 判断第一次进来时的跳转页面
const Redirect = () => import('pages/redirect/redirect');
// 登录
const Login = () => import('pages/login/login');
// 找回密码
const FindPwd = () => import('pages/find-pwd/find-pwd');
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
// 芝麻认证校验是否成功
const CheckZm = () => import('pages/check-zm/check-zm');
// 运营商认证校验是否成功
const CheckYys = () => import('pages/check-yys/check-yys');
// 报告
const Report = () => import('pages/report/report');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Redirect
    },
    {
      path: '/redirect',
      component: Redirect
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/find-pwd',
      component: FindPwd
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
      path: '/check-zm',
      component: CheckZm
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
      path: '/check-yys',
      component: CheckYys
    },
    {
      path: '/report',
      component: Report
    }
  ]
});
