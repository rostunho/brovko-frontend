import { useParams } from 'react-router-dom';
import AddProductForm from 'components/Admin/AddProductForm/AddProductForm';

export default function AdminPage() {
  const { productId } = useParams();

  return (
    <>
      <AddProductForm update={productId ? true : false} />
    </>
  );
}
