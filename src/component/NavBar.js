import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {Header} from 'react-native-elements';

export default class NavBar extends Component {
  render() {
    const {title, leftIcon, rightIcon, leftPress, rightPress} = this.props;
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0)"
          translucent={true}
        />
        <Header
          leftComponent={{
            icon: leftIcon,
            onPress: leftPress,
            color: '#fff',
            underlayColor: 'rgba(0,0,0,0)',
          }}
          centerComponent={{text: title, style: {color: '#fff'}}}
          rightComponent={{
            icon: rightIcon,
            onPress: rightPress,
            color: '#fff',
            underlayColor: 'rgba(0,0,0,0)',
          }}
        />
      </View>
    );
  }
}
