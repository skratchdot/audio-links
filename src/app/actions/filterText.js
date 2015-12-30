import * as types from '../constants/ActionTypes';

export function setFilterText(filterText) {
  return {
    type: types.SET_FILTER_TEXT,
    filterText: filterText
  };
}
