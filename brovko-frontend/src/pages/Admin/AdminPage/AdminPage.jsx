import { useParams } from 'react-router-dom';
import AddProductForm from 'components/Admin/AddProductForm/AddProductForm';
import SEO from 'components/SEO/SEO';

export default function AdminPage() {
  const { productId } = useParams();

  return (
    <>
      <SEO
        title="Профіль адміна | Brovko"
        description="Профіль адміна | Brovko - магазин корисних смаколиків для песиків"
        url="/admin/addProduct"
      />
      <AddProductForm update={productId ? true : false} />
    </>
  );
}
