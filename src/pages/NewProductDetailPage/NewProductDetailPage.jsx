import { useParams } from 'react-router-dom';
import { getProductById } from 'shared/services/api';

import Heading from 'shared/components/Heading';

export default function NewProductDetailPage() {
  const { productId } = useParams();

  console.log('productId :>> ', productId);
  return (
    <>
      <Heading withGoBack>Тут буде продукд з дуже довгою назвою</Heading>
    </>
  );
}
