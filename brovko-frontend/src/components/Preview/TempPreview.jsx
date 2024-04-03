// ТИМЧАСОВИЙ КОМПОНЕНТ. ВИДАЛИТИ ПІЗНІШЕ

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Hero from 'components/Hero/Hero';
import ProductsList from 'components/Products/ProductsList';
import MobileMenu from 'components/MobileMenu/MobileMenu';

export default function TempPreview() {
  return (
    <div className="App">
      <Hero />
      <ProductsList />
    </div>
  );
}
