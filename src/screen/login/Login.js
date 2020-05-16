import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import {fetchLogin} from '~/action';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
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
        title="登录"
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
        <Button
          title="登录"
          buttonStyle={styles.loginBtn}
          onPress={() => this.onLogin()}
        />
      </View>
    );
  }

  renderBtn() {
    return (
      <View>
        <View style={styles.socialLogin}>
          <Icon
            name="phone-iphone"
            raised={true}
            color="#F56C6C"
            onPress={() => this.props.navigation.navigate('SmsLogin')}
          />
          <Icon
            name="person-add"
            raised={true}
            color="#409EFF"
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderNavBar()}
        {this.renderForm()}
        {this.renderBtn()}
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
  socialLogin: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
