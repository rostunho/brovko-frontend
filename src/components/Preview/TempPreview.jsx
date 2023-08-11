// ТИМЧАСОВИЙ КОМПОНЕНТ. ВИДАЛИТИ ПІЗНІШЕ

import logo from '../../logo.png';
import Footer from 'components/Footer/Footer';
import ProductsList from 'components/Products/ProductsList';

export default function TempPreview() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>A journey of a thousand miles begins with a single step.</p>
      </header>
      <ProductsList />

      <Footer />
    </div>
  );
}
