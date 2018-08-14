/**
 * Created by licc on 2018/4/15.
 */
import React, { Component } from 'react'
import {
    Image, StyleSheet, ScrollView, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native'
import NetInfoDecorator from '../../config/NetInfoDecorator'
import {observer} from 'mobx-react/native'
import FoodEncyclopediaStore from '../../footStore/foodEncyclopediaStore'
import Loading from '../../component/Loading'
import Toast, {DURATION} from 'react-native-easy-toast'
// import {Dimensions} from "react-native";


// const {height, width} = Dimensions.get('window');//这个是过去到屏幕宽度、高度，用于适配
// import FootMainListData from '../../footStore/FootMainListData'
@NetInfoDecorator //此处注入的网络监听器会一直保持对网络的监听
@observer
export default class foodMain extends Component {
    // footMainListData = new FootMainListData()
    footMainListData = new FoodEncyclopediaStore()
    componentWillReact() {
        const {errorMsg} = FoodEncyclopediaStore
        errorMsg && this.toast && this.toast.show(errorMsg)
    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps
        const {isNoResult} = this.footMainListData
        if (isConnected && isNoResult) {
            this.footMainListData.fetchCategoryList()
        }
    }

    /**
     * 加载耗时操作
     */
    componentDidMount() {
        // this.getDataFromFetch();
        this.footMainListData.fetchCategoryList()//这里发起请求
    }

    searchAction = ()=>{alert('search')}
    handleAction = (title)=>{
        switch (title){
            case '饮食分析':
                this.props.navigation.navigate('Login');
                break;
            case '搜索对比':
                this.props.navigation.navigate('Login');
                break;
            case '扫码对比':
                this.props.navigation.navigate('Login');
                break;
        }

    }
    _reconnectHandle = ()=>{
        this.footMainListData.fetchCategoryList()
    }
    goDetails = (kind,category) => {
        // alert('--kind--'+JSON.stringify(kind))
        this.props.navigation.navigate('foodDetails',{
            id: 'foodDetails',
            passProps: {
                kind,
                category,
            }
        });
    }

    render() {
        const {foodCategoryList, isFetching} = this.footMainListData //这里需要的数据已经在Did中获取到了
        const {isConnected} = this.props
        return (
            <View style={{flex: 1,alignItems:'center',backgroundColor: '#f5f5f5'}}>

                <ScrollView
                    bounces={false}
                    style={{width:'100%',height:'100%'}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{alignItems:'center',backgroundColor: '#f5f5f5',paddingBottom:10}}

                >
                    <HeaderView searchAction={this.searchAction} />
                    <FootHandleView handleAction={this.handleAction}/>
                    {isConnected ?
                        <View>
                        {foodCategoryList.map(foodCategory => {
                            return (
                                <ListItems
                                    key={`FoodCategory-${foodCategory.kind}`}
                                    foodCategory={foodCategory}
                                    fun={this.goDetails}
                                />
                            )
                        })}
                    </View>  :<ReconnectView onPress={this._reconnectHandle}/>}


                </ScrollView>
                {/*<TouchableOpacity style={{padding: 10}}*/}
                    {/*onPress={()=>{*/}
                        {/*this.refs.toast.show('hello Toast!',2000); }*/}
                    {/*}>*/}
                    {/*<Text>Press me</Text>*/}
                {/*</TouchableOpacity>*/}
                <Loading isShow={isFetching}/>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#333333'}}
                    position='center'
                    positionValue={1000}
                    fadeInDuration={50}
                    fadeOutDuration={500}
                    opacity={1}
                    textStyle={{color:'#FFFFFF'}}
                />
            </View>

        )
    }
}


const ListItems = ({foodCategory,fun})=>{

    let title = '食物分类';
    if (foodCategory.kind === 'brand') {
        title = '热门品牌';
    } else if (foodCategory.kind === 'restaurant') {
        title = '连锁餐饮';
    }
    return (
        <View style={{backgroundColor:'white',marginTop: 10, overflow: 'hidden'}}>
            <View style={styles.listHeader}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <View style={{width:330,height:14,backgroundColor:'#f5f5f5'}}>
                    <Image
                        style={{width:330,height:14}}
                        source={require('../../images/img_home_list_bg.png')}
                    />
                </View>
            </View>
            <View style={{flexDirection:'row',flexWrap:"wrap",width:330,backgroundColor:'white'}}>
                {
                    foodCategory.categories.map((item)=>{
                            // return <ItemListsChild {...item}
                        return (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.75}
                                    style={{width: 110, height: 65, alignItems: 'center', marginBottom: 25}}
                                    onPress={() => fun(foodCategory,item)}
                                >

                                    <Image style={{width: 40, height: 40}} resizeMode='contain'
                                           source={{uri: item.image_url}}>
                                    </Image>
                                    <Text style={{color: 'grey', fontSize: 12, marginTop: 5}}>
                                        {item.name}
                                    </Text>

                                </TouchableOpacity>
                            )
                    })
                }
            </View>
        </View>
    )

}
const FootHandleView = ({handleAction}) => {
    return (
        <View style={styles.handleView}>
            <HandleItem title = '饮食分析'
                        imageName={require('../../images/ic_home_analyse.png')}
                        onPress={() => handleAction('饮食分析')}
            />
            <View style={styles.line}/>
            <HandleItem title = '搜索对比'
                        imageName={require('../../images/ic_search_compare.png')}
                        onPress={() => handleAction('搜索对比')}
            />
            <View style={styles.line}/>
            <HandleItem title = '扫码对比'
                        imageName={require('../../images/ic_scan_compare.png')}
                        onPress={() => handleAction('扫码对比')}
            />

        </View>
    )
}
const HandleItem = ({title,imageName,onPress}) =>{
    return (
        <TouchableOpacity
            style={styles.handleItemView}
            activeOpacity={0.75}
            onPress={onPress}>
            <Image style={{width:28,height:28}} source={imageName}/>
            <Text style={{fontSize:13,color:'grey'}}>{title}</Text>
        </TouchableOpacity>
    )

}

