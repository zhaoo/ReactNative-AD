import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import NavBar from '~/component/NavBar';
import {parseTime} from '~/utils/parse';

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.navigation.getParam('activity'),
    };
  }

  renderNavBar() {
    return (
      <NavBar
        title={this.state.activity.title}
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderActivity() {
    const {activity} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.info}>
          时间: {parseTime(activity.publishTime, '{y}-{m}-{d}')}
          　作者: {activity.admin}
        </Text>
        <HTMLView style={styles.content} value={activity.content} />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderNavBar()}
        {this.renderActivity()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  info: {
    marginTop: 5,
    color: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
  },
});
