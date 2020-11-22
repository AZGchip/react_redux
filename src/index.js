import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Searchbar from './components/Searchbar'
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";
import reducers from "./reducers/index";
import { Provider } from "react-redux"

//creates redux store with imported reducer function
const store = createStore(reducers)

ReactDOM.render(
  //provider allows all components inside of it to access the redux store
  <Provider store={store}>
    <React.StrictMode>
      <Searchbar />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
