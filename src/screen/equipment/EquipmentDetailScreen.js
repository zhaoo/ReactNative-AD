import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import NavBar from '../../component/NavBar';
import {Avatar, ListItem, Text} from 'react-native-elements';
import {parseTime, parseEquipment} from '../../utils/parse';

class EquipmentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: this.props.navigation.getParam('equipment'),
    };
  }

  render() {
    return (
      <View>
        <NavBar
          title="设备详情"
          leftIcon="arrow-back"
          leftPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.base}>
          <Avatar rounded icon={{name: 'devices'}} size="large" />
          <Text style={styles.name}>{this.state.equipment.name}</Text>
          <Text style={styles.key}>Key: {this.state.equipment.key}</Text>
        </View>
        <View style={styles.detail}>
          <ListItem
            title={'设备简介'}
            bottomDivider
            topDivider
            chevron
            rightTitle={this.state.equipment.intro.substr(0, 5) + '...'}
            onPress={() =>
              Alert.alert('设备简介', this.state.equipment.intro, [
                {text: '确定'},
              ])
            }
          />
          <ListItem
            title={'设备位置'}
            bottomDivider
            chevron
            rightTitle={
              this.state.equipment.latitude.toFixed(2) +
              ', ' +
              this.state.equipment.longitude.toFixed(2)
            }
          />
          <ListItem
            title={'开启时间'}
            bottomDivider
            chevron
            rightTitle={
              this.state.equipment.startTime
                ? parseTime(this.state.equipment.startTime, '{y}-{m}-{d}')
                : ''
            }
          />
          <ListItem
            title={'关闭时间'}
            bottomDivider
            chevron
            rightTitle={
              this.state.equipment.endTime
                ? parseTime(this.state.equipment.endTime, '{y}-{m}-{d}')
                : ''
            }
          />
          <ListItem
            title={'运行状态'}
            bottomDivider
            chevron
            rightTitleStyle={
              this.state.equipment.status
                ? {color: '#59c518'}
                : {color: '#e91512'}
            }
            rightTitle={this.state.equipment.status ? '运行中' : '已停止'}
          />
          <ListItem
            title={'审核状态'}
            bottomDivider
            chevron
            rightTitle={parseEquipment(this.state.equipment.verify)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    marginTop: 30,
  },
  name: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  key: {
    marginTop: 4,
    fontSize: 16,
    color: '#333',
  },
  detail: {
    marginTop: 30,
  },
});

export default EquipmentDetailScreen;
