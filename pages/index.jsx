import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  Formik,
  Form,
  Field,
  FieldArray,
} from 'formik';
import { RESOURCES, create } from '~/api';
import { useLogin } from '~/hooks';
import { invoiceSchema } from '~/data/invoices/schemas';

const InvoiceForm = styled(Form)`
  label {
    display: inline-flex;
    align-items: center;
  }
`;

const Home = () => {
  useLogin();

  return (
    <Formik
      initialValues={{
        customer: {
          identityDocument: '',
          name: '',
          email: '',
        },
        email: {
          sender: '',
          subject: '',
          body: '',
          attachmentName: 'Factura.pdf',
        },
        items: [{ name: '', amount: '1', price: '' }],
      }}
      validationSchema={invoiceSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await create(RESOURCES.INVOICE, invoiceSchema.cast(values));
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <InvoiceForm>
          <fieldset>
            <legend>
              Email
            </legend>
            <label htmlFor="sender">
              Enviar desde:&nbsp;
              <Field id="sender" name="email.sender" type="email" />
            </label>
            <br />
            <br />
            <label htmlFor="subject">
              Asunto:&nbsp;
              <Field id="subject" name="email.subject" />
            </label>
            <br />
            <br />
            <label htmlFor="body">
              Mensaje:&nbsp;
              <Field id="body" name="email.body" as="textarea" rows={5} cols={50} />
            </label>
            <br />
            <br />
            <label htmlFor="attachmentName">
              Nombre para el adjunto:&nbsp;
              <Field id="attachmentName" name="email.attachmentName" />
            </label>
          </fieldset>
          <fieldset>
            <legend>
              Cliente
            </legend>
            <label htmlFor="identityDocument">
              DNI:&nbsp;
              <Field id="identityDocument" name="customer.identityDocument" />
            </label>
            <br />
            <br />
            <label htmlFor="name">
              Nombre:&nbsp;
              <Field id="name" name="customer.name" />
            </label>
            <br />
            <br />
            <label htmlFor="email">
              Email:&nbsp;
              <Field name="customer.email" type="email" />
            </label>
          </fieldset>
          <fieldset>
            <legend>
              Items
            </legend>
            <FieldArray name="items">
              {({ push, remove }) => (
                <>
                  {values.items.map((_, index) => (
                    <Fragment
                      key={index /* eslint-disable-line react/no-array-index-key */}
                    >
                      <div>
                        <label htmlFor={`itemName${index}`}>
                          Nombre:&nbsp;
                          <Field id={`itemName${index}`} name={`items.${index}.name`} />
                        </label>
                        &nbsp;&nbsp;
                        <label htmlFor={`itemAmount${index}`}>
                          Cantidad:&nbsp;
                          <Field
                            id={`itemAmount${index}`}
                            name={`items.${index}.amount`}
                            type="number"
                          />
                        </label>
                        &nbsp;&nbsp;
                        <label htmlFor={`itemPrice${index}`}>
                          Precio:&nbsp;
                          <Field id={`itemPrice${index}`} name={`items.${index}.price`} />
                        </label>
                        &nbsp;&nbsp;
                        <button type="button" onClick={() => remove(index)}>
                          Remover item
                        </button>
                      </div>
                      <br />
                    </Fragment>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: '', amount: '1', price: '' })}
                  >
                    Agregar item
                  </button>
                </>
              )}
            </FieldArray>
          </fieldset>
          <br />
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </InvoiceForm>
      )}
    </Formik>
  );
};

export default Home;
