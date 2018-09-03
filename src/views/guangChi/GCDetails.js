/**
 * Created by licc on 2018/8/22.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TouchableOpacity, WebView, ScrollView} from "react-native";
import Header from "../../component/Header";
import ShareModal from "../../component/ShareModal";

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class foodDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortTypes: [],
            passProps: this.props.navigation.state.params.feed,
        }
        // alert('--20--' + JSON.stringify(this.props.navigation.state.params.feed));
    }

    componentDidMount() {

    }
    _goBack = ()=>{
        this.props.navigation.goBack()
    }

    render() {
        const {feed} = this.props.navigation.state.params;
        return (
            (feed.link && feed.content_type == 6) ?
                <WebViewComponent
                    popAction={this._goBack}
                    uri={feed.link}
                />
                :
                <View style={{flex: 1}}>
                    {feed.type === 'food_card' ?
                        <GCCardComponent
                            popAction={this._goBack}
                            shareAction={()=>this.shareModal.showModal(true)}
                            likeAction={()=>alert('喜欢')}
                            feed={feed}
                        />
                        :
                        <GCNewsComponent
                            popAction={this._goBack}
                            shareAction={()=>this.shareModal.showModal(true)}
                            likeAction={()=>alert('登录后收藏')}
                            feed={feed}
                        />
                    }
                    <ShareModal ref={shareModal => this.shareModal = shareModal}/>
                </View>
        )
    }

}
const GCCardComponent = ({
    popAction,//返回按钮回调
    shareAction,//分享回调
    likeAction,//点赞回调
    feed
}) => {
    return (
        <View style={{position:'relative',flex:1,backgroundColor: '#f5f5f5'}}>
            <Header title="图片详情" onBack={popAction} rightIcon={require('../../images/ic_photo_share.png')} onRight={shareAction}/>
            <View style={{flex:1}}>
                <ScrollView
                    bounces={false}
                    scrollEnabled
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{backgroundColor:'#fff'}}
                >
                    <View style={{marginTop:10,flexDirection:'row',alignItems:'center',paddingHorizontal:15}}>
                        <Image style={{width:40,height:40,borderRadius:20}} source={{uri:feed.publisher_avatar}} defaultSource={require('../../images/img_default_avatar.png')}/>
                        <View style={{flexDirection:'column',marginLeft:10}}>
                            <Text style={{fontSize:15,color:'#333'}}>{feed.publisher}</Text>
                            <Text style={{fontSize:12,color:'#999'}}>1个月前</Text>
                        </View>
                    </View>
                    <Image
                        style={{height:400,marginTop:10}}
                        source={{uri:feed.card_image}}
                        defaultSource={require('../../images/img_horizontal_default.png')}
                        resizeMode={'contain'}
                    />
                    {feed.description !="" &&
                        <View style={{
                            borderColor:'#f5f5f5',
                            borderTopWidth:1,
                            paddingVertical:20,
                            paddingHorizontal:15,
                        }}>
                            <Text style={{color:'#666'}}>{feed.description}</Text>
                        </View>
                    }
                </ScrollView>
            </View>
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={likeAction}
                style={{
                    width:ScreenWidth,
                    height:44,
                    backgroundColor:'#fff',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'row',
                    bottom:0,
                    borderTopWidth:1,
                    borderTopColor:'#efefef'
                }}
            >
                <Image style={{width:16,height:16,}} source={require('../../images/ic_feed_like.png')}/>
                <Text style={{color:'#666',marginLeft:5}}>{feed.like_ct}</Text>
            </TouchableOpacity>
        </View>
    )
}
/**
 *
 * @param popAction 用于返回按钮
 * @param uri webView的加载页面的url
 * @returns {XML}
 * @constructor
 */
const GCNewsComponent = ({
     popAction,
     feed,
     shareAction,//分享回调
     likeAction,//点赞回调
}) =>{

    return (
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
            <Header title="咨询详情" onBack={popAction} />
            <WebView
                source={{uri:feed.link}}
                startInLoadingState={true}
                bounces={false}
                scalesPageToFit={true}
                style={styles.webView}
            />
            <View style={{width:ScreenWidth,bottom:0,flexDirection:'row',backgroundColor:'yellow'}}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={shareAction}
                    style={{
                        flex:1,
                        height:44,
                        backgroundColor:'#FFFFFF',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        borderTopWidth:1,
                        borderTopColor:'#f5f5f5'
                    }}
                >
                    <Image style={{width:16,height:16,}} source={require('../../images/ic_photo_share.png')}/>
                    <Text style={{color:'#666',marginLeft:5}}>分享</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={likeAction}
                    style={{
                        flex:1,
                        height:44,
                        backgroundColor:'#fff',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        borderTopWidth:1,
                        borderTopColor:'#efefef'
                    }}
                >
                    <Image style={{width:16,height:16,}} source={require('../../images/ic_article_collect.png')}/>
                    <Text style={{color:'#666',marginLeft:5}}>收藏</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}


const WebViewComponent = ({popAction, uri}) => {
    return (
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
            <Header title="咨询详情" onBack={popAction} />
            <WebView
                source={{uri}}
                startInLoadingState={true}
                bounces={false}
                scalesPageToFit={true}
                style={styles.webView}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    cardImageContent: {
        height: ScreenHeight - 50 - 44,
        width: ScreenWidth,
        backgroundColor: '#f5f5f5',
        top: 50,
        bottom: 44,
        position: 'absolute'
    },
    far: {
        width: ScreenWidth,
        paddingTop: 30,
    },
    webView: {
        width: ScreenWidth,
        height: ScreenHeight - 60,
    }

});






