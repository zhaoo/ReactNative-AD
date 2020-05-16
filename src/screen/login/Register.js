import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import {register} from '~/api/user';
import SmsCode from '~/component/SmsCode';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
        mobilePhone: '',
        code: '',
      },
    };
  }

  onRegister = async () => {
    const {form} = this.state;
    const res = await register(form);
    if (res.code === 20000) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      this.props.navigation.navigate('Login');
    }
  };

  renderNavBar() {
    return (
      <NavBar
        title="注册"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderForm() {
    const {form} = this.state;
    return (
      <View style={styles.registerForm}>
        <Input
          placeholder="用户名"
          leftIcon={{name: 'person', color: 'gray', size: 22}}
          onChangeText={text =>
            this.setState({
              form: {...form, username: text},
            })
          }
        />
        <Input
          placeholder="密码"
          leftIcon={{name: 'lock', color: 'gray', size: 22}}
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({
              form: {...form, password: text},
            })
          }
        />
        <Input
          placeholder="手机号"
          leftIcon={{name: 'phone-iphone', color: 'gray', size: 22}}
          textInputProps={{keyboardType: 'numeric'}}
          rightIcon={<SmsCode />}
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
          title="注册"
          buttonStyle={styles.registerBtn}
          onPress={() => this.onRegister()}
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
  registerForm: {
    marginTop: 100,
    justifyContent: 'center',
  },
  registerBtn: {
    marginTop: 20,
    borderRadius: 0,
  },
});

export default RegisterScreen;
