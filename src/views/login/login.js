/**
 * Created by licc on 2018/4/22.
 */
import React, { Component } from 'react'
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
import Header from "../../component/Header";
export default class Login extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount() {
        // alert('will');
    }
    accounts = [
        {name: 'QQ', icon: require('../../images/ic_account_qq.png')},
        {name: '微信', icon: require('../../images/ic_account_wechat.png')},
        {name: '微博', icon: require('../../images/ic_account_weibo.png')},
        {name: '薄荷', icon: require('../../images/ic_account_boohee.png')}
    ]

    _goBack = ()=>{
        this.props.navigation.goBack()
    }
    render() {
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <Header title="登录" onBack={this._goBack}/>
                <View style={styles.far}>
                    <Text style={styles.tips1}>不用注册，用一下账号直接登录</Text>
                    <View style={styles.loginViews}>
                        {this.accounts.map(this._ListItemViews)}
                    </View>
                    <Text style={styles.tips1}>不用注册，用一下账号直接登录</Text>
                    <TouchableOpacity activeOpacity={0.75} style={styles.registerBtn} >
                        <Text style={{fontSize: 16, color: 'red'}}>注册</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    //登录方式
    _ListItemViews = (raccount,key) => {
        const {icon,name} = raccount;
        return (
            <View key={key} style={styles.loginStyleContent}>
                <Image style={styles.loginImage} source={icon}></Image>
                <Text style={styles.loginText} >{name}</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    far:{
        width:'100%',
        // backgroundColor:'red',
        paddingTop: 30,
    },
    tips1:{
        fontSize:15,
        color:'#333333',
        textAlign:'center',
        backgroundColor:'#f3f3f5'
    },
    loginViews:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft:40,
        paddingRight: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        // backgroundColor:'yellow'
    },
    loginStyleContent:{
        alignItems:'center'
    },
    loginImage: {
        width: 50,
        height: 50
    },
    loginText: {
        fontSize: 13,
        color: '#999999'
    },
    registerBtn:{
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor:'#FFFFFF',
        alignItems: 'center',
        marginTop: 30,
    }
});