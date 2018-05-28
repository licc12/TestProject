/**
 * Created by licc on 2018/4/17.
 */
import React,{Component} from 'react';
import {Image} from 'react-native';

export default class TabBarItem extends Component {

    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ {width:30,height:30 } }
            />
        )
    }

}

