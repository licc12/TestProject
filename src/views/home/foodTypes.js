/**
 * Created by licc on 2018/9/04.
 */
import React, { Component,PureComponent } from 'react'
import {StyleSheet, Image,PixelRatio, Text, View, TouchableOpacity, ListView, RefreshControl, Modal} from "react-native";
import Header from "../../component/Header";
import getFoodDetailsManager from '../../footStore/getFoodDetailsManager'
import {observer} from "mobx-react";
import {reaction} from "mobx";
import Loading from "../../component/Loading";
import Toast from "react-native-easy-toast";
import LoadMoreFooter from "../../component/LoadMoreFooter";
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;


@observer
export default class foodTypes extends Component{
    constructor(props){
        super(props)
        this.state={
            sortTypes:[],
            passProps:this.props.navigation.state.params.passProps,
            dataSource: new ListView.DataSource({//ListView 的固定写法
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
        // alert('--20--'+this.props.navigation.state.params.passProps.category.id);
    }
    getFoodDetailsManager = new getFoodDetailsManager(this.props.navigation.state.params.passProps.kind.kind, this.props.navigation.state.params.passProps.category.id)
    componentDidMount() {
        reaction(
            () => [
                this.getFoodDetailsManager.page,
                this.getFoodDetailsManager.orderBy,
                this.getFoodDetailsManager.orderAsc,
                this.getFoodDetailsManager.sub_value
            ],
            () => this.getFoodDetailsManager.fetchFoods()
        )
        // this._fetchSortTypes();
    }
    _fetchSortTypes = async() => {
        const URL = 'http://food.boohee.com/fb/v1/foods/sort_types'
        try {
            const result = await fetch(URL).then(response => response.json())
            this.setState({sortTypes: result.types})
            alert('--36--'+JSON.stringify(result));
        } catch (error) {
            alert(`[Foods] fetch sort types error: ${error}`)
        }
    }

    _goBack = ()=>{
        this.props.navigation.goBack()
    }
    /**
     * 导航栏右部按钮
     * @private
     */
    _renderRightItem =()=>{
        // alert('全部');
    }
    componentWillReact() {//这个方法reactNative 是mobx中自动加入的生命周期，当改变被观察的值时，才会执行
        const {errorMsg} = this.getFoodDetailsManager;
        errorMsg && this.toast.show(errorMsg);
    }
    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        this.getFoodDetailsManager.isFetching = true;
        this.getFoodDetailsManager.fetchFoods();
    }
    /**
     * 上拉刷新
     * @private
     */
    _onEndReach = ()=>{
        this.getFoodDetailsManager.page++
    }
    /**
     * 上拉刷新时显示底部加载条
     * @private
     */
    _renderFooter = () => <LoadMoreFooter isNoMore={this.getFoodDetailsManager.isNoMore}/>
    /**
     * ListView条目
     * @param feed
     * @private
     */
    _renderRow=(food) => <FoodTypeList food={food} onPressCell={this.onPressCell}/>
    onPressCell = food=>{
        // alert('点击了96行');
    }
    render() {
        const {name, foods,isFetching} = this.getFoodDetailsManager
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <Header title = "类型" onBack={this._goBack} rightTitle="全部" rightIcon={require('../../images/ic_arrow_down.png')} renderRightItem={this._renderRightItem} />
                <View style={{minHeight:50,backgroundColor:'yellow',flexDirection:'column'}} >
                    <View style={{width:ScreenWidth,alignItems:'center', height:50,paddingHorizontal:15, flexDirection:'row',backgroundColor:'#FFF',}} >
                        <Text style={{fontSize:15,color:'#666666',marginRight:10}} >营养素排序</Text>
                        <Image style={{width:12,height:12,}} source={require('../../images/ic_arrow_down.png')} defaultSource={require('../../images/ic_arrow_down.png')}/>
                    </View>
                    {/*<View style={{width:ScreenWidth,height:200,backgroundColor:'#999'}}>*/}

                    {/*</View>*/}
                </View>
                {!isFetching &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(foods.slice(0))} //数据源
                    renderRow={this._renderRow} //列表模板
                    initialListSize={2}//指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30} //调用onEndReached之前的临界值，单位是像素
                    renderFooter={this._renderFooter}//脚会在每次渲染过程中都重新渲染
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                />
                }
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </View>

        )
    }

}


class FoodTypeList extends PureComponent {

    render() {
        const {food, onPressCell} = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={{width:ScreenWidth,height:80,paddingHorizontal:15, alignItems:'center', justifyContent:'center', backgroundColor:'#F6F6F6',flexDirection:'row',borderBottomWidth:1,borderColor:"#efefef"}}
                onPress={onPressCell}
            >
                <Image style={{width:50,height:50,marginRight:10,borderRadius:25}} source={{uri:food.thumb_image_url}} defaultSource={require('../../images/img_default_avatar.png')}/>
                <View style={{flexDirection:'row',flex:1,height:50,alignItems:'center'}}>
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-around',}}>
                        <Text style={{lineHeight:25,fontSize:15}}>{food.name}</Text>
                        <Text style={{lineHeight:25,fontSize:13}}>{food.calory}千卡/{food.weight}克</Text>
                    </View>
                    <Text style={{width:12,height:12,backgroundColor:'yellow',borderRadius:6}}></Text>
                </View>
            </TouchableOpacity>
        )

    }
}

/**
 *
 * @constructor
 */
class RightItemRender extends Component{

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
        };
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

                        </View>
                    </View>
                </TouchableOpacity>

            </Modal>
        )
    }
    showModal = (visible) => {
        this.setState({showHide:visible?'block':'none',modalVisible: visible});
    }
}


const styles = StyleSheet.create({
    far:{
        width:'100%',
        paddingTop: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
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