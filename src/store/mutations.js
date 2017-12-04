import * as types from './mutation-types';
import User from 'common/bean/user';

const mutations = {
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history;
  },
  [types.SET_USER_STATE](state, user) {
    state.user = new User(user);
  },
  [types.SET_USER_MOBILE](state, mobile) {
    let user = state.user || new User();
    user.mobile = mobile;
    state.user = user;
  },
  [types.SET_USER_AVATAR](state, avatar) {
    let user = state.user || new User();
    user.setAvatar(avatar);
    state.user = user;
  },
  [types.SET_CNY_ACCOUNT](state, account) {
    state.cnyAccount = account;
  },
  [types.SET_JF_ACCOUNT](state, account) {
    state.jfAccount = account;
  }
};

export default mutations;
