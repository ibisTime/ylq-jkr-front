import * as types from './mutation-types';
import {saveSearch, clearSearch, deleteSearch} from 'common/js/cache';

// 保存历史搜索
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};

// 删除历史搜索
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
};

// 历史搜索
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch());
};
