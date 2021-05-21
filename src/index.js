import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './auditorias/App';
import * as serviceWorker from './serviceWorker';
import {Suspense} from 'react'

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import { FirebaseAppProvider } from 'reactfire'
import firebaseConfig from './firebaseConfig'
import 'firebase/firestore'

React.icons = icons

ReactDOM.render(
  <Suspense fallback={'Loading announcement...'}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <App/>
      </Provider>
    </FirebaseAppProvider>
  </Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
