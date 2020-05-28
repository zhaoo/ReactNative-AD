import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import NavBar from '~/component/NavBar';
import {getActivityList} from '~/api/home';
import {parseHtml, parseTime} from '~/utils/parse';

const {height} = Dimensions.get('window');

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      refreshing: false,
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const activity = await getActivityList({page: 1, limit: 10});
    this.setState({activityList: activity.data.items});
  };

  onRefresh = async () => {
    const activity = await getActivityList({page: 1, limit: 10});
    this.setState({activityList: activity.data.items});
  };

  renderNavNar() {
    return (
      <NavBar
        title={'系统消息'}
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderActivityList() {
    const {activityList, refreshing} = this.state;
    return (
      <FlatList
        data={activityList}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          this.onRefresh();
        }}
        renderItem={({item, index}) => (
          <ListItem
            title={item.title}
            subtitle={parseHtml(item.content)}
            rightTitle={parseTime(item.publishTime, '{y}-{m}-{d}')}
            leftIcon={{name: 'flag'}}
            bottomDivider
            chevron
            onPress={() => {
              this.props.navigation.navigate('Activity', {
                activity: item,
              });
            }}
          />
        )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavNar()}
        {this.renderActivityList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: height - 49,
  },
});
