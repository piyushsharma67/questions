import React from 'react'
import { StyleSheet, TextInput,View } from 'react-native'

function Input({onPress,value,keyVal,keyBoardType,secureEntry,maxLength}){
    return (
        <TextInput 
        value={value}
        onChangeText={(val)=>onPress(val,keyVal)}
        style={{padding:0,paddingLeft:10,borderWidth:2,width:'100%',height:'100%'}}
        keyboardType={keyBoardType}
        secureTextEntry={secureEntry}
        maxLength={maxLength}
        />
    )
}

const style=StyleSheet.create({
    container:{
        height:"100%",
        width:'100%',
        borderWidth:2,
        
    }
})

export default Input