import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid, FlatList} from 'react-native';
import {PricingCard, ListItem} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import NavBar from '~/component/NavBar';
import {profit, withdraw, details} from '~/api/wallet';
import {parseTime} from '~/utils/parse';
import {realHeight} from '~/utils/height';

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: 0,
      showWithdraw: false,
      list: [],
      refreshing: false,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  onRefresh = async () => {
    this.getData();
  };

  getData = async () => {
    const res = await profit();
    this.setState({mount: res.data.mount});
    const listRes = await details({page: 1, limit: 10});
    this.setState({list: listRes.data.items});
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

  renderList() {
    const {list, refreshing} = this.state;
    return (
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item, index) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          this.onRefresh();
        }}
        renderItem={({item, index}) => (
          <ListItem
            leftIcon={{name: 'coin', type: 'material-community'}}
            chevron
            title={parseTime(item.recordTime, '{y}-{m}-{d} {h}:{m}')}
            rightTitle={
              (item.amount > 0 ? '+ ' : '- ') + Math.abs(item.amount) + ' 元'
            }
          />
        )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavNar()}
        {this.renderProfit()}
        {this.renderWithdraw()}
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: realHeight,
  },
  list: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e1e8ee',
  },
});
