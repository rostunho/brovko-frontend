const FORM_KEY = process.env.REACT_APP_BROVKO_FORM_KEY;

export const removeProductRequestTemplate = {
  form: FORM_KEY,
  action: 'delete',
  product: [
    {
      id: '',
    },
  ],
};
