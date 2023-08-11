// ТИМЧАСОВИЙ КОМПОНЕНТ. ВИДАЛИТИ ПІЗНІШЕ

import Button from 'shared/components/Button/Button';
import Input from 'shared/components/Input/Input';

import logo from '../../logo.png';

export default function TempPreview() {
  return (
    <div className="App">
      <header className="App-header" style={{ padding: '0 15px' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>A journey of a thousand miles begins with a single step.</p>
        <Button mode="outlined">Зберегти</Button>
        <Input id="Input1" name="Test10" label="Test Input" />
      </header>
    </div>
  );
}
