import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {Text, Button, ListItem} from 'react-native-elements';
import Alipay from '@0x5e/react-native-alipay';
import NavBar from '~/component/NavBar';
import Card from '~/component/Card';
import {parseTime} from '~/utils/parse';
import {getOrder, payNotify} from '~/api/order';
import {realHeight} from '~/utils/height';

export default class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      orderId: this.props.navigation.getParam('orderId'),
    };
  }

  componentDidMount = () => {
    this.getOrder();
  };

  getOrder = async () => {
    const {orderId} = this.state;
    const res = await getOrder(orderId);
    if (res.code === 20000 && res.data.to.orderStatus === 'waiting_payment') {
      this.setState({order: res.data.to});
    } else {
      ToastAndroid.show('订单异常', ToastAndroid.SHORT);
      this.props.navigation.navigate('My');
    }
  };

  onPay = async () => {
    const {orderId} = this.state;
    const signRes = await payNotify(orderId);
    const {sign} = signRes.data;
    if (sign) {
      Alipay.setAlipaySandbox(true);
      const payRes = await Alipay.pay(sign);
      ToastAndroid.show(payRes.memo, ToastAndroid.SHORT);
      this.props.navigation.navigate('Order', {orderId: orderId});
    }
  };

  renderNavBar() {
    return (
      <NavBar
        title="订单支付"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderOrderContent() {
    const {order} = this.state;
    return (
      <Card title="广告信息">
        <ListItem
          title="广告单价"
          bottomDivider
          rightTitle={'¥ ' + order.price}
        />
        <ListItem
          title="广告数量"
          bottomDivider
          rightTitle={order.num + ' 条'}
        />
        <ListItem title="播放频率" rightTitle={order.rate + ' 分钟/条'} />
      </Card>
    );
  }

  renderOrderExtra() {
    const {order} = this.state;
    return (
      <Card title="订单信息">
        <ListItem title="订单编号" bottomDivider rightTitle={order.tradeOut} />
        <ListItem
          title="创建时间"
          rightTitle={parseTime(order.createTime, '{y}-{m}-{d} {h}:{m}')}
        />
      </Card>
    );
  }

  renderBottom() {
    const {num, price} = this.state.order;
    return (
      <View style={styles.bottom}>
        <View style={styles.bottomText}>
          <Text style={styles.textTotal}>合计: </Text>
          <Text style={styles.textRmb}>¥</Text>
          <Text style={styles.textNum}>{num * price}</Text>
        </View>
        <Button
          title="立即支付"
          buttonStyle={styles.bottomBtn}
          onPress={() => {
            this.onPay();
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {this.renderOrderContent()}
          {this.renderOrderExtra()}
        </ScrollView>
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
    color: '#E5511D',
    fontSize: 16,
  },
  textNum: {
    color: '#E5511D',
    fontSize: 24,
  },
  bottomBtn: {
    borderRadius: 0,
    width: 100,
    height: 50,
    backgroundColor: '#E5511D',
  },
});
