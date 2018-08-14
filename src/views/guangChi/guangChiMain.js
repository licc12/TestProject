/**
 * Created by licc on 2018/4/15.
 */
import React, { Component } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Header from "../../component/Header";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import GCEvaluation from "./GCEvaluation";
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
export default class guangChiMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: [{'title':'首页',type:0}, {'title':'测评',type:1}, {'title':'知识',type:2}, {'title':'美食',type:3}],
        };
    }
    _goLogin =()=>{
        alert('打开相机');
    }
    render() {
        return(
            <View style={{flex: 1,backgroundColor:'#FFFFFF'}}>
                <Header title="逛吃" showGoBack={false} rightIcon={require('../../images/ic_feed_camera.png')} onRight={this._goLogin}/>
                <View style={styles.line}/>
                <TabTopView label={this.state.label}></TabTopView>
            </View>
        );
    }
}

class TabTopView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {label} = this.props;
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarUnderlineStyle={{width:ScreenWidth/label.length, height: 1, backgroundColor: '#FF0000'}}
                tabBarActiveTextColor='#FF0000'>
                {
                    label.map((item,index)=>{
                        return <PageView style={styles.textStyle} tabLabel={item.title} item = {item} />
                    })
                }
            </ScrollableTabView>
        );
    }
}
/**
 * 这个是pageView，根据不同的类型渲染不同的列表
 */
class PageView extends Component {
    constructor(props) {
        super(props);
        // alert('--60--'+JSON.stringify(this.props));
    }
    render() {
        let {title,type} = this.props.item;
        return (
            <View style={{flex:1}}>
                {
                    (type == 1) && <PageViewChildType0 style={styles.textStyle}>{title}0</PageViewChildType0>
                }
                {
                    (type == 2) && <GCEvaluation style={styles.textStyle}>{title}1</GCEvaluation>
                }
                {
                    (type == 3) && <Text style={styles.textStyle}>{title}2</Text>
                }
                {
                    (type == 4) && <Text style={styles.textStyle}>{title}2</Text>
                }
            </View>
        );
    }
}
/**
 * 这个是pageView，根据不同的类型渲染不同的列表
 */
class PageViewChildType0 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {title,type} = this.props.item;
        return (
            <View style={{flex:1}}>

            </View>
        );
    }
}
/**
 * 自定义header头部
 */
class HeaderView extends Component{
    constructor(props){
        super(props);
        this.state={
            onPress:this.props.onPress
        }
    }
    _gotoSetting = ()=>{
        this.props.props.navigation.navigate('setting');
    }
    render(){
        return(
            <View style={styles.header}>
                <Text style={styles.headerText}>逛吃</Text>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress=''
                    style={styles.settingContainer}>
                    <Image style={{width: 20, height: 20}} source={require('../../images/ic_feed_camera.png')}/>
                </TouchableOpacity>
            </View>
        )

    }
}


const styles = StyleSheet.create({
    header: {
        // flex:1,
        width: '100%',
        height: 230,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    headerText:{
        // width:'100%',
        height: 44,
        color: '#333',
        fontSize:16,
        alignItems:'center',
        lineHeight: 44,
        justifyContent:'center',
    },
    line:{
        width:'100%',
        height:1,
        backgroundColor:'#efefef'
    },
    settingContainer: {
        height: 44,
        width: 44,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        // marginTop: 20
    },
    lineStyle: {
        width:ScreenWidth/4,
        height: 1,
        backgroundColor: '#FF0000',
    },
    textStyle: {
        flex: 1,
        fontSize:20,
        marginTop:20,
        textAlign:'center',
    },

})
