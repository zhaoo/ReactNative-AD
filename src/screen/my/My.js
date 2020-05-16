import React, {Component} from 'react';
import {View} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import NavBar from '~/component/NavBar';
import {parseRole, parseUser} from '~/utils/parse';
import {getOrderList} from '~/api/order';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      orderTotal: 0,
    };
  }

  UNSAFE_componentWillReceiveProps = async nextProps => {
    if (nextProps.token) {
      const list = await getOrderList();
      this.setState({
        orderTotal: list.data.total,
      });
    } else {
      this.setState({orderTotal: 0});
    }
  };

  renderUserInfo = () => {
    const {token, user} = this.props;
    if (user) {
      return (
        <ListItem
          leftAvatar={{
            title: user.nickname,
            source: {
              uri: user.avatar,
            },
            showEditButton: true,
            size: 'medium',
          }}
          title={user.nickname}
          subtitle={user.mobilePhone}
          chevron
          bottomDivider
          rightElement={
            <Badge value={parseRole(user.roles)} status="success" />
          }
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              user: user,
              token: token,
            })
          }
        />
      );
    } else {
      return (
        <ListItem
          leftAvatar={{
            size: 'medium',
            icon: {name: 'person'},
          }}
          title={'登录用户'}
          chevron
          bottomDivider
          onPress={() => this.props.navigation.navigate('Login')}
        />
      );
    }
  };

  renderListItem = () => {
    const {user} = this.props;
    return (
      <View>
        <ListItem
          title={'我的订单'}
          leftIcon={{name: 'card-travel'}}
          badge={{value: this.state.orderTotal, status: 'error'}}
          bottomDivider
          chevron
          onPress={() => {
            this.props.navigation.navigate('OrderList');
          }}
        />
        <ListItem
          title={'我的钱包'}
          leftIcon={{name: 'credit-card'}}
          bottomDivider
          chevron
          onPress={() => {
            this.props.navigation.navigate('Wallet');
          }}
        />
        <ListItem
          title={'实名认证'}
          leftIcon={{name: 'verified-user'}}
          rightTitle={parseUser(user.status)}
          bottomDivider
          chevron
          onPress={() =>
            this.props.navigation.navigate('Authentication', {
              realname: user.realname,
              idCard: user.idCard,
              status: user.status,
            })
          }
        />
        <ListItem
          title={'绑定支付'}
          leftIcon={{name: 'alipay-square', type: 'antdesign'}}
          rightTitle={'已绑定'}
          bottomDivider
          chevron
          onPress={() => this.props.navigation.navigate('AlipayAuth')}
        />
        <ListItem
          title={'系统设置'}
          leftIcon={{name: 'build'}}
          bottomDivider
          chevron
          onPress={() => this.props.navigation.navigate('Setting')}
        />
      </View>
    );
  };

  render = () => {
    return (
      <View>
        <NavBar title="我的" />
        {this.renderUserInfo()}
        {this.renderListItem()}
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(My);
