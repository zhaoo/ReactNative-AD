import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import Alipay from '@0x5e/react-native-alipay';
import QueryString from 'query-string';
import {sign} from '~/api/auth';

export default class AlipayAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAuth = async () => {
    try {
      // const signRes = await sign();
      // const signStr = signRes.data.sign;
      const signStr =
        'apiname=com.alipay.account.auth&app_id=2016101800712719&app_name=mc&auth_type=AUTHACCOUNT&biz_type=openservice&method=alipay.open.auth.sdk.code.get&pid=2088102180079633&product_id=APP_FAST_LOGIN&scope=kuaijie&sign_type=RSA&target_id=20170516113800037&sign=Ef1X6rBUhJ5GAEYs6I4Bms0l6yDadVjWDjPfbM3nzAT%2FbfRBxg13SioWy2njWZJ4kc2yAe20UYxY1UX1nlqsQAKC7grImv5xaHyhX17XzMQRjw%2BINQ9SzNPo7I3XTYyAGUE9q7gfq32bcDgGRbMVKhr1s3bjkKr%2BDfu%2Fo6fmM5%2FtJ3hozHP99j7H3vtLABDof8ZqMsdIOOHFvPIlF%2FhyjGWU68rprcRpWzdFOJbhXc39SYD7O7HBbEWo0XS05DFnMrO1mtMPMr777qa2IXCiw1PLs0K74yAeX2n6PupK8XTO5nA3UojNNMMvdpiLqzn09APpCO4%2BusiTmlYWbzFXCA%3D%3D';
      console.log('========>' + signStr);
      const res = await Alipay.authWithInfo(signStr);
      console.log('=========>' + res);
      let {result} = res;
      let {success, result_code, auth_code, user_id} = QueryString.parse(
        result,
      );
    } catch (error) {
      console.error(error);
    }
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

  renderForm() {
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
        {this.renderForm()}
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
