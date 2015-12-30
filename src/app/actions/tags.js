import * as types from '../constants/ActionTypes';

export function clearTags() {
  return {
    type: types.CLEAR_TAGS
  };
}

export function addTag(tag) {
  return {
    type: types.ADD_TAG,
    tag: tag
  };
}

export function deleteTag(tag) {
  return {
    type: types.DELETE_TAG,
    tag: tag
  };
}