const HeaderView = ({searchAction}) => {
    return (
        <ImageBackground
            style={styles.headerContainer}
            source={require('../../images/img_home_bg.png')}
        >
            <Image
                style={styles.headerLogo}
                source={require('../../images/ic_head_logo.png')}
                resizeMode="contain"
            />
            <View style={{alignItems: 'center',width:'100%',}}>
                <Text style={{color: 'white', marginBottom: 15, fontSize: 15}}>
                    查 询 食 物 信 息
                </Text>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.headerSearchContainer}
                    onPress={searchAction}
                >
                    <Image style={{width: 20, height: 20, marginHorizontal: 5}}
                           source={require('../../images/ic_home_search.png')}/>
                    <Text style={{color: 'rgba(222, 113, 56, 0.8)', fontSize: 15}}>请输入食物名称</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
};
const ReconnectView = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={onPress}
        >
            <Text>网络出错，点击重试~</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        height: 220,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 28,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(1,1,1,0)',
        overflow: 'hidden'
    },
    headerLogo: {
        width: 66,
        height: 24,
    },
    headerSearchContainer: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row'
    },
    handleView:{
        width:330,
        height: 60,
        marginTop: 10,
        flexDirection:'row',//子容器水平排列
        alignItems:'center',
        justifyContent: 'center',
    },
    handleItemView:{
        flex:1,
        height:60,
        backgroundColor:'white',
        alignItems:'center',
        paddingVertical: 5
    },
    foodHandleContainer: {
        height: 60,
        width: '98%',
        backgroundColor: 'white',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: -1},
        shadowRadius: 2,
    },
    handelItem: {
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    line: {
        height: 50,
        width: 0.5,
        backgroundColor: '#d9d9d9'
    },
    categoryContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
    },
    groupHeader: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    category: {
        width: '80%',
        height: 65,
        alignItems: 'center',
        marginBottom: 25,
    },
    categoryIcon: {
        width: 40,
        height: 40,
    },
    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
    listHeader:{
        height: 40,
        alignItems:'center',
        justifyContent: 'center',
    },
})