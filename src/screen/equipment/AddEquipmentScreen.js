import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import NavBar from '../../component/NavBar';
import {createEquipment} from '../../api/equipment';
import Panel from '../../component/Panel';

class AddEquipmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: {
        name: '',
        intro: '',
        key: '',
      },
    };
  }

  onSubmit() {
    createEquipment(this.state.equipment).then(res => {
      this.props.navigation.goBack();
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <View>
        <NavBar
          title="添加设备"
          leftIcon="arrow-back"
          leftPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.container}>
          <Panel style={styles.container}>
            <Input
              label="设备名称"
              placeholder="请输入设备名称"
              onChangeText={text =>
                this.setState({
                  equipment: {...this.state.equipment, name: text},
                })
              }
            />
            <Input
              label="设备简介"
              placeholder="请输入设备简介"
              onChangeText={text =>
                this.setState({
                  equipment: {...this.state.equipment, intro: text},
                })
              }
            />
            <Input
              label="设备编号"
              placeholder="请输入设备编号"
              onChangeText={text =>
                this.setState({equipment: {...this.state.equipment, key: text}})
              }
            />
          </Panel>
          <Panel>
            <Button
              title="提交"
              buttonStyle={styles.submitBtn}
              onPress={() => this.onSubmit()}
            />
          </Panel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  submitBtn: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 0,
  },
});

export default AddEquipmentScreen;
