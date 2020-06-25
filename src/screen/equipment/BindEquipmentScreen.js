import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import NavBar from '../../component/NavBar';
import Panel from '../../component/Panel';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ListItem, Button, Overlay, CheckBox} from 'react-native-elements';
import {parseTime} from '../../utils/parse';
import {MapView, Geolocation} from 'react-native-baidu-map';
import {Overlay as MapOverlay} from 'react-native-baidu-map';
const {Marker} = MapOverlay;
import {getEquipmentListByUid} from '../../api/equipment';
import {bindEquipment} from '../../api/equipment';
import {windowHeight} from '~/utils/height';

class BindEquipmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bind: {
        startDate: new Date(),
        endDate: new Date(),
        latitude: null,
        longitude: null,
        list: [],
      },
      map: {
        zoom: 18,
        trafficEnabled: true,
      },
      center: {
        latitude: 30.2236,
        longitude: 120.0332,
      },
      list: [],
      showStartDatePicker: false,
      showEndDatePicker: false,
      showEquipment: false,
    };
  }

  async componentDidMount() {
    const res = await getEquipmentListByUid();
    this.setState({list: res.data.items});
  }

  async onSubmit() {
    const res = await bindEquipment(this.state.bind);
    ToastAndroid.show(res.message, ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title="绑定设备"
          leftIcon="arrow-back"
          leftPress={() => this.props.navigation.goBack()}
        />
        <Panel>
          <MapView
            zoom={this.state.map.zoom}
            trafficEnabled={this.state.map.trafficEnabled}
            center={this.state.center}
            style={styles.map}
            onMapLoaded={() => {
              Geolocation.getCurrentPosition().then(res => {
                this.setState({
                  center: {
                    latitude: res.latitude,
                    longitude: res.longitude,
                  },
                  bind: {
                    ...this.state.bind,
                    latitude: res.latitude,
                    longitude: res.longitude,
                  },
                });
              });
            }}>
            <Marker location={this.state.center} />
          </MapView>
        </Panel>
        <Panel>
          <ListItem
            title="开始时间"
            leftIcon={{name: 'access-time'}}
            chevron
            bottomDivider
            rightTitle={parseTime(this.state.bind.startDate, '{y}-{m}-{d}')}
            onPress={() => this.setState({showStartDatePicker: true})}
          />
          <ListItem
            title="结束时间"
            leftIcon={{name: 'access-time'}}
            chevron
            bottomDivider
            onPress={() => this.setState({showEndDatePicker: true})}
            rightTitle={parseTime(this.state.bind.endDate, '{y}-{m}-{d}')}
          />
          {this.state.showStartDatePicker && (
            <DateTimePicker
              value={this.state.bind.startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                if (date) {
                  this.setState({
                    showStartDatePicker: false,
                    bind: {...this.state.bind, startDate: date},
                  });
                }
              }}
            />
          )}
          {this.state.showEndDatePicker && (
            <DateTimePicker
              value={this.state.bind.endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                if (date) {
                  this.setState({
                    showEndDatePicker: false,
                    bind: {...this.state.bind, endDate: date},
                  });
                }
              }}
            />
          )}
        </Panel>
        <Panel>
          <ListItem
            title="绑定设备"
            leftIcon={{name: 'attachment'}}
            chevron
            rightTitle={'已选择 ' + this.state.bind.list.length + ' 项'}
            onPress={() => this.setState({showEquipment: true})}
          />
          <Overlay
            isVisible={this.state.showEquipment}
            onBackdropPress={() => this.setState({showEquipment: false})}>
            <FlatList
              data={this.state.list}
              renderItem={({item, index}) => (
                <CheckBox
                  key={index}
                  title={item.name}
                  containerStyle={styles.checkBox}
                  onPress={() => {
                    const key = this.state.bind.list.indexOf(item);
                    if (key > -1) {
                      let arr = this.state.bind.list;
                      arr.splice(key, 1);
                      this.setState({
                        bind: {
                          ...this.state.bind,
                          list: arr,
                        },
                      });
                    } else {
                      this.setState({
                        bind: {
                          ...this.state.bind,
                          list: [...this.state.bind.list, item],
                        },
                      });
                    }
                  }}
                  checked={this.state.bind.list.indexOf(item) > -1}
                />
              )}
            />
          </Overlay>
        </Panel>
        <Button
          title="提交"
          buttonStyle={styles.submitBtn}
          onPress={() => {
            this.onSubmit();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: windowHeight,
  },
  map: {
    width: '100%',
    height: 200,
  },
  submitBtn: {
    borderRadius: 0,
  },
  checkBox: {
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default BindEquipmentScreen;
