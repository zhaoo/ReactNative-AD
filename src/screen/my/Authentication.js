import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {Text, Divider, ListItem, Button} from 'react-native-elements';
import {authentication, uploadCardImage} from '~/api/user';
import NavBar from '~/component/NavBar';
import DialogInput from 'react-native-dialog-input';
import {parseUser} from '~/utils/parse';
import ImagePicker from 'react-native-image-crop-picker';
import CustomAlertDialog from '~/component/CustomAlertDialog';
import {realHeight} from '~/utils/height';

const photoType = ['相册', '拍照'];

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      form: {
        realname: navigation.getParam('realname'),
        idCard: navigation.getParam('idCard'),
        status: navigation.getParam('status'),
        idCardPreImg: '',
      },
      showRealname: false,
      showIdCard: false,
      showPhoto: false,
    };
  }

  onSubmit = async () => {
    const {form} = this.state;
    const res = await authentication(form);
    if (res.code === 20000) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      this.props.navigation.goBack();
    }
  };

  album() {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      uploadCardImage(image).then(res => {
        if (res.code === 20000) {
          this.setState({
            form: {...this.state.form, idCardPreImg: res.data.relativeAddress},
          });
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      });
    });
  }

  camera() {
    ImagePicker.openCamera({
      width: 800,
      height: 600,
      cropping: true,
    }).then(image => {
      uploadCardImage(image).then(res => {
        if (res.code === 20000) {
          this.setState({
            form: {...this.state.form, idCardPreImg: res.data.relativeAddress},
          });
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      });
    });
  }

  renderNavBar() {
    return (
      <NavBar
        title="实名认证"
        leftIcon="arrow-back"
        leftPress={() => this.props.navigation.goBack()}
      />
    );
  }

  renderCard() {
    const {form} = this.state;
    return (
      <View>
        <View style={statusCard(form.status)}>
          <View style={styles.textContainer}>
            <Text style={(styles.textColor, styles.textStatus)}>
              {parseUser(form.status)}
            </Text>
            <Text style={styles.textColor}>完善身份信息，享受更全面服务</Text>
          </View>
          <View>
            <Divider style={{backgroundColor: '#ffffff'}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={(styles.textColor, styles.textName)}>
              {form.realname}
            </Text>
            <Text style={styles.textColor}>{form.idCard}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderForm() {
    const {form} = this.state;
    return (
      <View>
        <ListItem
          title={'真实姓名'}
          rightTitle={form.realname}
          leftIcon={{name: 'person'}}
          bottomDivider
          chevron
          onPress={() => {
            this.setState({
              showRealname: true,
            });
          }}
        />
        <ListItem
          title={'身份证号码'}
          rightTitle={form.idCard}
          leftIcon={{name: 'idcard', type: 'antdesign'}}
          bottomDivider
          chevron
          onPress={() => {
            this.setState({
              showIdCard: true,
            });
          }}
        />
        <ListItem
          title={'身份证照片'}
          rightTitle={'点击上传图片'}
          leftIcon={{name: 'photo'}}
          bottomDivider
          chevron
          onPress={() => {
            this.setState({showPhoto: !this.state.showPhoto});
          }}
        />
        <Button
          title="提交"
          buttonStyle={styles.submitBtn}
          onPress={() => this.onSubmit()}
        />
      </View>
    );
  }

  renderInput() {
    const {showRealname, showIdCard, form} = this.state;
    return (
      <View>
        <DialogInput
          isDialogVisible={showRealname}
          title={'真实姓名'}
          hintInput={'请输入真实姓名'}
          cancelText="取消"
          submitText="确定"
          submitInput={text => {
            this.setState({
              form: {
                ...form,
                realname: text,
              },
            });
            this.setState({showRealname: false});
          }}
          closeDialog={() => {
            this.setState({showRealname: false});
          }}
        />
        <DialogInput
          isDialogVisible={showIdCard}
          title={'身份证号码'}
          hintInput={'请输入身份证号码'}
          cancelText="取消"
          submitText="确定"
          submitInput={text => {
            this.setState({
              form: {
                ...form,
                idCard: text,
              },
            });
            this.setState({showIdCard: false});
          }}
          closeDialog={() => {
            this.setState({showIdCard: false});
          }}
        />
      </View>
    );
  }

  renderPhoto() {
    const {showPhoto} = this.state;
    return (
      <CustomAlertDialog
        entityList={photoType}
        callback={i => {
          this.setState({
            type: i,
            typeName: photoType[i],
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
        show={showPhoto}
        closeModal={show => {
          this.setState({
            showPhoto: show,
          });
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderCard()}
        {this.renderForm()}
        {this.renderInput()}
        {this.renderPhoto()}
      </View>
    );
  }
}

const statusCard = status => {
  const color = status === 'normal' ? '#67C23A' : '#F56C6C';
  return {
    backgroundColor: color,
    height: 200,
    borderRadius: 15,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 25,
    justifyContent: 'space-between',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f3f6',
    height: realHeight,
  },
  card: {
    backgroundColor: '#409EFF',
    height: 200,
    borderRadius: 15,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 25,
    justifyContent: 'space-between',
  },
  textColor: {
    color: '#ffffff',
  },
  textStatus: {
    fontSize: 22,
    color: '#ffffff',
    marginBottom: 5,
  },
  textName: {
    fontSize: 18,
    marginBottom: 5,
    color: '#ffffff',
  },
  submitBtn: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 0,
  },
});
