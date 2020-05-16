import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import {updatePassword} from '~/api/user';
import {fetchLogout} from '~/action';

export default class PasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        oldPwd: '',
        newPwd: '',
        againPwd: '',
      },
    };
  }

  onSubmit = async () => {
    const {form} = this.state;
    if (form.newPwd !== form.againPwd) {
      Alert.alert('提示', '两次输入的密码不同，请重新输入。', [{text: '确定'}]);
      return;
    }
    const res = updatePassword(form);
    if (res.code === 20000) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      fetchLogout(this.props.navigation);
    }
  };

  renderNavBar() {
    return (
      <NavBar
        title="修改密码"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderForm() {
    const {form} = this.state;
    return (
      <View>
        <Input
          placeholder="旧密码"
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({
              form: {...form, oldPwd: text},
            })
          }
        />
        <Input
          placeholder="新密码"
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({
              form: {...form, newPwd: text},
            })
          }
        />
        <Input
          placeholder="再次输入"
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({
              form: {...form, againPwd: text},
            })
          }
        />
        <Button
          title="提交"
          buttonStyle={styles.submitBtn}
          onPress={() => this.onSubmit()}
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
  submitBtn: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 0,
  },
});
