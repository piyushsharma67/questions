import React from 'react'
import {View,Text, StyleSheet} from 'react-native'

function DisplayScreen(props){
    return (
        <View style={style.container}>
            <Text>name {props.route.params.name}</Text>
            <Text>phone {props.route.params.phone}</Text>
            <Text>password {props.route.params.password}</Text>
        </View>
    )
}

const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
})

export default DisplayScreen