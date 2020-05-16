import React, {Component} from 'react';
import {View, Alert, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import {deleteOrder} from '~/api/order';

export default class OrderButton extends Component {
  render() {
    const {orderStatus, navigation, orderId} = this.props;
    return (
      <View style={{flexDirection: 'row'}}>
        {orderStatus === 'success_payment' && (
          <Button
            title="请求退款"
            buttonStyle={{
              borderRadius: 0,
              width: 100,
              height: 35,
              backgroundColor: '#E6A23C',
              marginRight: 7.5,
            }}
            onPress={() => {
              navigation.navigate('Refund', {orderId: orderId});
            }}
          />
        )}
        {(orderStatus === 'cancel' ||
          orderStatus === 'refunded' ||
          orderStatus === 'execution_completed') && (
          <Button
            title="删除订单"
            buttonStyle={{
              borderRadius: 0,
              width: 100,
              height: 35,
              backgroundColor: '#F56C6C',
              marginRight: 7.5,
            }}
            onPress={() => {
              Alert.alert(
                '删除订单',
                '是否删除该订单？',
                [
                  {text: '取消', style: 'cancel'},
                  {
                    text: '删除',
                    onPress: async () => {
                      const res = await deleteOrder(orderId);
                      ToastAndroid.show(res.message, ToastAndroid.SHORT);
                      if (res.code === 20000) {
                        navigation.navigate('OrderList');
                      }
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        )}
        {orderStatus === 'waiting_payment' && (
          <Button
            title="前往支付"
            buttonStyle={{
              borderRadius: 0,
              width: 100,
              height: 35,
              backgroundColor: '#E5511D',
              marginRight: 7.5,
            }}
            onPress={() => {
              navigation.navigate('Pay', {orderId: orderId});
            }}
          />
        )}
      </View>
    );
  }
}
