const initialState = {
  payments: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_DEADLINES':
      return {
        ...state,
        payments: payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
