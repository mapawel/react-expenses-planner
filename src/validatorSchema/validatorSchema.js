import * as Yup from 'yup';

export const validatorSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'too short')
    .max(50, 'too long')
    .required('this field is required'),
  content: Yup.string()
    .min(2, 'too short')
    .max(200, 'too long')
    .required('this field is required'),
});
