import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import SmsCode from '~/component/SmsCode';
import {fetchLogin} from '~/action';

export default class SmsLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        mobilePhone: '',
        code: '',
      },
    };
  }

  onLogin = () => {
    const {form} = this.state;
    fetchLogin(form, this.props.navigation);
  };

  renderNavBar() {
    return (
      <NavBar
        title="手机登录"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderForm() {
    const {form} = this.state;
    return (
      <View style={styles.loginForm}>
        <Input
          placeholder="手机号"
          leftIcon={{name: 'phone-iphone', color: 'gray', size: 22}}
          textInputProps={{keyboardType: 'numeric'}}
          rightIcon={<SmsCode mobilePhone={form.mobilePhone} />}
          onChangeText={text =>
            this.setState({
              form: {...form, mobilePhone: text},
            })
          }
        />
        <Input
          placeholder="验证码"
          leftIcon={{name: 'phonelink-lock', color: 'gray', size: 22}}
          textInputProps={{keyboardType: 'numeric'}}
          onChangeText={text =>
            this.setState({
              form: {...form, code: text},
            })
          }
        />
        <Button
          title="登录"
          buttonStyle={styles.loginBtn}
          onPress={() => this.onLogin()}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderNavBar()}
        {this.renderForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginForm: {
    marginTop: 100,
    justifyContent: 'center',
  },
  loginBtn: {
    marginTop: 20,
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 5,
  },
});
