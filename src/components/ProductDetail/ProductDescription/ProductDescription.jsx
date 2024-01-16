import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import useNavigationLogic from '../useNavigationLogiс';
import DescriptionText from './DescriptionText';
import ReadMoreBackButton from '../ReadMoreBackButton';

export default function ProductDescription(isExpandedDescriptionFromLocation) {
  const initialState = 'isExpandedDescription';
  const navigateTo = `.`;

  const backLinkHref = useNavigationLogic(initialState, navigateTo);

  const { productId } = useParams();
  const allProducts = useSelector(getAllProducts);
  const product = allProducts?.find(p => p._id === productId);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>Опис</h3>
      <DescriptionText
        product={product}
        isExpandedDescription={isExpandedDescriptionFromLocation}
      />
      <ReadMoreBackButton to={backLinkHref} label="Назад" />
    </div>
  );
}
