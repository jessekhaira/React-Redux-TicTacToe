import React from 'react';
import {createStore} from 'redux';
import {Provider, } from 'react-redux';
import '../stylesheets/App.css';
import AppComponents from './AppComponents';

let reduxStore = createStore(() => "just placeholder reducer"); 

function App() {
  return (
    <Provider store = {reduxStore}>
      <AppComponents /> 
    </Provider>
  );
}

export default App;
