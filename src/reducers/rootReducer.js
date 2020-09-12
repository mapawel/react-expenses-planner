import { actions } from 'actions/actions';

const initialState = {
  payments: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, ...payload],
      };
    case actions.DELETE_PAYMENT:
      return {
        ...state,
        payments: state.payments.filter((payment) => payment.id !== payload),
      };
    case actions.DELETE_CYCLE:
      return {
        ...state,
        payments: state.payments.filter((payment) => payment.createDate !== payload),
      };
    default:
      return state;
  }
};
export default rootReducer;
