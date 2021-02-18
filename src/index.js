/*!
=========================================================
* Copyright 2021 - Ruvie Eto (https://www.ruvieeto.com)
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
