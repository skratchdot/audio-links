import * as types from '../constants/ActionTypes';

export default function (state = [], action) {
  let tags = [];
  switch (action.type) {
    case types.ADD_TAG:
      tags = state.slice(0);
      if (tags.indexOf() === -1) {
        tags.push(action.tag);
      }
      return tags;
    case types.DELETE_TAG:
      tags = [];
      state.forEach(function (tag) {
        if (tag !== action.tag) {
          tags.push(tag);
        }
      });
      return tags;
    case types.CLEAR_TAGS:
      return [];
    default:
      return state;
  }
}
