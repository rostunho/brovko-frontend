import { addProductRequestTemplate } from 'components/AddProductForm/addProductRequestTemplate';

export const addProductReducer = (state, action) => {
  const { type, payload } = action;
  const newState = { ...state };

  switch (type) {
    case 'ADD_NAME':
      newState.product[0].name = payload;
      return newState;

    case 'ADD_NAME_FOR_DOCS':
      newState.product[0].nameForDocuments = payload;
      return newState;

    case 'ADD_CATEGORY':
      newState.product[0].category = {
        // ...newState.product[0].category,
        ...payload,
      };

      return newState;

    case 'ADD_PRICE':
      newState.product[0].costPerItem = payload;
      return newState;

    case 'ADD_EXPENSES':
      newState.product[0].expenses = payload;
      return newState;

    case 'ADD_DISCOUNT_VALUE':
      newState.product[0].discount.value = payload;
      return newState;

    case 'ADD_DISCOUNT_START':
      newState.product[0].discount.date_start = payload;
      return newState;

    case 'ADD_DISCOUNT_END':
      newState.product[0].discount.date_end = payload;
      return newState;

    case 'ADD_SUPPLIER':
      newState.product[0].supplier = payload;
      return newState;

    case 'ADD_MANUFACTURER':
      newState.product[0].manufacturer = payload;
      return newState;

    case 'ADD_SKU':
      newState.product[0].sku = payload;
      return newState;

    case 'ADD_WEIGHT':
      newState.product[0].weight = payload;
      return newState;

    case 'ADD_BARCODE':
      newState.product[0].barcode = payload;
      return newState;

    case 'ADD_HEIGHT':
      newState.product[0].height = payload;
      return newState;

    case 'ADD_LENGTH':
      newState.product[0]['length'] = payload;
      return newState;

    case 'ADD_WIDTH':
      newState.product[0].width = payload;
      return newState;

    case 'ADD_ID':
      newState.product[0].id = payload;
      return newState;

    case 'ADD_URL':
      newState.product[0].url = payload;
      return newState;

    case 'ADD_NOTE':
      newState.product[0].note = payload;
      return newState;

    case 'ADD_KEYWORDS':
      newState.product[0].keywords = payload;
      return newState;

    case 'ADD_PARAMS':
      newState.product[0].params = payload;
      return newState;

    case 'ADD_DESCRIPTION':
      newState.product[0].description = payload;
      return newState;

    case 'ADD_SAVED_PRODUCT':
      newState.product[0].id = payload.id;
      newState.product[0].id = payload.id;
      newState.product[0].costPerItem = payload.price.toString();
      newState.product[0].currency = payload.currencyId;
      newState.product[0].category.id = payload.categoryId;
      newState.product[0].description = payload.description;
      newState.product[0].name = payload.name;
      newState.product[0].url = payload.url;
      newState.product[0].images = [...payload.picture];
      newState.product[0].manufacturer = payload.vendor;
      newState.product[0].barcode = payload.barcode;
      newState.product[0].keywords = payload.keywords;
      newState.product[0].note = payload.note;
      return newState;

    case 'ADD_SAVED_CATEGORY':
      newState.product[0].category = payload;

      return newState;

    case 'CLEAR_FORM':
      return { ...addProductRequestTemplate() };

    default:
      return state;
  }
};
