import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Searchbar from './components/Searchbar'
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";

import { Provider } from "react-redux"

//store

// action
// function saveSearch(search) {
//   return {
//     type: "SAVE_HISTORY",
//     search,
//   }
// }
//reducer
// const history = (state = [], action) => {
//   return state + 1;
// }
const store = createStore(() => ({
  searchHistory: [
    {
      name: 'robin',
      views: 1
    }
  ]
}));
// store.subscribe(() => console.log(store.getState()))
//dispatch
// store.dispatch(saveSearch("foo"))
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Searchbar />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
