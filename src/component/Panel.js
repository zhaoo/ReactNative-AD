import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Panel extends Component {
  render() {
    const {children} = this.props;
    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});
