import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store, persistor } from 'redux/store';
import reportWebVitals from './reportWebVitals';
import PopUp from 'shared/components/PopUp';
import WarningModal from 'shared/components/WarningModal/WarningModal';
import AuthLayout from 'components/AuthLayout/AuthLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthLayout>
          <BrowserRouter>
            <App />
            <PopUp />
            <WarningModal />
          </BrowserRouter>
        </AuthLayout>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
