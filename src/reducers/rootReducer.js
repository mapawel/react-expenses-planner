/* eslint-disable no-case-declarations */
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
    case actions.PAY_PAYMENT:
      return {
        ...state,
        payments: state.payments.map((payment) => (payment.id === payload.id ? {
          ...payment, paidAmmount: payload.paidAmmount, infoWhenPay: payload.infoWhenPay, createDate: payload.createDate, closed: true,
        } : payment)),
      };
    case actions.EDIT_PAYMENT:
      return {
        ...state,
        payments: state.payments.map((payment) => (payment.id === payload.id
          ? Object.assign(payment, payload)
          : payment)),
      };
    default:
      return state;
  }
};
export default rootReducer;
