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
const LeftItem = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.leftItem}
            onPress={onPress}
        >
            <Image style={{width: 20, height: 20}}
                   source={require('../images/ic_back_dark.png')}
                   resizeMode={"contain"}
            />
        </TouchableOpacity>
    )
}

const RightItem = ({onPress, text}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.rightItem}
            onPress={onPress}
        >
            <Text style={{fontSize: 15, color: '#666666'}}>{text}</Text>
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
            <Image style={{width: 18, height: 18}} source={icon} resizeMode={"contain"}/>
        </TouchableOpacity>
    )
}

export default class Header extends Component {
    static propTypes = {
        style: View.propTypes.style,
        title: PropTypes.string,
        showGoBack: PropTypes.bool,
        onBack: PropTypes.func,
        titleStyle: PropTypes.object,
        rightTitle: PropTypes.string,
        onRight: PropTypes.func,
        rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        renderRightItem: PropTypes.func
    }

    static defaultProps = {
        showGoBack: true
    }

    render() {
        const {
            title, titleStyle,
            showGoBack, onBack,
            style, rightTitle, onRight, rightIcon,
            renderRightItem
        } = this.props

        return (
            <View style={[styles.header, style]}>
                {showGoBack && <LeftItem onPress={onBack}/>}
                <Text style={[styles.title, titleStyle]}>{title || ''}</Text>
                {rightTitle && <RightItem text={rightTitle} onPress={onRight}/>}
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