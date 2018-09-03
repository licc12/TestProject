/**
 * Created by licc on 2018/8/14.
 */

import React, {Component, PureComponent} from 'react'
import {Image, StyleSheet, Text, ListView, TouchableOpacity, View, RefreshControl, ImageBackground} from 'react-native'
import {observer} from 'mobx-react/native';
import Loading from '../../component/Loading';
import {reaction} from 'mobx';
import Toast from 'react-native-easy-toast';
import FeedBaseStore from '../../footStore/feedBaseStore';
import LoadMoreFooter from "../../component/LoadMoreFooter";

const EVALUATING_ID = 3;
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

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

    knowledgeListStore = new FeedBaseStore(EVALUATING_ID);

    componentDidMount() {
        reaction(
            () => this.knowledgeListStore.page,
            () => this.knowledgeListStore.fetchFeedList()
        )
    }

    componentWillReact() {//这个方法reactNative 是mobx中自动加入的生命周期，当改变被观察的值时，才会执行
        const {errorMsg} = this.knowledgeListStore;
        errorMsg && this.toast.show(errorMsg);
    }

    /**
     * _onRefresh 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this.knowledgeListStore.isRefreshing = true
        this.knowledgeListStore.fetchFeedList()
    }
    /**
     * _renderRow 列表模板
     * @param feed
     * @private
     */
    _renderRow = feed => <GCKnowledgeItem feed={feed} onPressCell={this.onPressCell}/>

    onPressCell = feed=>{
        this.props.navigation.navigate('GCDetails',{id:'GCDetails',feed});
    }

    /**
     * _onEndReach 在不够一页时被触发
     * @private
     */
    _onEndReach = () => this.knowledgeListStore.page++
    /**
     * _renderFooter 上拉加载更多
     * @private
     */
    _renderFooter = () => <LoadMoreFooter isNoMore={this.knowledgeListStore.isNoMore}/>

    render() {
        const {isFetching, isRefreshing, feedList} = this.knowledgeListStore;
        // alert('--64--'+JSON.stringify(feedList));
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                {!isFetching &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(feedList.slice(0))} //数据源
                    renderRow={this._renderRow} //列表模板
                    initialListSize={2}//指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30} //调用onEndReached之前的临界值，单位是像素
                    renderFooter={this._renderFooter}//脚会在每次渲染过程中都重新渲染
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                />
                }
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        );
    }


}

class GCKnowledgeItem extends PureComponent {

    render() {
        const {feed, onPressCell} = this.props;
        // alert('--103--'+JSON.stringify(feed));

        if (feed.images.length == 1) {
            return <GCKnowledgeSingleItem feed={feed} onPress={()=>onPressCell(feed)}/>
        } else {
            return <GCKnowledgeMultiItem feed={feed} onPress={()=>onPressCell(feed)}/>
        }

    }
}

/**
 * 单图片列表模板
 */
const GCKnowledgeSingleItem = ({
    onPress,
    feed
}) => {
    // alert('--122--'+JSON.stringify(feed));
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.itemFar}
            onPress={onPress}
        >
            <View style={styles.itemLeft}>
                <Text style={styles.leftTitle}>{feed.title}</Text>
                <View style={styles.leftBottom}>
                    <Text style={styles.bottomTitle}>{feed.source}</Text>
                    <View style={styles.bottomRightView}>
                        <Image style={styles.readImg}
                               source={require('../../images/ic_feed_watch.png')}></Image>
                        <Text style={styles.tail}>{feed.tail}</Text>
                    </View>
                </View>
            </View>
            <Image
                style={styles.itemRight}
                source={{uri: feed.images[0]}}
                defaultSource={require('../../images/img_news_default.png')}
            />
        </TouchableOpacity>
    )

}


/**
 * 多图片列表模板
 */
const GCKnowledgeMultiItem = ({
    onPress,
    feed
}) => {
    // alert('--155--'+JSON.stringify(feed));
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.itemFar}
            onPress={onPress}
        >
            <View style={styles.itemLeft}>
                <Text style={styles.multiTitle}>{feed.title}</Text>
                <View style={styles.multiImgView}>
                    {
                        feed.images.map((img,i)=>{
                            return(
                                <Image
                                    key={i}
                                    style={styles.multiImg}
                                    source={{uri: img}}
                                    defaultSource={require('../../images/img_news_default.png')}
                                />
                            )
                        })
                    }
                </View>

                <View style={styles.leftBottom}>
                    <Text style={styles.bottomTitle}>{feed.source}</Text>
                    <View style={styles.bottomRightView}>
                        <Image style={styles.readImg}
                               source={require('../../images/ic_feed_watch.png')}></Image>
                        <Text style={styles.tail}>{feed.tail}</Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({

    itemFar: {
        width: '100%',
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF'
    },
    itemLeft: {
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    leftTitle: {
        width: ScreenWidth * 0.60,
        fontSize: 15,
        color: '#666',
    },
    multiTitle:{
        width: (ScreenWidth - 15 * 2),
        fontSize: 15,
        color: '#666',
    },
    leftBottom: {
        width: (ScreenWidth*0.6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemRight: {
        width: (ScreenWidth - 15 * 2 - 10 * 2) / 3,
        height: 80,
    },
    bottomTitle: {
        fontSize: 13,
        color: 'rgb(150,150,150)'
    },
    bottomRightView: {
        width: ScreenWidth * 0.30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    readImg: {
        width: 14,
        height: 14,
        marginRight: 3
    },
    tail: {
        fontSize: 13,
        color: 'rgb(150,150,150)'
    },
    multiImgView:{
        marginTop:10,
        marginBottom:10,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    multiImg:{
        height:80,
        width: (ScreenWidth - 15 * 2 - 10 * 2) / 3,
    }


})


