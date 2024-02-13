import React from 'react';
import { useLocation } from "react-router-dom";
import Heading from 'shared/components/Heading';
import FavouritesProductsList from 'components/FavouritesProducts/FavouritesProductsList/FavouritesProductsList';

const ProductsFavouritePage = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>Обрані</Heading>
      <FavouritesProductsList />
    </>
  );
};

export default ProductsFavouritePage;
