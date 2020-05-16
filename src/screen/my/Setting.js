import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import {fetchLogout} from '~/action';

export default class Setting extends Component {
  onLogout = () => {
    fetchLogout(this.props.navigation);
  };

  renderNavBar() {
    return (
      <NavBar
        title="设置"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderItem() {
    return (
      <View>
        <ListItem
          title={'关于软件'}
          leftIcon={{name: 'info'}}
          bottomDivider
          chevron
        />
        <Button
          title="退出登录"
          buttonStyle={styles.logoutBtn}
          onPress={() => this.onLogout()}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderNavBar()}
        {this.renderItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutBtn: {
    borderRadius: 0,
    backgroundColor: '#F56C6C',
    marginTop: 10,
  },
});
