import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen(props) {
    return (
        <View>
            <Text> This is the Home Screen</Text>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('Stock')}}>
                <Text>Click here for Stocks</Text>
            </TouchableOpacity>
        </View>
    )
}