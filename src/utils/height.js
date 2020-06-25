import {Dimensions, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');
const wh = height / width;
const realHeight = wh > 1.8 ? height + StatusBar.currentHeight + 46 : height;
const windowHeight = wh > 1.8 ? height + StatusBar.currentHeight : height - 49;
export {realHeight, windowHeight};
