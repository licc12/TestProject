/**
 * Created by licc on 2018/4/22.
 */
import React, { Component } from 'react'
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
import Header from "../../component/Header";
import getFoodDetailsManager from '../../footStore/getFoodDetailsManager'
import {observer} from "mobx-react";
import {reaction} from "mobx";


@observer
export default class foodDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            sortTypes:[],
            passProps:this.props.navigation.state.params.passProps,
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
        this._fetchSortTypes();
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

    render() {
        const {category: {id, name, sub_categories}} = this.props.navigation.state.params.passProps;
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <Header
                    title = {name}
                    onBack={this._goBack}
                    style={{zIndex: 3}}
                    // renderRightItem={this._renderRightItem}
                />

            </View>

        )
    }

}

const styles = StyleSheet.create({
    far:{
        width:'100%',
        // backgroundColor:'red',
        paddingTop: 30,
    },

});