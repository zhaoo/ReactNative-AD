import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, ToastAndroid, Alert} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import Alipay from '@0x5e/react-native-alipay';
import {alipayAuth, authInfo} from '~/api/user';
import {parseTime} from '~/utils/parse';

export default class AlipayAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        alipayId: undefined,
        status: false,
        bindTime: undefined,
      },
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const res = await authInfo();
    if (res.code === 20000) {
      this.setState({info: res.data});
    }
  };

  onAuth = () => {
    Alert.alert(
      '绑定支付宝',
      '您需要支付一分钱以验证支付宝账户',
      [
        {
          text: '取消',
          onPress: () => ToastAndroid.show('用户取消绑定', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: async () => {
            const signRes = await alipayAuth();
            const {sign} = signRes.data;
            if (sign) {
              Alipay.setAlipaySandbox(true);
              const payRes = await Alipay.pay(sign);
              ToastAndroid.show(payRes.memo, ToastAndroid.SHORT);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  renderNavBar() {
    return (
      <NavBar
        title="绑定支付宝"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderInfo() {
    const {info} = this.state;
    return (
      <View>
        <ListItem
          title={'绑定状态'}
          leftIcon={{name: 'check-circle'}}
          rightTitle={info.status ? '已绑定' : '未绑定'}
          bottomDivider
          chevron
        />
        <ListItem
          title={'支付宝ID'}
          leftIcon={{name: 'fingerprint'}}
          rightTitle={info.alipayId}
          bottomDivider
          chevron
        />
        <ListItem
          title={'绑定时间'}
          leftIcon={{name: 'access-time'}}
          rightTitle={parseTime(info.bindTime, '{y}-{m}-{d}')}
          bottomDivider
          chevron
        />
      </View>
    );
  }

  renderButton() {
    return (
      <View>
        <Button
          icon={{
            name: 'link',
            size: 20,
            color: 'white',
          }}
          title="绑定支付宝"
          buttonStyle={styles.btn}
          onPress={() => this.onAuth()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderInfo()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: Dimensions.get('window').height,
  },
  btn: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 0,
  },
});
