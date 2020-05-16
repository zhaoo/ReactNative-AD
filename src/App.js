import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '~/store';
import Navigator from '~/Navigator';

export default class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  };
}
