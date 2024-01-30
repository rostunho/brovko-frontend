import React from 'react';

import Heading from 'shared/components/Heading';
import FavouritesProductsList from 'components/FavouritesProducts/FavouritesProductsList/FavouritesProductsList';

const ProductsFavouritePage = () => {
  return (
    <>
      <Heading withGoBack>Обрані</Heading>
      <FavouritesProductsList />
    </>
  );
};

export default ProductsFavouritePage;
