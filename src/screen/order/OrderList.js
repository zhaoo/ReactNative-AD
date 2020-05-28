import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import {parseTime, parseOrderStatus} from '~/utils/parse';
import {getOrderList} from '~/api/order';

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.getList();
  }

  getList = async () => {
    const res = await getOrderList({page: 1, limit: 10});
    this.setState({list: res.data.items});
  };

  onRefresh = async () => {
    this.getList();
  };

  renderNavBar() {
    return (
      <NavBar
        title="我的订单"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
        rightIcon="add"
        rightPress={() => this.props.navigation.navigate('Publish')}
      />
    );
  }

  renderList() {
    const {list, refreshing} = this.state;
    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          this.onRefresh();
        }}
        renderItem={({item, index}) => (
          <ListItem
            leftIcon={{name: 'work'}}
            title={item.valueList[0]}
            subtitle={parseTime(item.createTime, '{y}-{m}-{d} {h}:{m}')}
            rightElement={
              <Badge
                value={parseOrderStatus(item.orderStatus).text}
                status={parseOrderStatus(item.orderStatus).status}
              />
            }
            chevron
            onPress={() => {
              this.props.navigation.navigate('Order', {
                orderId: item.id,
              });
            }}
          />
        )}
      />
    );
  }

  render() {
    return (
      <View>
        {this.renderNavBar()}
        {this.renderList()}
      </View>
    );
  }
}
