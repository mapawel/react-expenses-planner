import moment from 'moment';

export const updateDeadlineDates = (updatedArray) => ({
  type: 'UPDATE_DEADLINES',
  payload: updatedArray,
});

export const addNewPayment = (newPaymentObject) => {
  const repeatNumer = newPaymentObject.cycle === '' ? 1 : newPaymentObject.repeatNumer;
  const payload = [];
  const cycleId = new Date().getTime();
  for (let i = 0; i < repeatNumer; i += 1) {
    payload.push({
      id: i + new Date().getTime(),
      cycleId,
      category: newPaymentObject.category,
      title: newPaymentObject.title,
      ammount: newPaymentObject.ammount * 1,
      paidAmmount: 0,
      closed: false,
      description: newPaymentObject.description,
      deadline: new Date(moment(newPaymentObject.deadline).add(i, newPaymentObject.cycle)).getTime(),
      cycle: newPaymentObject.cycle,
      repeatNumer,
    });
  }
  return {
    type: 'ADD_PAYMENT',
    payload,
  };
};
