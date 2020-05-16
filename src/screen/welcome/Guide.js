import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, AsyncStorage} from 'react-native';
import {Image} from 'react-native-elements';
import Slider from 'react-native-app-intro-slider';
import {getGuideList} from '~/api/welcome';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount = () => {
    this.getGuide();
  };

  getGuide = async () => {
    const res = await getGuideList();
    this.setState({list: res.data.items});
  };

  onDone = () => {
    AsyncStorage.setItem('init-screen', 'welcome');
    this.props.navigation.navigate('Main');
  };

  renderItem({item}) {
    return (
      <View>
        <Image
          style={styles.image}
          source={{
            uri: item.value,
          }}
        />
      </View>
    );
  }

  render() {
    const {list} = this.state;
    return (
      <Slider
        renderItem={this.renderItem}
        slides={list}
        nextLabel="下一页"
        doneLabel="进入"
        bottomButton={true}
        onDone={this.onDone}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
