/**
 * Created by ljunb on 2017/1/7.
 */
import React, {Component} from 'react'
import {NetInfo} from 'react-native'

const NetInfoDecorator = WrappedComponent => class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isConnected: true,
        }
    }

    componentDidMount() {
        //检测网络是否连接
        // NetInfo.isConnected.fetch().done((isConnected) => {//每次只执行一次
        //     // alert('--31--'+JSON.stringify(isConnected));
        //     this.setState({isConnected});
        // });
        // //检测网络连接信息
        // NetInfo.fetch().done((connectionInfo) => {//每次只执行一次
        //     // alert('--35--'+JSON.stringify(connectionInfo));
        //     this.setState({connectionInfo});
        // });
        NetInfo.isConnected.addEventListener('change', this._handleNetworkConnectivityChange);
    }

    _handleNetworkConnectivityChange = isConnected => this.setState({isConnected})

    render() {
        return <WrappedComponent {...this.props} {...this.state}/>
    }
}

export default NetInfoDecorator