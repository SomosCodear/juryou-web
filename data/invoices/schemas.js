import * as yup from 'yup';

const emailSchema = yup.object().shape({
  sender: yup.string().email().required(),
  subject: yup.string().required(),
  body: yup.string().required(),
  attachmentName: yup.string().required(),
});
const customerSchema = yup.object().shape({
  identityDocument: yup.string().matches(/^\d+$/).required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
});
const itemSchema = yup.object().shape({
  name: yup.string().required(),
  amount: yup.number().integer().moreThan(0).required(),
  price: yup.string().matches(/^\d+\.?\d*$/).required(),
});
export const invoiceSchema = yup.object().shape({
  email: emailSchema.required(),
  customer: customerSchema.required(),
  items: yup.array().of(itemSchema).min(1).required(),
});
