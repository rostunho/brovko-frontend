const FORM_KEY = process.env.REACT_APP_BROVKO_FORM_KEY;

export const addProductRequestTemplate = () => {
  return {
    form: FORM_KEY,
    action: 'update',
    dontUpdateFields: [],
    product: [
      {
        id: '',
        name: '',
        nameForDocuments: '',
        costPerItem: '',
        sku: '',
        manufacturer: '',
        currency: '',
        discount: {
          value: '',
          date_start: '',
          date_end: '',
        },
        weight: '',
        volume: '',
        length: '',
        width: '',
        height: '',
        barcode: '',
        stockBalance: '',
        expenses: '',
        currencyExpenses: '',
        category: {
          id: '',
          name: '',
        },
        description: '',
        url: '',
        note: '',
        supplier: '',
        keywords: '',
        images: [
          {
            fullsize: '',
            thumbnail: '',
          },
          {
            fullsize: '',
            thumbnail: '',
          },
        ],
        params: [
          {
            name: '',
            type: '',
            value: '',
          },
          {
            name: '',
            type: '',
            value: '',
          },
        ],
        parentProductId: '',
        additionalPrices: [
          {
            priceType: '',
            priceValue: '',
            priceCurrency: '',
            priceDiscount: '',
          },
          {
            priceType: '',
            priceValue: '',
            priceCurrency: '',
            priceDiscount: '',
          },
        ],
        label: [],
      },
    ],
  };
};
