import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import NavBar from '../../component/NavBar';
import {getEquipmentListByUid} from '../../api/equipment';

class EquipmentListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const res = await getEquipmentListByUid();
    this.setState({list: res.data.items});
  }

  async onRefresh() {
    const res = await getEquipmentListByUid();
    this.setState({list: res.data.items});
  }

  render() {
    return (
      <View>
        <NavBar
          title="设备列表"
          leftIcon="arrow-back"
          leftPress={() => this.props.navigation.goBack()}
          rightIcon="add"
          rightPress={() => this.props.navigation.navigate('AddEquipment')}
        />
        <FlatList
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.onRefresh();
          }}
          renderItem={({item, index}) => (
            <ListItem
              title={item.name}
              subtitle={item.intro}
              key={index}
              leftIcon={{name: 'directions-car'}}
              bottomDivider
              chevron
              onPress={() => {
                this.props.navigation.navigate('EquipmentDetail', {
                  equipment: item,
                });
              }}
            />
          )}
        />
      </View>
    );
  }
}

export default EquipmentListScreen;
