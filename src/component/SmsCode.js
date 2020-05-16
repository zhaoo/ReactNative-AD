import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import {sendSmsCode} from '~/api/user';

export default class SmsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btn: {
        text: '发送验证码',
        disabled: false,
      },
    };
  }

  componentWillUnmount = () => {
    this.timer && clearTimeout(this.timer);
  };

  setTimer = () => {
    let second = 60;
    this.timer = setInterval(() => {
      second -= 1;
      if (second > 0) {
        this.setState({btn: {text: second + '秒', disabled: true}});
      } else {
        this.setState({btn: {text: '发送验证码', disabled: false}});
        clearInterval(this.timer);
      }
    }, 1000);
  };

  sendSms = async () => {
    const {mobilePhone} = this.props;
    const res = await sendSmsCode({mobilePhone: mobilePhone});
    if (res.code === 20000) {
      this.setTimer();
      ToastAndroid.show('发送成功', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('发送失败', ToastAndroid.SHORT);
    }
  };

  render = () => {
    const {btn} = this.state;
    return (
      <View>
        <Button
          title={btn.text}
          disabled={btn.disabled}
          buttonStyle={{borderRadius: 0}}
          onPress={() => {
            this.sendSms();
          }}
        />
      </View>
    );
  };
}
