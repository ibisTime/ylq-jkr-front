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
  return fetch(805332, { reportCode });
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
 * @param {object} data
 */
export function setUserInfo(data) {
  return fetch(805253, {
    ...data,
    searchCode: getSearchCode()
  }, true);
}
/**
 * 身份证正反面认证
 * @param {string} identifyPic
 * @param {string} identifyPicReverse
 * @param {string} identifyPicHand
 * @param {string} searchCode
 */
export function checkSfz(identifyPic, identifyPicReverse, identifyPicHand, searchCode) {
  return fetch(805254, {
    identifyPic,
    identifyPicReverse,
    identifyPicHand,
    searchCode
  });
}
/**
 * 强制定位
 * @param {string} province
 * @param {string} city
 * @param {string} area
 * @param {string} address
 * @param {string} longitude
 * @param {string} latitude
 * @param {string} searchCode
 */
export function setUserPosition(province, city, area, address, longitude, latitude, searchCode) {
  return fetch(805255, {
    address,
    area,
    city,
    latitude,
    longitude,
    province,
    searchCode
  });
}
/**
 * 运营商认证
 * @param {string} searchCode
 * @param {string} taskId
 */
export function checkYYS(searchCode, taskId) {
  return fetch(805256, {
    taskId,
    searchCode
  });
}
/**
 * 行业关注清单认证
 * @param {string} searchCode
 */
export function checkHygzqd(searchCode) {
  return fetch(805259, {
    searchCode,
    isH5: '1'
  });
}
/**
 * 芝麻信用分认证
 * @param {string} searchCode
 */
export function checkZMF(searchCode) {
  return fetch(805258, {
    searchCode,
    isH5: 1
  });
}
/**
 * 欺诈三接口认证
 * @param {string} searchCode
 */
export function checkQZ(searchCode) {
  return fetch(805260, {
    searchCode,
    isH5: 1
  });
}
/**
 * 同盾认证
 * @param {string} searchCode
 */
export function checkTD(searchCode) {
  return fetch(805261, { searchCode });
}
/**
 * 获取报告详情（cfront判断）
 * @param {string} reportCode
 */
export function getSimpleReport (reportCode) {
  return fetch(805334, { reportCode });
}
