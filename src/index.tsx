import React, {useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Presenter from './Presenter';
import reportWebVitals from './reportWebVitals';
import {BirthsOnThisDayRepositoryImpl} from './repository/births-on-this-day.repository';
import {initialState, reducer} from './state/reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Wrapper() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Presenter state={state} dispatch={dispatch} repository={new BirthsOnThisDayRepositoryImpl()}/>
  );
}

root.render(
  <React.StrictMode>
    <Wrapper/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
