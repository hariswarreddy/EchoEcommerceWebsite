import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store.jsx";
import {Toaster} from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <Provider store={store}>
    <Toaster position="bottom-center" />
  <StrictMode>
  <App />
</StrictMode>
  </Provider>
    </HelmetProvider>
);
