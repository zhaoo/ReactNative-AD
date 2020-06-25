import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import Card from '~/component/Card';
import {getOrder, refundOrder} from '~/api/order';
import {realHeight} from '~/utils/height';

export default class Refund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      orderId: this.props.navigation.getParam('orderId'),
      reason: '',
    };
  }

  componentDidMount = () => {
    this.getOrder();
  };

  onRefund = async () => {
    const {orderId, reason, order} = this.state;
    const res = await refundOrder(orderId, {
      refundReason: reason,
      refundAmount: order.totalAmount,
      adOrderId: orderId,
    });
    if (res.code === 20000) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      this.props.navigation.navigate('Order', {orderId: orderId});
    }
  };

  getOrder = async () => {
    const {orderId} = this.state;
    const res = await getOrder(orderId);
    if (res.code === 20000 && res.data.to.orderStatus === 'success_payment') {
      this.setState({order: res.data.to});
    } else {
      ToastAndroid.show('订单异常', ToastAndroid.SHORT);
      this.props.navigation.navigate('My');
    }
  };

  renderNavBar() {
    return (
      <NavBar
        title="订单退款"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderReason() {
    return (
      <Card title="退款原因">
        <Input
          placeholder="请输入退款原因"
          onChangeText={text =>
            this.setState({
              reason: text,
            })
          }
        />
      </Card>
    );
  }

  renderBottom() {
    const {totalAmount} = this.state.order;
    return (
      <View style={styles.bottom}>
        <View style={styles.bottomText}>
          <Text style={styles.textTotal}>金额: </Text>
          <Text style={styles.textRmb}>¥</Text>
          <Text style={styles.textNum}>{totalAmount}</Text>
        </View>
        <Button
          title="立即退款"
          buttonStyle={styles.bottomBtn}
          onPress={() => {
            this.onRefund();
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>{this.renderReason()}</ScrollView>
        {this.renderBottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: realHeight,
  },
  bottom: {
    height: 50,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderTopColor: '#EEEEEE',
    borderTopWidth: 0.5,
  },
  bottomText: {
    width: Dimensions.get('window').width - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  textTotal: {
    fontSize: 16,
    marginRight: 4,
  },
  textRmb: {
    color: '#E6A23C',
    fontSize: 16,
  },
  textNum: {
    color: '#E6A23C',
    fontSize: 24,
  },
  bottomBtn: {
    borderRadius: 0,
    width: 100,
    height: 50,
    backgroundColor: '#E6A23C',
  },
});
