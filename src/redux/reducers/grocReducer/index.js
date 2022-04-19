import {ACTIONS} from '../../action-types';

const initialState = {
  currList: null,
};

const grocReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GROCERY_LIST:
      return {
        ...state,
        currList: action.currList,
      };

    default:
      return state;
  }
};

export default grocReducer;
