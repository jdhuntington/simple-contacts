import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { theReducer} from './reducer';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';

const store = createStore(theReducer)

const loadInitialStore = async () => {
  const result = await axios.get('/api/contacts');
  store.dispatch({ type: "initial", data: result.data })
}

loadInitialStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
