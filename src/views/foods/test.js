/**
 * Created by licc on 2018/4/22.
 */
import React, {Component} from 'react'
import {
    StyleSheet, Image, Text, View, TouchableOpacity, ListView, ScrollView, RefreshControl,
    WebView
} from "react-native";
import Header from "../../component/Header";
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
import AutoResponisve from 'autoresponsive-react-native'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({//ListView 的固定写法
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        // alert('will');
    }

    accounts = [
        {type: 1, name: 'A'},
        {type: 3, name: 'B'},
        {type: 2, name: 'C'},
        {type: 1, name: 'D'},
        {type: 1, name: 'A'},
        {type: 3, name: 'B'},
        {type: 2, name: 'C'},
        {type: 1, name: 'D'},

    ]
    renderChildren = (item, index) => {
        const style = {
            width: (ScreenWidth - 40) / 2,
            backgroundColor: 'red',
            marginLeft: 15
        }
        let rheight = null;
        if (item.type == 1) {
            rheight = ScreenHeight / 3 - 50;
        } else if (item.type == 2) {
            rheight = ScreenHeight / 3 - 20;
        } else {
            rheight = ScreenHeight / 3
        }
        return (
            <View style={[style, {height: rheight, alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={{fontSize: 20}}>{item.name}</Text>
            </View>
        );
    }
    getAutoResponsiveProps = () => ({itemMargin: 10})

    render() {

        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5',}}>
                <Header title="测试"/>
                <WebViewComponent
                    uri={'https://www.baidu.com/'}
                />
                {/*<ScrollView*/}
                    {/*contentContainerStyle={{paddingTop: 10}}*/}
                    {/*ref={scrollView => this.scrollView = scrollView}*/}
                    {/*style={{width: ScreenWidth, height: ScreenHeight}}*/}
                    {/*automaticallyAdjustContentInsets={false}*/}
                    {/*removeClippedSubviews*/}
                    {/*bounces*/}
                    {/*scrollEventThrottle={16}*/}
                    {/*onMomentumScrollEnd={this.onMomentumScrollEnd}*/}

                {/*>*/}
                    {/*<View style={{marginTop: 10, justifyContent: 'space-around'}}>*/}
                        {/*<AutoResponisve {...this.getAutoResponsiveProps()}>*/}
                            {/*{this.accounts.map(this.renderChildren)}*/}
                        {/*</AutoResponisve>*/}
                    {/*</View>*/}
                {/*</ScrollView>*/}
            </View>

        )
    }
}
const WebViewComponent = ({popAction, uri}) => {
    return (
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
            {/*<Header title="咨询详情" onBack={popAction} />*/}
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
    far: {
        width: (ScreenWidth - 30 * 2) / 2,
        backgroundColor: 'red',
        // paddingTop: 30,
        marginTop: 5,
    },
});