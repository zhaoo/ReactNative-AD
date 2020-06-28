import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {Geolocation} from 'react-native-baidu-map';
import {getOrderList} from '~/api/order';
import NavBar from '~/component/NavBar';
import {realHeight} from '~/utils/height';

export default class PlanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const res = await getOrderList({page: 1, limit: 10});
    this.setState({list: res.data.items});
  };

  onRefresh = async () => {
    this.getData();
  };

  renderNavBar() {
    return (
      <NavBar
        title="广告统计"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderList() {
    const {list, refreshing} = this.state;
    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          this.onRefresh();
        }}
        style={styles.listContainer}
        renderItem={({item, index}) => (
          <View>
            <View>
              {item.valueList.length > 0 && (
                <Text style={styles.valueText}>{item.valueList.join(' ')}</Text>
              )}
            </View>
            <Text style={styles.timeText}>
              时间段：{item.startDate} ~ {item.endDate} ({item.startTime} ~{' '}
              {item.endTime})
            </Text>
            {/* <Text style={styles.userText}>投放人：{item.uid}</Text>
            <Text style={styles.localText}>投放位置：{item.uid}</Text> */}
            <Divider style={styles.divider} />
          </View>
        )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
  },
  container: {
    height: realHeight,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    marginTop: 5,
  },
  userText: {
    marginTop: 5,
  },
  localText: {
    marginTop: 5,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
});
