import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Presenter from './Presenter';
import reportWebVitals from './reportWebVitals';
import {BirthsOnThisDayRepositoryImpl} from './repository/births-on-this-day.repository';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Presenter repository={new BirthsOnThisDayRepositoryImpl()}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
