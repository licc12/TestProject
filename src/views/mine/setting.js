/**
 * Created by licc on 2018/8/13.
 */
import React, { Component } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Header from "../../component/Header";
import ShareModal from "../../component/ShareModal";

export default class setting extends Component {
    _goBack = ()=>{
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{flex: 1,backgroundColor:'#f5f5f5'}}>
                <Header title="设置" onBack={this._goBack}/>
                <LineFar
                    title="清除缓存"
                    rightText="0.9M"
                    imageName={require('../../images/ic_my_right.png')}
                    onPress={this._listFar}
                />
                <LineFar
                    title="给我们提个建议"
                    imageName={require('../../images/ic_my_right.png')}
                    onPress={this._listFar}
                />
                <LineFar
                    title="评个分吧"
                    imageName={require('../../images/ic_my_right.png')}
                    onPress={this._listFar}
                />
                <LineFar
                    title="将食物库分享给朋友"
                    imageName={require('../../images/ic_my_right.png')}
                    onPress={()=>this.shareModal.showModal(true)}
                />
                <View style={styles.bottomTips}>
                    <Text style={styles.tipSize}>食物库 版本号：V2.6.2.1</Text>
                </View>
                <ShareModal ref={shareModal => this.shareModal = shareModal}/>
            </View>
        )
    }
    _listFar = rtitle =>{alert(rtitle)}
}
/**
 * 条目far
 * @constructor licc
 */
const LineFar = ({
         title,
         imageName,
         rightText,
         onPress
    })=>{
        return (
            <TouchableOpacity activeOpacity={0.75} style = {styles.lineFar} onPress={()=>onPress(title)}>
                <View style = {styles.lineView}>
                    <Text style = {styles.itemSpan}>{title}</Text>
                    {
                        rightText&&<Text style = {styles.itemSpanRight}>{rightText}</Text>
                    }
                    <Image style={styles.nextImg} source={imageName}/>
                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    header:{
        height: 44,
        marginTop:0,
        alignItems:'center',
        justifyContent:'center'

    },
    lineFar: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f6f6f6',
        paddingLeft:15,
        paddingRight: 15,
        color:'#333333',
    },
    lineView:{
        flex: 1,
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#E2E2E2',
        borderBottomWidth:1,
    },
    itemSpan:{
        flex:1,
        height: 46,
        lineHeight: 46,
        alignItems:'center',
    },
    itemSpanRight:{
        width: 50,
        height: 46,
        lineHeight: 46,
        textAlign:'center',
    },
    nextImg:{
        width: 10,
        height: 30,
    },
    bottomTips:{
        width: '100%',
        height: 30,
        justifyContent:'center',

        alignItems: 'center',
    },
    tipSize:{
        color: '#999999',
        fontSize: 13,
    }
});


