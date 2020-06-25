import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {ListItem} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomAlertDialog from '~/component/CustomAlertDialog';
import NavBar from '~/component/NavBar';
import {update} from '~/api/user';
import {parseTime, parseGender} from '~/utils/parse';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadAvatar} from '../../api/user';
import {fetchUserInfo} from '~/action';

const genderType = ['male', 'female', 'unknown'];
const avatarType = ['相册', '拍照'];

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user'),
      showNickname: false,
      showBirthday: false,
      showGender: false,
      showAvatar: false,
    };
  }

  handleUpate = () => {
    const {user} = this.state;
    update(user).then(res => {
      if (res.code === 20000) {
        fetchUserInfo();
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    });
  };

  renderNavBar() {
    return (
      <NavBar
        title="编辑资料"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderListItem() {
    const {user, showGender, showNickname, showBirthday} = this.state;
    return (
      <View>
        <ListItem
          rightAvatar={{
            title: user.nickname,
            source: {
              uri: user.avatar,
            },
            size: 'small',
          }}
          title={'更换头像'}
          chevron
          bottomDivider
          onPress={() => {
            this.setState({showAvatar: !this.state.showAvatar});
          }}
        />
        <ListItem
          title={'更改昵称'}
          rightTitle={user.nickname}
          bottomDivider
          chevron
          onPress={() => {
            this.setState({showNickname: !showNickname});
          }}
        />
        <ListItem
          title={'更改性别'}
          rightTitle={parseGender(user.gender)}
          bottomDivider
          chevron
          onPress={() => {
            this.setState({showGender: !showGender});
          }}
        />
        <ListItem
          title={'更改生日'}
          rightTitle={parseTime(user.birthday, '{y}-{m}-{d}')}
          onPress={() => {
            this.setState({showBirthday: !showBirthday});
          }}
          bottomDivider
          chevron
        />
        <ListItem
          title={'绑定手机'}
          rightTitle={user.mobilePhone}
          bottomDivider
          chevron
        />
        <ListItem
          title={'修改密码'}
          bottomDivider
          chevron
          onPress={() => this.props.navigation.navigate('Password')}
        />
      </View>
    );
  }

  renderInputNickname() {
    const {showNickname, user} = this.state;
    return (
      <DialogInput
        isDialogVisible={showNickname}
        title={'更改昵称'}
        hintInput={'请输入用户昵称'}
        cancelText="取消"
        submitText="确定"
        submitInput={async text => {
          await this.setState({
            user: {
              ...user,
              nickname: text,
            },
          });
          this.setState({showNickname: false});
          await this.handleUpate();
        }}
        closeDialog={() => {
          this.setState({showNickname: false});
        }}
      />
    );
  }

  renderBirthday() {
    const {showBirthday, user} = this.state;
    if (showBirthday) {
      return (
        <DateTimePicker
          value={new Date(user.birthday)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={async (event, date) => {
            if (date) {
              await this.setState({
                showBirthday: false,
                user: {...user, birthday: date},
              });
              await this.handleUpate();
            }
          }}
        />
      );
    }
  }

  renderGender() {
    const {showGender, user} = this.state;
    return (
      <CustomAlertDialog
        entityList={genderType}
        parse={parseGender}
        callback={async i => {
          await this.setState({
            showBirthday: false,
            user: {...user, gender: genderType[i]},
          });
          await this.handleUpate();
        }}
        show={showGender}
        closeModal={show => {
          this.setState({
            showGender: show,
          });
        }}
      />
    );
  }

  renderAvatar() {
    const {showAvatar} = this.state;
    return (
      <CustomAlertDialog
        entityList={avatarType}
        callback={i => {
          this.setState({
            type: i,
            typeName: avatarType[i],
          });
          switch (i) {
            case 0:
              this.album();
              break;
            case 1:
              this.camera();
              break;
            default:
              break;
          }
        }}
        show={showAvatar}
        closeModal={show => {
          this.setState({
            showAvatar: show,
          });
        }}
      />
    );
  }

  album() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      uploadAvatar(image).then(res => {
        if (res.code === 20000) {
          fetchUserInfo();
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      });
    });
  }

  camera() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      uploadAvatar(image).then(res => {
        if (res.code === 20000) {
          fetchUserInfo();
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      });
    });
  }

  render() {
    return (
      <View>
        {this.renderNavBar()}
        {this.renderListItem()}
        {this.renderInputNickname()}
        {this.renderBirthday()}
        {this.renderGender()}
        {this.renderAvatar()}
      </View>
    );
  }
}
