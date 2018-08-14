import { AppRegistry } from 'react-native';
// import App from './App';
import App from './src/App';
// import Splash from './src/views/splash/splash';
//--------去除模拟器底部黄色警告---开始---------
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true // 关闭全部黄色警告
//--------去除模拟器底部黄色警告---结束---------
AppRegistry.registerComponent('TestProject', () => App);
