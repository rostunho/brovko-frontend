// ТИМЧАСОВИЙ КОМПОНЕНТ. ВИДАЛИТИ ПІЗНІШЕ


import Button from 'shared/components/Button/Button';
import Input from 'shared/components/Input/Input';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import logo from '../../logo.png';


import ProductsList from 'components/Products/ProductsList';


export default function TempPreview() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>A journey of a thousand miles begins with a single step.</p>
      </header>
      <ProductsList />


      <Header />

      <Footer />
    </div>
  );
}
