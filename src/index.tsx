import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor }  from '../src/store/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
       <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
