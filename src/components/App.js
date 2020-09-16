import React from 'react';
import {createStore} from 'redux';
import {Provider, } from 'react-redux';
import '../stylesheets/App.css';
import {AppComponents} from './AppComponents';
import {rootReducer} from '../reducers/rootReducer';

let reduxStore = createStore(rootReducer);

function App() {
  return (
    <Provider store = {reduxStore}>
      <AppComponents /> 
    </Provider>
  );
}

export default App;
