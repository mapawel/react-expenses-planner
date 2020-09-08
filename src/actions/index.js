export const updateDeadlineDates = (updatedArray) => ({
  type: 'UPDATE_DEADLINES',
  payload: updatedArray,
});

export const addNewPayment = (newPaymentObject) => ({
  type: 'ADD_PAYMENT',
  payload: {
    id: new Date().getTime(),
    category: newPaymentObject.category,
    title: newPaymentObject.title,
    ammount: newPaymentObject.ammount * 1,
    paidAmmount: 0,
    closed: false,
    description: newPaymentObject.description,
    deadline: newPaymentObject.deadline.getTime(),
    cycle: newPaymentObject.cycle,
  },
});
