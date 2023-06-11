export const createAsyncReducer = stateName => {
  return {
    pending: state => {
      const newState = { ...state };
      newState.status = 'loading';
      newState[stateName] = null;
      return newState;
    },
    fulfilled: (state, action) => {
      const newState = { ...state };
      newState.status = 'loaded';
      newState[stateName] = action.payload;
      return newState;
    },
    rejected: state => {
      const newState = { ...state };
      newState.status = 'error';
      newState[stateName] = null;
      return newState;
    },
    pendingNoState: state => {
      const newState = { ...state };
      newState.status = 'loading';
      return newState;
    },
    fulfilledNoState: state => {
      const newState = { ...state };
      newState.status = 'loaded';
      return newState;
    },
  };
};
