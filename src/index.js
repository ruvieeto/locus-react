/*!
* Copyright 2020 - Ruvie Eto
=========================================================
* UI Kit: Argon Dashboard PRO React - v1.1.0
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
=========================================================
*/
import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById("root")
);
