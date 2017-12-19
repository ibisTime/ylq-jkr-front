import fetch from 'common/js/fetch';
import {USER_KIND} from './config';
import {getUserId} from 'common/js/util';

/**
 * 用户名密码登录
 * @param {string} loginName
 * @param {string} loginPwd
 */
export function login(loginName, loginPwd) {
  return fetch(805050, {
    kind: USER_KIND,
    loginName,
    loginPwd
  });
}
/**
 * 获取用户详情
 */
export function getUser() {
  return fetch(805121, {
    userId: getUserId()
  });
}

/**
 * 获取用户详情
 * @param {string} userId
 */
export function getUserById(userId) {
  return fetch(805121, { userId });
}

/**
 * 分页获取用户
 * @param {string} start
 * @param {string} limit
 */
export function getPageChildren(start, limit) {
  return fetch(805120, {
    userReferee: getUserId(),
    start,
    limit
  });
}

/**
 * 绑定手机号
 * @param {string} mobile
 * @param {string} smsCaptcha
 * @param {string} isSendSms
 */
export function bindMobile(mobile, smsCaptcha, isSendSms = '0') {
  return fetch(805060, {
    mobile,
    smsCaptcha,
    isSendSms,
    userId: getUserId()
  });
}

/**
 * 修改手机号
 * @param {string} newMobile
 * @param {string} smsCaptcha
 */
export function changeMobile(newMobile, smsCaptcha) {
  return fetch(805061, {
    newMobile,
    smsCaptcha,
    userId: getUserId()
  });
}

/**
 * 重置登录密码
 * @param {string} mobile
 * @param {string} smsCaptcha
 * @param {string} newLoginPwd
 */
export function resetPwd(mobile, smsCaptcha, newLoginPwd) {
  return fetch(805063, {
    kind: USER_KIND,
    mobile,
    smsCaptcha,
    newLoginPwd
  });
}

/**
 * 修改昵称
 * @param {string} nickname
 */
export function changeNickname(nickname) {
  return fetch(805082, {
    nickname,
    userId: getUserId()
  });
}

/**
 * 修改用户头像
 * @param {string} photo
 */
export function changeAvatar(photo) {
  return fetch(805080, {
    photo,
    userId: getUserId()
  });
}

/**
 * 修改用户生日
 * @param {string} birthday
 */
export function changeBirthday (birthday) {
  return fetch(805096, {
    birthday,
    userId: getUserId()
  });
}

/**
 * 修改用户性别
 * @param {string} gender
 */
export function changeGender (gender) {
  return fetch(805097, {
    gender,
    userId: getUserId()
  });
}

/**
 * 保存登录日志
 */
export function saveLoginLog () {
  return fetch(805350, {
    userId: getUserId()
  });
}

/**
 * 修改用户的个人简介
 * @param {string} introduce
 */
export function editIntroduce (introduce) {
  return fetch(805098, {
    introduce,
    userId: getUserId()
  });
}
