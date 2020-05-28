import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import NavBar from '~/component/NavBar';
import {getShuffingList} from '~/api/home';

const {width, height} = Dimensions.get('window');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffingList: [],
      refreshing: false,
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const res = await getShuffingList();
    this.setState({shuffingList: res.data.items});
  };

  renderNavNar() {
    return <NavBar title="首页" />;
  }

  renderShuffing() {
    const {shuffingList} = this.state;
    return (
      <View style={styles.wrapper}>
        <Swiper autoplay loop height={(width * 9) / 16}>
          {shuffingList.length > 0 &&
            shuffingList.map(item => {
              return (
                <Image
                  source={{uri: item.value}}
                  style={styles.image}
                  key={item.id}
                />
              );
            })}
        </Swiper>
      </View>
    );
  }

  renderMenu() {
    return (
      <View style={styles.menuContainer}>
        <View style={styles.menuRow}>
          <View style={styles.menuItem}>
            <Icon
              reverse
              name="send"
              color="#E6A23C"
              onPress={() => {
                this.props.navigation.navigate('Publish');
              }}
            />
            <Text>广告发布</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon
              reverse
              name="card-travel"
              color="#409EFF"
              onPress={() => {
                this.props.navigation.navigate('OrderList');
              }}
            />
            <Text>我的订单</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon
              reverse
              name="directions-car"
              color="#F56C6C"
              onPress={() => {
                this.props.navigation.navigate('EquipmentList');
              }}
            />
            <Text>我的设备</Text>
          </View>
        </View>
        <View style={styles.menuRow}>
          <View style={styles.menuItem}>
            <Icon
              reverse
              name="credit-card"
              color="#67C23A"
              onPress={() => {
                this.props.navigation.navigate('Wallet');
              }}
            />
            <Text>我的钱包</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon
              reverse
              name="pie-chart"
              color="#ff8c31"
              onPress={() => {
                this.props.navigation.navigate('PlanList');
              }}
            />
            <Text>广告统计</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon
              reverse
              name="message"
              color="#517fa4"
              onPress={() => {
                this.props.navigation.navigate('Message');
              }}
            />
            <Text>系统消息</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavNar()}
        {this.renderShuffing()}
        {this.renderMenu()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: (width * 9) / 16,
  },
  image: {
    width: width,
    height: (width * 9) / 16,
  },
  container: {
    backgroundColor: '#f0f3f6',
    height: height - 49,
  },
  menuContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
});
