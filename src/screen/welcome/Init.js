import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';

export default class Init extends Component {
  componentDidMount = () => {
    this.asyncJump();
  };

  asyncJump = async () => {
    const init = await AsyncStorage.getItem('init-screen');
    this.props.navigation.navigate(init === 'welcome' ? 'Welcome' : 'Guide');
    // AsyncStorage.removeItem('init-screen');
  };

  render() {
    return <View />;
  }
}
