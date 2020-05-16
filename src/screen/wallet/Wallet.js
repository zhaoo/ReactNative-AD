import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import NavBar from '~/component/NavBar';

const {height} = Dimensions.get('window');

export default class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  renderNavNar() {
    return (
      <NavBar
        title="我的钱包"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  render() {
    return <View style={styles.container}>{this.renderNavNar()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: height - 49,
  },
});
