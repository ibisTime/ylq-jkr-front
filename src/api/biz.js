import fetch from 'common/js/fetch';
import {getUserId, getSearchCode} from 'common/js/util';

/**
 * 分页获取调查单
 * @param {string} start
 * @param {string} limit
 */
export function getPageInvestigation(start, limit) {
  return fetch(805280, {
    start,
    limit,
    loanUser: getUserId(),
    statusList: [0, 1],
    orderColumn: 'create_datetime',
    orderDir: 'desc'
  });
}
/**
 * 详情查询报告单
 * @param {string} reportCode
 */
export function getReport(reportCode) {
  return fetch(805331, {reportCode});
}

/**
 * 获取授权芝麻信用URL
 * @param {string} idNo
 * @param {string} realName
 */
export function getZhiMaUrl(idNo, realName) {
  return fetch(805275, {
    idNo,
    realName,
    searchCode: getSearchCode()
  }, true);
}
/**
 * 查询用户芝麻认证是否成功
 */
export function checkZM(searchCode) {
  return fetch(805276, {searchCode});
}
/**
 * 用户基本信息认证
 */
export function setUserInfo(data) {
  return fetch(805253, {
    ...data,
    searchCode: getSearchCode()
  }, true);
}
export function checkHygzqd(searchCode) {
  return fetch(805259, {
    searchCode,
    isH5: '1'
  });
}
