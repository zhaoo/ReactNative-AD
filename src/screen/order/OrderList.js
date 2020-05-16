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
    };
  }

  async componentDidMount() {
    this.getList();
  }

  getList = async () => {
    const res = await getOrderList();
    this.setState({list: res.data.items});
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
    const {list} = this.state;
    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <ListItem
            title={''}
            leftIcon={{name: 'work'}}
            title={item.valueList.length > 0 ? item.valueList[0] : '无内容'} //最后删除判断
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
