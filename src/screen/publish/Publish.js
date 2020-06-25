import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import {
  ListItem,
  CheckBox,
  Text,
  Icon,
  Overlay,
  Slider,
} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActionButton from 'react-native-action-button';
import NavBar from '~/component/NavBar';
import Panel from '~/component/Panel';
import Map from './component/Map';
import {parseTime} from '~/utils/parse';
import {createOrder, getPrice} from '~/api/order';
import moment from 'moment';
import Card from '~/component/Card';
import {windowHeight} from '~/utils/height';

const timeList = [
  ['00:00', '06:59'],
  ['07:00', '09:59'],
  ['10:00', '15:59'],
  ['16:00', '16:59'],
  ['17:00', '19:59'],
  ['20:00', '20:59'],
  ['21:00', '23:59'],
];

export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        valueList: [],
        startDate: new Date(),
        endDate: new Date(),
        startTime: moment()
          .startOf('day')
          .valueOf(),
        endTime:
          moment()
            .startOf('day')
            .valueOf() - 1,
        rate: 5,
        num: 100,
        price: 1,
        scope: 5,
        latitude: 30.2236,
        longitude: 120.0332,
        priceList: [],
      },
      address: '选择投放位置',
      showContent: false,
      showStartDatePicker: false,
      showEndDatePicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showNum: false,
      showMap: false,
      showPrice: false,
      showHelp: false,
    };
  }

  resetState = () => {
    this.setState({
      form: {
        valueList: [],
        startDate: new Date(),
        endDate: new Date(),
        startTime: moment()
          .startOf('day')
          .valueOf(),
        endTime:
          moment()
            .startOf('day')
            .valueOf() - 1,
        rate: 5,
        num: 100,
        scope: 5,
        latitude: 30.2236,
        longitude: 120.0332,
        priceList: [],
      },
      address: '选择投放位置',
      showContent: false,
      showStartDatePicker: false,
      showEndDatePicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showNum: false,
      showMap: false,
      showPrice: false,
      showHelp: false,
    });
    this.getPrice();
  };

  componentDidMount = () => {
    this.getPrice();
  };

  getPrice = async () => {
    const res = await getPrice();
    const maxPrice = Math.max.apply(null, res.data.revenue);
    this.setState({
      form: {
        ...this.state.form,
        priceList: res.data.revenue,
        price: maxPrice,
      },
    });
    //根据时间段拿钱
    // const nowHour = new Date().getHours();
    // let i = timeList.length - 1;
    // for (i; i >= 0; i--) {
    //   const hour = timeList[i][0].split(':')[0];
    //   if (nowHour > hour) {
    //     break;
    //   }
    // }
  };

  onSubmit = async () => {
    const {form} = this.state;
    if (form.valueList.length < 1) {
      ToastAndroid.show('请输入广告内容', ToastAndroid.SHORT);
      return;
    }
    form.startTime = moment(form.startTime).format();
    form.endTime = moment(form.endTime).format();
    form.startDate = moment(form.startDate).format();
    form.endDate = moment(form.endDate).format();
    const res = await createOrder(form);
    if (res.code === 20000) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      this.props.navigation.navigate('Pay', {
        orderId: res.data.id,
      });
      this.resetState();
    }
  };

  setAddress = address => {
    this.setState({address: address});
  };

  handleValueDelete = index => {
    let arr = this.state.form.valueList;
    arr.splice(index, 1);
    this.setState({
      form: {
        ...this.state.form,
        valueList: arr,
      },
    });
  };

  handleChangeMap = (latitude, longitude) => {
    const {form} = this.state;
    this.setState({form: {...form, latitude: latitude, longitude: longitude}});
  };

  renderValueList() {
    const {valueList} = this.state.form;
    return (
      <View>
        {valueList.map((item, index) => {
          return (
            <ListItem
              key={index}
              rightIcon={{
                name: 'delete',
                onPress: () => {
                  this.handleValueDelete(index);
                },
              }}
              title={item}
              bottomDivider
            />
          );
        })}
      </View>
    );
  }

  renderValueButton() {
    if (this.state.form.valueList.length < 4) {
      return (
        <CheckBox
          center
          title="添加内容"
          iconRight
          iconType="material"
          checkedIcon="add"
          uncheckedIcon="add"
          checkedColor="#333333"
          uncheckedColor="#333333"
          containerStyle={styles.checkBox}
          onPress={() => {
            this.setState({showContent: true});
          }}
        />
      );
    }
  }

  renderValueInput() {
    const {showContent, form} = this.state;
    return (
      <DialogInput
        isDialogVisible={showContent}
        title={'输入内容'}
        hintInput={'请输入广告内容'}
        cancelText="取消"
        submitText="确定"
        submitInput={text => {
          this.setState({
            form: {
              ...form,
              valueList: [...form.valueList, text],
            },
            showContent: false,
          });
        }}
        closeDialog={() => {
          this.setState({showContent: false});
        }}
      />
    );
  }

  renderTimeList() {
    const {startDate, endDate, startTime, endTime} = this.state.form;
    return (
      <View>
        <ListItem
          title="开始时间"
          leftIcon={{name: 'access-time'}}
          chevron
          bottomDivider
          rightTitle={parseTime(startDate, '{y}-{m}-{d}')}
          onPress={() => this.setState({showStartDatePicker: true})}
        />
        <ListItem
          title="结束时间"
          leftIcon={{name: 'access-time'}}
          chevron
          bottomDivider
          onPress={() => this.setState({showEndDatePicker: true})}
          rightTitle={parseTime(endDate, '{y}-{m}-{d}')}
        />
        <ListItem
          title="投放时段"
          chevron
          leftIcon={{name: 'list'}}
          rightElement={
            <View style={styles.timeContainer}>
              <Text
                style={styles.timeText}
                onPress={() => this.setState({showStartTimePicker: true})}>
                {parseTime(startTime, '{h}:{i}')}
              </Text>
              <Text style={styles.timeText}>至</Text>
              <Text
                style={styles.timeText}
                onPress={() => this.setState({showEndTimePicker: true})}>
                {parseTime(endTime, '{h}:{i}')}
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  renderTimePicker() {
    const {
      form,
      showStartDatePicker,
      showEndDatePicker,
      showStartTimePicker,
      showEndTimePicker,
    } = this.state;
    return (
      <View>
        {showStartDatePicker && (
          <DateTimePicker
            value={form.startDate}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={(event, date) => {
              if (date) {
                this.setState({
                  showStartDatePicker: false,
                  form: {...form, startDate: date},
                });
              }
            }}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            value={form.endDate}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={(event, date) => {
              if (date) {
                this.setState({
                  showEndDatePicker: false,
                  form: {...form, endDate: date},
                });
              }
            }}
          />
        )}
        {showStartTimePicker && (
          <DateTimePicker
            value={form.startTime}
            mode="time"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={(event, time) => {
              if (time) {
                this.setState({
                  showStartTimePicker: false,
                  form: {...form, startTime: time},
                });
              }
            }}
          />
        )}
        {showEndTimePicker && (
          <DateTimePicker
            value={form.endTime}
            mode="time"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={(event, time) => {
              if (time) {
                this.setState({
                  showEndTimePicker: false,
                  form: {...form, endTime: time},
                });
              }
            }}
          />
        )}
      </View>
    );
  }

  renderPlayList() {
    const {form} = this.state;
    const {num, rate} = this.state.form;
    return (
      <View>
        <ListItem
          title="播放总数"
          chevron
          bottomDivider
          leftIcon={{name: 'format-list-numbered'}}
          rightTitle={num.toString()}
          onPress={() => this.setState({showNum: true})}
        />
        <ListItem
          title="播放频率"
          chevron
          leftIcon={{name: 'equalizer'}}
          rightElement={
            <View style={styles.counterContainer}>
              <Icon
                name="remove"
                color="#888"
                onPress={() => {
                  this.setState({
                    form: {
                      ...form,
                      rate: rate - 1,
                    },
                  });
                }}
              />
              <Text style={styles.counterNum}>{rate.toString()}</Text>
              <Icon
                name="add"
                color="#888"
                onPress={() => {
                  this.setState({
                    form: {
                      ...form,
                      rate: rate + 1,
                    },
                  });
                }}
              />
            </View>
          }
        />
      </View>
    );
  }

  renderPlayInput() {
    const {showNum, form} = this.state;
    return (
      <DialogInput
        isDialogVisible={showNum}
        title={'输入总数'}
        hintInput={'请输入总数'}
        textInputProps={{keyboardType: 'numeric'}}
        cancelText="取消"
        submitText="确定"
        submitInput={num => {
          this.setState({
            form: {
              ...form,
              num: num,
            },
          });
          this.setState({showNum: false});
        }}
        closeDialog={() => {
          this.setState({showNum: false});
        }}
      />
    );
  }

  renderPrice() {
    const {price, num} = this.state.form;
    return (
      <View>
        <ListItem
          title="广告单价"
          leftIcon={{name: 'attach-money'}}
          chevron
          bottomDivider
          rightTitle={price + '元'}
          onPress={() => {
            this.setState({
              showPrice: true,
            });
          }}
        />
        <ListItem
          title="合计总价"
          leftIcon={{name: 'credit-card'}}
          chevron
          rightTitle={price * num + '元'}
        />
      </View>
    );
  }

  renderPriceOverlay() {
    const {showPrice} = this.state;
    const {priceList} = this.state.form;
    return (
      <Overlay
        isVisible={showPrice}
        onBackdropPress={() => this.setState({showPrice: false})}>
        <View>
          <Text style={styles.priceTitle}>价目表</Text>
          {priceList &&
            priceList.map((item, i) => (
              <ListItem
                title={timeList[i][0] + ' - ' + timeList[i][1]}
                rightTitle={'¥ ' + item}
                bottomDivider
              />
            ))}
        </View>
      </Overlay>
    );
  }

  renderMapList() {
    const {address} = this.state;
    return (
      <View>
        <ListItem
          title="投放位置"
          leftIcon={{name: 'add-location'}}
          chevron
          bottomDivider
          rightTitle={address}
          onPress={() => {
            this.setState({showMap: true});
          }}
        />
        <ListItem
          title="投放范围"
          leftIcon={{name: 'adjust'}}
          chevron
          rightElement={this.renderScopeSlider()}
        />
      </View>
    );
  }

  renderMapOverlay() {
    const {latitude, longitude, address} = this.state.form;
    const {showMap} = this.state;
    return (
      <Overlay
        isVisible={showMap}
        onBackdropPress={() => this.setState({showMap: false})}>
        <Map
          latitude={latitude}
          longitude={longitude}
          setAddress={this.setAddress.bind(this)}
          handleChangeMap={this.handleChangeMap.bind(this)}
        />
      </Overlay>
    );
  }

  renderScopeSlider() {
    const {form} = this.state;
    return (
      <View style={styles.scopeContainer}>
        <Text style={styles.scopeText}>{form.scope}km</Text>
        <Slider
          maximumValue={10}
          step={1}
          thumbTintColor="#2089dc"
          minimumTrackTintColor="#2089dc"
          style={styles.scope}
          onValueChange={value =>
            this.setState({
              form: {
                ...form,
                scope: value,
              },
            })
          }
          value={form.scope}
        />
      </View>
    );
  }

  renderSubmit() {
    return (
      <ActionButton
        buttonColor="#5091e3"
        renderIcon={() => {
          return <Icon name="done" color="#ffffff" />;
        }}
        onPress={() => {
          this.onSubmit();
        }}
      />
    );
  }

  renderHelp() {
    const {showHelp} = this.state;
    return (
      <Overlay
        isVisible={showHelp}
        onBackdropPress={() => this.setState({showHelp: false})}>
        <Card title="计费说明">
          <Text style={styles.helpText}>
            因发布广告和审核广告存在时差，请提前完成广告发布，支付时按投放区域和时段进行预收，投放完成按照实际投放进行计费，未用完费用将会退回至您的付款账户。
          </Text>
        </Card>
      </Overlay>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title="发布"
          rightIcon="help"
          rightPress={() => this.setState({showHelp: !this.state.showHelp})}
        />
        <ScrollView>
          <Panel>
            {this.renderValueList()}
            {this.renderValueButton()}
            {this.renderValueInput()}
          </Panel>
          <Panel>
            {this.renderTimeList()}
            {this.renderTimePicker()}
          </Panel>
          <Panel>
            {this.renderMapList()}
            {this.renderMapOverlay()}
          </Panel>
          <Panel>
            {this.renderPlayList()}
            {this.renderPlayInput()}
          </Panel>
          <Panel>
            {this.renderPrice()}
            {this.renderPriceOverlay()}
          </Panel>
        </ScrollView>
        {this.renderSubmit()}
        {this.renderHelp()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: windowHeight,
  },
  checkBox: {
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  counterNum: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    color: '#888',
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
  scope: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  scopeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scopeText: {
    fontSize: 16,
    marginRight: 5,
    color: '#888',
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  helpText: {
    marginTop: 5,
  },
});
