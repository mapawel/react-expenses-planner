import * as Yup from 'yup';
import { dataShape } from 'assets/data/dataShape';

export const validatorSchemaAdd = Yup.object().shape({
  [dataShape.category]: Yup.string()
    .required('this field is required'),
  [dataShape.title]: Yup.string()
    .min(4, 'too short')
    .max(20, 'too long')
    .required('this field is required'),
  [dataShape.ammount]: Yup.number()
    .typeError('fill in with a number (ammount) and use DOT not comma')
    .positive('do not use negative values')
    .required('this field is required'),
  [dataShape.deadline]: Yup.date()
    .typeError('')
    .required('this field is required'),
  [dataShape.cycle]: Yup.string(),
  [dataShape.repeatNumer]: Yup.number()
    .when([dataShape.cycle], {
      is: (val) => [...dataShape.cycles.map((el) => el.cycleAddName)].includes(val),
      then: Yup.number()
        .typeError('fill in with a number (ammount) and use DOT not comma')
        .positive('do not use negative values')
        .integer('use "full" integers (not floats)')
        .required('this field is required'),
    }),
});

export const validatorSchemaProceed = Yup.object().shape({
  [dataShape.paidAmmount]: Yup.number()
    .typeError('fill in with a number (ammount) and use DOT not comma')
    .positive('do not use negative values')
    .required('this field is required'),
  [dataShape.infoWhenPay]: Yup.string()
    .max(30, 'too long'),
});
