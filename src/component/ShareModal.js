import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    Modal,
    PixelRatio,
    View, Image, TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class ShareModal extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            shareItem: [
                {title: '微信', icon: require("../images/ic_share_to_wechat.png")},
                {title: '朋友圈', icon: require("../images/ic_share_to_wechat_circle.png")},
                {title: 'QQ空间', icon: require("../images/ic_share_to_qqzone.png")},
                {title: '微博', icon: require("../images/ic_share_to_weibo.png")},
                {title: 'QQ空间', icon: require("../images/ic_share_to_qqzone.png")},
                {title: '微博', icon: require("../images/ic_share_to_weibo.png")},
                {title: null, icon: null},
                {title: null, icon: null},
            ]
        };
    }
    shareAction=(param)=>{
        if(param){
            alert('已分享到'+param);
        }
        this.setState({modalVisible: false});
    }
    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#FFF',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff'}
            : null;
        return (

            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => this.showModal(false) }
            >
                <TouchableOpacity activeOpacity={1} onPress={this.showModal.bind(this, false) } style={[styles.container, modalBackgroundStyle]}>
                    <View style={[styles.innerContainer, innerContainerTransparentStyle, {
                        position: 'absolute',
                        bottom: 0,
                    },]}>
                        <View style={{
                            width: ScreenWidth,
                            height: ScreenHeight / 3,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}>
                            {
                                this.state.shareItem.map((item, index) => {
                                    return <ShareModalChild item={item} shareAction={this.shareAction}/>
                                })
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        );
    }
    showModal = (visible) => {
        this.setState({showHide:visible?'block':'none',modalVisible: visible});
    }
}

const ShareModalChild = ({
     item,
     shareAction
 }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{
                width: ScreenWidth / 4,
                height: ScreenHeight/6,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor:'#f5f5f5',
                borderTopWidth:1,
                borderLeftWidth:1,
            }}
            onPress={()=>shareAction(item.title)}
        >
            {item.icon&&
                <Image
                    style={{
                        width: 50,
                        height: 50,
                    }}
                    source={item.icon}
                    defaultSource={require('../images/img_horizontal_default.png')}
                />
            }
            {item.title&&
                <Text style={{color:'#666',marginTop:10}}>{item.title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        // padding: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    page: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    zhifu: {
        height: 150,
    },
    flex: {
        flex: 1,
    },
    at: {
        borderWidth: 1 / PixelRatio.get(),
        width: 80,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#18B7FF',
        height: 1,
        marginTop: 10
    },
    date: {
        textAlign: 'center',
        marginBottom: 5
    },
    station: {
        fontSize: 20
    },
    mp10: {
        marginTop: 5,
    },
    btn: {
        width: 60,
        height: 30,
        borderRadius: 3,
        backgroundColor: '#FFBA27',
        padding: 5,

    },
    btn_text: {
        lineHeight: 18,
        textAlign: 'center',
        color: '#fff',
    },
});