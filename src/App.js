/**
 * Created by licc on 2018/4/15.
 */
import React, {Component} from 'react';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Splash from './views/splash/splash';
import foodMain from './views/foods/foodMain';
import guangChiMain from './views/guangChi/guangChiMain';
import mineMain from './views/mine/mineMain';
import TabBarItem from './component/TabBarItem';
import Details from './component/Details';
import ShopCar from './component/ShopCar';
import Login from "./views/login/login";
import foodDetails from "./views/foods/foodDetails";
import setting from "./views/mine/setting";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import test from "./views/foods/test";
import GCHome from "./views/guangChi/GCHome";
import GCDetails from "./views/guangChi/GCDetails";
import ShareModal from "./component/ShareModal";



type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: '',
        };
    }

    render() {
        return (
            <Navigator />
        );
    }
}
const TabRouteConfigs = {
    foodMain: {
        screen: foodMain,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '食物百科',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./images/ic_tab_search.png')}
                    selectedImage={require('./images/ic_tab_search_select.png')}
                />
            )
        }),
    },

    guangChiMain: {
        screen: guangChiMain,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '逛吃',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./images/ic_tab_homepage.png')}
                    selectedImage={require('./images/ic_tab_homepage_select.png')}
                />
            )
        }),
    },
    mineMain: {
        screen: mineMain,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./images/ic_tab_my.png')}
                    selectedImage={require('./images/ic_tab_my_select.png')}
                />
            )
        }),
    },
}

const TabNavigatorConfigs = {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        style: {//底部tab的样式
            backgroundColor: '#ffffff',
            height: 55,//tab的高度
        },
        activeTintColor:'#DF595E',//文字激活时的颜色
        backBehavior:'none',
        labelStyle: {//tab文字颜色
            fontSize: 13, // 文字大小
        },
    },

    indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
        height: 0,
    },
}

const Tab = TabNavigator( TabRouteConfigs, TabNavigatorConfigs );

const StackRouteConfigs = {
    Tab: {screen: Tab},
    splash: {screen: Splash},
    foodMain: {screen: foodMain},
    guangChiMain: {screen: guangChiMain},
    mineMain: {screen: mineMain},
    Details: {screen: Details},
    ShopCar: {screen: ShopCar},
    Login: {screen: Login},
    foodDetails:{screen:foodDetails},
    setting:{screen:setting},
    GCHome:{screen:GCHome},
    GCDetails:{screen:GCDetails},

}

const StackNavigatorConfig = {
    navigationOptions: {
        header:null,
        headerTitle: '首页',
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ffffff'},//导航栏的样式
        headerTitleStyle: {//导航栏文字的样式
            color: '#333333',
            fontSize: 16,//设置标题的大小
            alignSelf: 'center',//居中显示
        },
        headerTintColor: 'yellow',
        headerMode: 'screen',
        showIcon: true,
        swipeEnabled: false,
        animationEnabled: false,
        gesturesEnabled: false,
    },
    mode: 'card',
}

const Navigator = StackNavigator( StackRouteConfigs, StackNavigatorConfig );

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 10,
        color: 'black'
    },
    selectedTabText: {
        fontSize: 10,
        color: 'red'
    },
    icon: {
        width: 22,
        height: 22
    },
    page0: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    page1: {
        flex: 1,
        backgroundColor: 'blue'
    }
});
