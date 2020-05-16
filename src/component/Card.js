import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Card extends Component {
  render() {
    const {children, title} = this.props;
    return (
      <View style={styles.container}>
        {title && (
          <View style={styles.titleContainer}>
            <View style={styles.titleBlock} />
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    margin: 10,
    marginBottom: 0,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    marginLeft: 4,
  },
  titleBlock: {
    width: 4,
    height: 14,
    backgroundColor: '#5091e3',
  },
});
