import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import FavouritesProductsList from 'components/FavouritesProducts/FavouritesProductsList';
import SEO from 'components/SEO/SEO';

const ProductsFavouritePage = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>
        Обрані
      </Heading>
      <SEO
        title="Обрані | Brovko"
        description="Обрані товари. Улюблені смаколики від Бровка."
        url="/shop/favourites"
      />
      <FavouritesProductsList />
    </>
  );
};

export default ProductsFavouritePage;
