import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {ListItem, Overlay, Text} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import Card from '~/component/Card';
import {parseTime} from '~/utils/parse';
import OrderBotton from './component/OrderButton';
import {getOrder} from '~/api/order';
import {realHeight} from '~/utils/height';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        valueList: [],
      },
      orderId: this.props.navigation.getParam('orderId'),
      showText: false,
    };
  }

  componentDidMount = () => {
    this.getOrder();
  };

  getOrder = async () => {
    const {orderId} = this.state;
    const res = await getOrder(orderId);
    this.setState({order: res.data.to});
  };

  renderNavBar() {
    return (
      <NavBar
        title="订单详情"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderOrderContent() {
    const {order, showText} = this.state;
    return (
      <View>
        <Card title="广告信息">
          <ListItem
            title="广告内容"
            bottomDivider
            rightTitle={order.valueList[0]}
            onPress={() => {
              this.setState({showText: !showText});
            }}
          />
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
        <Overlay
          isVisible={showText}
          onBackdropPress={() => {
            this.setState({showText: !showText});
          }}>
          {order.valueList.map(item => {
            return <Text>item</Text>;
          })}
        </Overlay>
      </View>
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
    const {order} = this.state;
    return (
      <View style={styles.bottom}>
        <OrderBotton
          orderStatus={order.orderStatus}
          navigation={this.props.navigation}
          orderId={order.id}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
