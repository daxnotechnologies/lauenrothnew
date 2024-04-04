import ReactDOM from 'react-dom/client';
import React, { Suspense } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'htmlTag', 'cookie', 'sessionStorage', 'cookie', 'subdomain'],
      caches: ['localStorage'],
    },
    backend: { loadPath: '/assets/locales/{{lng}}/translation.json' },
  });

// ----------------------------------------------------------------------

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={loadingMarkup}>
    <App />
  </Suspense>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
