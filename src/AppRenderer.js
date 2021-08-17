import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
//Alerts for errors or success messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
import Hook from "./layout/useEffectHook";

const App = React.lazy(() => import(/* webpackChunkName: "App" */ "./App"));

ReactDOM.render(
  <Provider store={store}>
    <Hook />
    <Suspense fallback={<div className="loading" />}>
    <ToastContainer />
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
