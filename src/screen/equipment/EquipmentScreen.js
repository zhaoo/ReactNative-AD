import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback} from 'react-native';
import NavBar from '../../component/NavBar';
import {windowHeight} from '~/utils/height';

class EquipmentScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar title="设备" />
        <View style={styles.cardContainer}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.navigate('EquipmentList')}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={[styles.card, styles.list]}>
              <Text style={styles.text}>设备列表</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.navigate('BindEquipment')}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={[styles.card, styles.publish]}>
              <Text style={styles.text}>绑定设备</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  card: {
    height: 150,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#409EFF',
  },
  publish: {
    backgroundColor: '#F56C6C',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default EquipmentScreen;
