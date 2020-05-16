import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import Init from '~/screen/welcome/Init';
import Welcome from '~/screen/welcome/Welcome';
import Guide from '~/screen/welcome/Guide';
import Login from '~/screen/login/Login';
import Register from '~/screen/login/Register';
import SmsLogin from '~/screen/login/SmsLogin';
import Home from '~/screen/home/Home';
import Activity from '~/screen/home/Activity';
import My from '~/screen/my/My';
import Setting from '~/screen/my/Setting';
import Profile from '~/screen/profile/Profile';
import Password from '~/screen/profile/Password';
import Publish from '~/screen/publish/Publish';
import Order from '~/screen/order/Order';
import Pay from '~/screen/order/Pay';
import OrderList from '~/screen/order/OrderList';
import Refune from '~/screen/order/Refund';
import Authentication from '~/screen/my/Authentication';
import Message from '~/screen/message/Message';
import Wallet from '~/screen/wallet/Wallet';
import AlipayAuth from '~/screen/my/AlipayAuth';

import EquipmentScreen from './screen/equipment/EquipmentScreen';
import AddEquipmentScreen from './screen/equipment/AddEquipmentScreen';
import EquipmentDetailScreen from './screen/equipment/EquipmentDetailScreen';
import EquipmentListScreen from './screen/equipment/EquipmentListScreen';
import BindEquipmentScreen from './screen/equipment/BindEquipmentScreen';

const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="home" size={20} color={tintColor} />
      ),
    },
  },
  Equipment: {
    screen: EquipmentScreen,
    navigationOptions: {
      tabBarLabel: '设备',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="devices" size={20} color={tintColor} />
      ),
    },
  },
  Publish: {
    screen: Publish,
    navigationOptions: {
      tabBarLabel: '发布',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="add-circle" size={20} color={tintColor} />
      ),
    },
  },
  Message: {
    screen: Message,
    navigationOptions: {
      tabBarLabel: '消息',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="message" size={20} color={tintColor} />
      ),
    },
  },
  My: {
    screen: My,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="person" size={20} color={tintColor} />
      ),
    },
  },
});

const StackNavigator = createStackNavigator(
  {
    Main: BottomTabNavigator,
    Welcome: Welcome,
    Guide: Guide,
    Login: Login,
    Register: Register,
    SmsLogin: SmsLogin,
    Activity: Activity,
    Setting: Setting,
    Profile: Profile,
    Password: Password,
    Order: Order,
    Pay: Pay,
    OrderList: OrderList,
    Refund: Refune,
    Authentication: Authentication,
    Wallet: Wallet,
    AlipayAuth: AlipayAuth,

    AddEquipment: AddEquipmentScreen,
    EquipmentDetail: EquipmentDetailScreen,
    EquipmentList: EquipmentListScreen,
    BindEquipment: BindEquipmentScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator({
    Init: StackNavigator,
    Main: StackNavigator,
  }),
);
