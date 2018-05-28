/**
 * Created by licc on 2018/4/15.
 */
import React, { Component } from 'react'
import {Image, Navigator} from 'react-native'

export default class Splash extends Component {
    // componentDidMount(){
    //     this.timer = setTimeout(() => {
    //
    //     }, 2000)
    // }
    // componentWillUnmount(){
    //     clearTimeout(this.timer)
    // }
    render() {
        return (
            <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../images/img_intro_4.png')}
            />
        )
    }
}