import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import NavBar from '~/component/NavBar';
import {getShuffingList} from '~/api/home';

const {width, height} = Dimensions.get('window');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffingList: [],
      activityList: [],
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavNar()}
        {this.renderShuffing()}
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
});
