import {loadSearch} from 'common/js/cache';

const state = {
  searchHistory: loadSearch(),
  user: null,
  cnyAccount: null,
  jfAccount: null
};

export default state;
