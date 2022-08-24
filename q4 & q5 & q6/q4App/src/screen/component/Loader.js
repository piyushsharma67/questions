import React from 'react'
import {View,ActivityIndicator} from 'react-native'

function Loader(){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',position:'absolute'}}>
            <ActivityIndicator size={70} color="green"/>
        </View>
    )
}

export default Loader