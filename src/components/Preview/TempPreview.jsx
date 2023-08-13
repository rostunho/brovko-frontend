// ТИМЧАСОВИЙ КОМПОНЕНТ. ВИДАЛИТИ ПІЗНІШЕ

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import ProductsList from 'components/Products/ProductsList';

export default function TempPreview() {
  return (
    <div className="App">
      {/* <Header /> */}
      <ProductsList />
      <Footer />
    </div>
  );
}
