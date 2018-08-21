/**
 * Created by licc on 2018/8/16.
 */

import React, { Component } from 'react'
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types';
export default class LoadMoreFooter extends Component{

    static propTypes = {
        isNoMore: PropTypes.bool
    }
    static defaultProps = {
        isNoMore: false
    }
    render(){
        const {isNoMore} = this.props;
        const title = isNoMore ? '-没有更多的数据了-':'正在加载更多的数据';
        return (
            <View style = {styles.loadingContainer}>
                {!isNoMore && <ActivityIndicator/>}
                <Text style = {styles.loadingText}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer:{
        height:40,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
    },
    loadingText:{
        fontSize:14,
        color:'gray',
        marginLeft:5,
    }
});
