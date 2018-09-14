/**
 * Created by ljunb on 2017/3/15.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

import PropTypes from 'prop-types';
const LeftItem = ({onPress,leftIcon}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.leftItem}
            onPress={onPress}
        >
            <Image style={{width: 40, height: 40}}
                   source={leftIcon ? leftIcon : require('../images/ic_back_dark.png')}
                   resizeMode={"contain"}
            />
        </TouchableOpacity>
    )
}

const RightItem = ({onPress, text, hasRightIcon}) => {
    let margR = hasRightIcon? {right:20}:{}
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.rightItem,margR]}
            onPress={onPress}
        >
            <Text style={{fontSize: 13, color: '#666666'}}>{text}</Text>
        </TouchableOpacity>
    )
}

const RightIconItem = ({onPress, icon}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.rightIconItem}
            onPress={onPress}
        >
            <Image style={{width: 20, height: 20}} source={icon} resizeMode={"contain"}/>
        </TouchableOpacity>
    )
}

export default class Header extends Component {
    static propTypes = {
        style: PropTypes.style,
        title: PropTypes.string,
        showGoBack: PropTypes.bool,
        onBack: PropTypes.func,
        titleStyle: PropTypes.object,
        rightTitle: PropTypes.string,
        onRight: PropTypes.func,
        leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//自定义返回按钮图标
        rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        renderRightItem: PropTypes.func
    }

    static defaultProps = {
        showGoBack: true,
        leftIcon:null
    }

    render() {
        const {
            title, titleStyle,
            showGoBack, onBack,
            style, rightTitle, onRight,leftIcon,rightIcon,
            renderRightItem
        } = this.props
        return (
            <View style={[styles.header, style]}>
                {showGoBack && <LeftItem onPress={onBack} leftIcon={leftIcon}/>}
                <Text style={[styles.title, titleStyle]}>{title || ''}</Text>
                {rightTitle && <RightItem text={rightTitle} hasRightIcon={rightIcon} onPress={onRight}/>}
                {rightIcon && <RightIconItem icon={rightIcon} onPress={onRight}/>}
                {renderRightItem &&
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={styles.renderRight}
                        onPress={onRight}
                    >
                        {renderRightItem()}
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50 ,
        width: '100%',
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d5d5d5',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        color: '#666',
        fontSize: 18,
    },
    leftItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 50,
        width: 60,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    rightItem: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 50,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightIconItem: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 50,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    renderRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 50,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})