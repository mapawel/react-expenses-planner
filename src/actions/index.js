import moment from 'moment';
import { dataShape } from 'assets/data/dataShape';
import { actions } from 'actions/actions';

export const setStartPayments = (paymentObject, index) => {
  const repeatNumer = paymentObject.cycle === '' ? 1 : paymentObject.repeatNumer * 1;
  const createDate = new Date().getTime() + index;
  const payload = [];
  for (let i = 1; i <= repeatNumer; i += 1) {
    payload.push({
      [dataShape.id]: i + new Date().getTime() + 500 * index,
      [dataShape.createDate]: createDate,
      [dataShape.category]: paymentObject.category,
      [dataShape.title]: paymentObject.title,
      [dataShape.ammount]: paymentObject.ammount * 1,
      [dataShape.paidAmmount]: paymentObject.paidAmmount * 1,
      [dataShape.closed]: paymentObject.closed,
      [dataShape.description]: paymentObject.description,
      [dataShape.infoWhenPay]: paymentObject.infoWhenPay,
      [dataShape.deadline]: new Date(moment(paymentObject.deadline).add(i - 1, paymentObject.cycle)).getTime(),
      [dataShape.cycle]: paymentObject.cycle,
      [dataShape.cycleElementNr]: i,
      [dataShape.repeatNumer]: repeatNumer,
    });
  }
  return {
    type: actions.ADD_PAYMENT,
    payload,
  };
};

export const addNewPayment = (newPaymentObject) => {
  const repeatNumer = newPaymentObject.cycle === '' ? 1 : newPaymentObject.repeatNumer * 1;
  const payload = [];
  const createDate = new Date().getTime();
  for (let i = 1; i <= repeatNumer; i += 1) {
    payload.push({
      [dataShape.id]: i + new Date().getTime(),
      [dataShape.createDate]: createDate,
      [dataShape.category]: newPaymentObject.category,
      [dataShape.title]: newPaymentObject.title,
      [dataShape.ammount]: newPaymentObject.ammount * 1,
      [dataShape.paidAmmount]: 0,
      [dataShape.closed]: false,
      [dataShape.description]: newPaymentObject.description,
      [dataShape.infoWhenPay]: '',
      [dataShape.deadline]: new Date(moment(newPaymentObject.deadline).add(i - 1, newPaymentObject.cycle)).getTime(),
      [dataShape.cycle]: newPaymentObject.cycle,
      [dataShape.cycleElementNr]: i,
      [dataShape.repeatNumer]: repeatNumer,
    });
  }
  return {
    type: actions.ADD_PAYMENT,
    payload,
  };
};

export const deletePayments = (id, isCycle) => {
  const type = isCycle ? actions.DELETE_CYCLE : actions.DELETE_PAYMENT;
  return {
    type,
    payload: id,
  };
};

export const payPayment = (id, { paidAmmount, infoWhenPay }) => ({
  type: actions.PAY_PAYMENT,
  payload: {
    id,
    [dataShape.paidAmmount]: paidAmmount * 1,
    infoWhenPay,
    [dataShape.createDate]: new Date().getTime(),
  },
});

export const editPayment = (updatedPaymentObject) => ({
  type: actions.EDIT_PAYMENT,
  payload: {
    ...updatedPaymentObject,
    [dataShape.ammount]: updatedPaymentObject[dataShape.ammount] * 1,
    [dataShape.deadline]: new Date(updatedPaymentObject[dataShape.deadline]).getTime(),
    [dataShape.repeatNumer]: updatedPaymentObject[dataShape.repeatNumer] * 1,
  },
});
