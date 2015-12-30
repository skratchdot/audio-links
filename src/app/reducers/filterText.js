import * as types from '../constants/ActionTypes';

export default function (state = '', action) {
  switch (action.type) {
    case types.SET_FILTER_TEXT:
      return action.filterText;
    default:
      return state;
  }
}
