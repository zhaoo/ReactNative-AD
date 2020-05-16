import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import {getWelcome} from '~/api/welcome';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeImage: {},
    };
  }

  componentDidMount = () => {
    this.getWelcome();
  };

  componentWillUnmount = () => {
    this.timer && clearTimeout(this.timer);
  };

  getWelcome = async () => {
    const res = await getWelcome();
    this.setState({welcomeImage: res.data});
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 1000);
  };

  renderImage = () => {
    const {welcomeImage} = this.state;
    return (
      <Image
        style={styles.image}
        source={{
          uri: welcomeImage.value,
        }}>
        <Text style={styles.text}>欢迎</Text>
      </Image>
    );
  };

  render() {
    return <View>{this.renderImage()}</View>;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
