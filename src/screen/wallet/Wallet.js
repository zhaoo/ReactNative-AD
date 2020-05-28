import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import {PricingCard} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import NavBar from '~/component/NavBar';
import {profit, withdraw} from '~/api/wallet';

const {height} = Dimensions.get('window');

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: 0,
      showWithdraw: false,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const res = await profit();
    this.setState({mount: res.data.mount});
  };

  onWithdraw = async mount => {
    const res = await withdraw({mount: mount});
    ToastAndroid.show(res.message, ToastAndroid.SHORT);
    if (res.code === 20000) {
      this.getData();
    }
  };

  renderNavNar() {
    return (
      <NavBar
        title="我的钱包"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderProfit() {
    const {mount} = this.state;
    return (
      <View>
        <PricingCard
          color="#4f9deb"
          title="累积收益"
          titleStyle={{fontSize: 25}}
          price={'¥' + mount}
          button={{title: '提现'}}
          onButtonPress={() => {
            this.setState({showWithdraw: true});
          }}
        />
      </View>
    );
  }

  renderWithdraw() {
    const {showWithdraw} = this.state;
    return (
      <DialogInput
        isDialogVisible={showWithdraw}
        title={'提现金额'}
        hintInput={'请输入提现金额'}
        textInputProps={{keyboardType: 'numeric'}}
        cancelText="取消"
        submitText="确定"
        submitInput={num => {
          this.onWithdraw(num);
          this.setState({showWithdraw: false});
        }}
        closeDialog={() => {
          this.setState({showWithdraw: false});
        }}
      />
    );
  }

  renderCharts() {
    return <View />;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavNar()}
        {this.renderProfit()}
        {this.renderWithdraw()}
        {this.renderCharts()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: height,
  },
});
