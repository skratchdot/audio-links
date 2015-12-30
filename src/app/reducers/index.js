import { combineReducers } from 'redux';
import filterText from './filterText';
import tags from './tags';

const rootReducer = combineReducers({
  filterText,
  tags
});

export default rootReducer;
