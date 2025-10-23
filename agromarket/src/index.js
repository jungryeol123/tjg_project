import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./app/store.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// store는 프로퍼티 이름 고정
  <Provider store={ store }>  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
