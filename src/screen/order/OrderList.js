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
      page: 1,
      limit: 15,
    };
  }

  async componentDidMount() {
    this.getList();
  }

  getList = async () => {
    const {page, limit} = this.state;
    const res = await getOrderList({page: page, limit: limit});
    if (res.code === 20000) {
      this.setState({list: res.data.items});
    }
  };

  onRefresh = async () => {
    this.getList();
  };

  onEndReached = async () => {
    const {page, limit, list} = this.state;
    await this.setState({page: page + 1});
    const res = await getOrderList({page: page, limit: limit});
    if (res.code === 20000) {
      this.setState({list: list.concat(res.data.items)});
    }
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
        onEndReached={() => {
          this.onEndReached();
        }}
        onEndReachedThreshold={1}
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
