const FORM_KEY = process.env.REACT_APP_BROVKO_FORM_KEY;

export const addCategoryRequestTemplate = {
  form: FORM_KEY,
  action: 'update',
  category: [
    {
      id: '',
      name: '',
      parentId: '',
    },
  ],
};
