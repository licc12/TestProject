/**
 * Created by licc on 2018/4/15.
 */
import React, { Component } from 'react'
import {Image, Text, View} from 'react-native'
export default class guangChiMain extends Component {
    static navigationOptions = {
        headerTitle: '逛吃',
    };

    render() {
        return(
            <View style={{flex:1}}>
                <Text onPress={this._skip.bind(this)}>点击跳转</Text>
            </View>
        );
    }

    _skip() {
        this.props.navigation.navigate('Details');
    }

}
