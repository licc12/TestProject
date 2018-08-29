/**
 * Created by licc on 2018/4/15.
 */
import React, { Component } from 'react'
import {Image, StyleSheet, ImageBackground, Text, TouchableOpacity, View} from 'react-native'

export default class mineMain extends Component {
    static navigationOptions = {
        // headerTitle: '我的',
        header:null
    };
    _goLogin =()=>{
        this.props.navigation.navigate('Login');
    }

    _onPressStaticCell = title => alert(title)
    render() {
        // alert('--18--'+JSON.stringify(this.props));
        return (
            <View style={{flex: 1,backgroundColor:'#f5f5f5'}}>
                <HeaderView onPress = {this._goLogin} props = {this.props}/>
                <ProfileStaticCell
                    title="我的照片"
                    style={{borderBottomWidth:1}}
                    imageName={require('../../images/ic_my_photos.png')}
                    onPress={this.goLogin}
                />
                <ProfileStaticCell
                    title="我的收藏"
                    style={{borderBottomWidth: 1}}
                    imageName={require('../../images/ic_my_collect.png')}
                    onPress={this._onPressStaticCell}
                />
                <ProfileStaticCell
                    title="上传食物"
                    style={{borderBottomWidth: 1}}
                    imageName={require('../../images/ic_my_upload.png')}
                    onPress={this._onPressStaticCell}
                />
            </View>
        )
    }

}


const ProfileStaticCell = ({
       title,
       imageName,
       style,
       onPress
   }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.staticCell}
            onPress={()=>onPress(title)}
        >
            <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={imageName}/>
            <View style={[styles.cellStyle, style || style]}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <Image style={{width: 20, height: 20}} source={require('../../images/ic_my_right.png')}/>
            </View>
        </TouchableOpacity>
    )
}

//列表组件
class ItemList extends  Component{
    constructor(props){
        super(props);
        this.state={
            title:this.props.title,
            imageName:this.props.imageName,
            style:this.props.style,
        }

    }
    render(){
        return(
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.staticCell}
                onPress={()=>this.props.onPress(this.state.title)}
            >
                <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={this.state.imageName}/>
                <View style={[styles.cellStyle, this.state.style || this.state.style]}>
                    <Text style={{color: 'gray'}}>{this.state.title}</Text>
                    <Image style={{width: 20, height: 20}} source={require('../../images/ic_my_right.png')}/>
                </View>
            </TouchableOpacity>
        )

    }
}

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
            <ImageBackground
                style={{width: '100%', height: 230, alignItems: 'center', backgroundColor: 'transparent'}}
                source={require('../../images/img_my_head.png')}>
                <View style={[styles.header,{width:'100%'}]}>
                    <Text style={{color:'#fff',fontSize:16}}>我的</Text>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this._gotoSetting}
                        style={styles.settingContainer}>
                        <Image style={{width: 20, height: 20}} source={require('../../images/ic_my_setting.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <View style={styles.avatarContainer}>
                        <Image style={{width: 80,height:80}} source={require('../../images/img_default_avatar.png')}/>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this.state.onPress}
                        style={styles.loginContainer}>
                        <Text style={{color: 'white'}}>点击登录</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )

    }


}

const styles = StyleSheet.create({
    header:{
        height: 44,
        marginTop:0,
        alignItems:'center',
        justifyContent:'center'

    },
    settingContainer: {
        height: 50,
        width: 50,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    loginContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2
    },
    cellContainer: {
        borderColor: '#d9d9d9',
        marginTop: 15,
        backgroundColor: 'white'
    },
    staticCell: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellStyle: {
        flex: 1,
        height: 46,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    }
});