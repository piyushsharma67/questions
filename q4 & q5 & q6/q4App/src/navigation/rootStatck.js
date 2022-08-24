import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';

import LoginScreen from '../screen/loginScreen';
import DisplayScreen from '../screen/displayScreen';
const Stack=createNativeStackNavigator()

function RootStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="loginScreen" component={LoginScreen}/>
            <Stack.Screen name="displayScreen" component={DisplayScreen}/>
        </Stack.Navigator>
    )
}

export default RootStack