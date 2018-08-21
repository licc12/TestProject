/**
 * Created by licc on 2018/8/14.
 * 逛吃测评页
 */
import React, { Component,PureComponent } from 'react'
import {Image, StyleSheet, Text, ListView, TouchableOpacity, View, RefreshControl, ImageBackground} from 'react-native'
import {observer} from 'mobx-react/native'
import Loading from '../../component/Loading'
import {reaction} from 'mobx'
import Toast from 'react-native-easy-toast'
import FeedBaseStore from '../../footStore/feedBaseStore'
import LoadMoreFooter from "../../component/LoadMoreFooter";

const EVALUATING_ID = 2
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
@observer
export default class GCEvaluation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({//ListView 的固定写法
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    evaluatingListStore = new FeedBaseStore(EVALUATING_ID);

    componentDidMount(){
        reaction(
            () => this.evaluatingListStore.page,
            () => this.evaluatingListStore.fetchFeedList()
        )
    }
    componentWillReact() {//这个方法reactNative 是mobx中自动加入的生命周期，当改变被观察的值时，才会执行
        const {errorMsg} = this.evaluatingListStore
        errorMsg && this.toast.show(errorMsg)
    }

    /**
     * _onRefresh 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this.evaluatingListStore.isRefreshing = true
        this.evaluatingListStore.fetchFeedList()
    }
    /**
     * _renderRow 列表模板
     * @param feed
     * @private
     */
    _renderRow = feed => <EvaluatingItem feed={feed}/>
    /**
     * _onEndReach 在不够一页时被触发
     * @private
     */
    _onEndReach = () => this.evaluatingListStore.page ++
    /**
     * _renderFooter 上拉加载更多
     * @private
     */
    _renderFooter = () => <LoadMoreFooter isNoMore={this.evaluatingListStore.isNoMore}/>

    render() {
        const {isFetching,isRefreshing,feedList} = this.evaluatingListStore;
        // alert('--64--'+JSON.stringify(feedList));
        return(
            <View style={{flex: 1,backgroundColor:'#f5f5f5'}}>
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

class EvaluatingItem extends PureComponent{

    render(){
        const {feed,onPress} = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.itemFar}
            >
                <ImageBackground style={styles.itemBgImg} source={{uri:feed.background}}>
                    <Text style={styles.itemSource}>{feed.source}</Text>
                    <Text style={styles.itemTitle}>{feed.title}</Text>
                    <View style={styles.bottomTips}>
                        <Image
                            style={styles.readImg}
                            source={require('../../images/ic_feed_read.png')}
                        />
                        <Text style={styles.bottomText}>{feed.tail}</Text>
                    </View>

                </ImageBackground>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({

    itemFar:{
        width:'100%',
        paddingHorizontal: 15,
        marginTop:10,
    },
    itemBgImg:{
        width:ScreenWidth - 15*2,
        height:ScreenHeight * 0.3,
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'space-between',
    },
    itemSource:{
        color:'#fff',
        fontSize:13
    },
    itemTitle:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        // width:100,
        textAlign:'center',
        lineHeight:20,
    },
    readImg:{
        width:12,
        height:12,
    },
    bottomTips:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomText:{
        color:'#FFF',
        fontSize:13,
    }
})

