import * as types from './mutation-types';

const mutations = {
  [types.SET_INVESTIGATION](state, investigation) {
    state.investigation = investigation;
  }
};

export default mutations;
