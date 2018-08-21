/**
 * Created by licc on 2018/8/14.
 */

import React, {Component, PureComponent} from 'react'
import {
    Image, StyleSheet, Text, ListView, TouchableOpacity, View, RefreshControl, ImageBackground,
    ScrollView
} from 'react-native'
import {observer} from 'mobx-react/native';
import Loading from '../../component/Loading';
import {reaction} from 'mobx';
import Toast from 'react-native-easy-toast';
import FeedBaseStore from '../../footStore/feedBaseStore';
import LoadMoreFooter from "../../component/LoadMoreFooter";
import AutoResponisve from 'autoresponsive-react-native'
const EVALUATING_ID = 1;
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
const itemWidth = (ScreenWidth - 15 * 2 - 10) / 2
@observer
export default class GCKnowledge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({//ListView 的固定写法
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    homeListStore = new FeedBaseStore(EVALUATING_ID);

    componentDidMount() {
        reaction(
            () => this.homeListStore.page,
            () => this.homeListStore.fetchFeedList()
        )
    }

    componentWillReact() {//这个方法reactNative 是mobx中自动加入的生命周期，当改变被观察的值时，才会执行
        const {errorMsg} = this.homeListStore;
        errorMsg && this.toast.show(errorMsg);
    }

    /**
     * _onRefresh 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this.homeListStore.isRefreshing = true
        this.homeListStore.fetchFeedList()
    }
    /**
     * _renderRow 列表模板
     * @param feed
     * @private
     */
    _renderRow = feed => <renderChildren feed={feed}/>
    /**
     * _onEndReach 在不够一页时被触发
     * @private
     */
    _onEndReach = () => this.homeListStore.page++


    renderChildren = (feed) => {
        const {isFetching} = this.homeListStore;
        // 默认高度
        let height = itemWidth + 50;
        let titleHeight = 30;
        if (feed.description) {
            if (feed.description.length !== 0 && feed.description.length < 13) {
                titleHeight += 25;
            } else if (feed.description.length >= 13) {
                titleHeight += 40
            }
        }
        height += titleHeight;

        if (feed.content_type !== 5) height = itemWidth + 50;

        const style = {
            width: itemWidth,
            height,
            marginLeft: 15
        }

        return (
            <HomeItem
                titleHeight={titleHeight}
                style={style}
                feed={feed}
                onPress={this.onPressCell}
            />
        )
    }
    /**
     * _renderFooter 上拉加载更多
     * @private
     */
    _renderFooter = () => <LoadMoreFooter isNoMore={this.homeListStore.isNoMore}/>

    getAutoResponsiveProps = () => ({itemMargin: 10})

    render() {
        const {isFetching, isRefreshing, feedList} = this.homeListStore;
        // alert('--64--'+JSON.stringify(feedList));
        let scrollViewH = ScreenHeight - 44 - 49 - 60;
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                {!isFetching &&
                    <ScrollView
                        contentContainerStyle={{paddingTop:10,}}
                        ref={scrollView => this.scrollView = scrollView}
                        style={{width: ScreenWidth, height: scrollViewH}}
                        automaticallyAdjustContentInsets={false}
                        removeClippedSubviews={true}
                        bounces={true}
                        scrollEventThrottle={16}
                        scrollEnabled = {true}
                        // onMomentumScrollEnd={this.onMomentumScrollEnd}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={this._onRefresh}
                                colors={['rgb(217,51,58)']}
                            />
                        }
                    >

                        {!isFetching&&
                            <View style={{justifyContent: 'space-around'}}>
                                <AutoResponisve {...this.getAutoResponsiveProps()}>
                                    {feedList.map(this.renderChildren)}
                                </AutoResponisve>
                            </View>
                        }

                    </ScrollView>

                }
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        );
    }


}


@observer
class HomeItem extends PureComponent {

    render() {
        const {feed, onPress, style, titleHeight} = this.props
        let imageH = feed.content_type != 5 ? style.width + 50 : style.width;
        // 返回的数据中，头像出现null的情况，所以source仍然做个判断
        let publisherAvatar = feed.publisher_avatar ? {uri: feed.publisher_avatar} : require('../../images/img_default_avatar.png');

        return (

            <TouchableOpacity
                activeOpacity={0.75}
                style={[style, {backgroundColor: '#fff'}]}
            >
                <Image
                    style={{
                        width: style.width,
                        height: imageH,
                    }}
                    source={{uri: feed.card_image}}
                    defaultSource={require('../../images/img_horizontal_default.png')}
                />
                {(feed.content_type == 5) &&
                <View style={{width: style.width, height: titleHeight, paddingHorizontal: 4, paddingTop: 8,}}>
                    <View style={{
                        width: style.width - 8,
                        height: titleHeight - 8,
                        justifyContent: 'space-around',
                        borderBottomWidth: 1,
                        borderColor: '#ccc'
                    }}>
                        <Text style={{color: '#333', fontSize: 14}} numberOfLines={1}>{feed.title}</Text>
                        <Text style={{color: '#999', fontSize: 13}} numberOfLines={2}>{feed.description}</Text>
                    </View>
                </View>

                }
                {(feed.content_type == 5) &&
                <View style={{
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 4
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Image
                            style={{width: 30, height: 30, borderRadius: 15}}
                            source={publisherAvatar}
                            defaultSource={require('../../images/img_default_avatar.png')}
                        />
                        <Text style={{color: '#999', fontSize: 10,}}>{feed.publisher}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Image
                            style={{width: 12, height: 12}}
                            source={require('../../images/ic_homepage_like.png')}
                        />
                        <Text style={{color: '#999', fontSize: 11}}>{feed.like_ct}</Text>
                    </View>
                </View>
                }

            </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({

    itemFar: {
        marginTop: 15,
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },


})



