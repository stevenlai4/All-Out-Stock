import React from 'react'
import { Text, View } from 'react-native'
<<<<<<< HEAD
import { TouchableOpacity } from 'react-native-gesture-handler';
=======
import { finnhubClient } from '../../firebase/config'
>>>>>>> master

export default function HomeScreen(props) {
    finnhubClient.quote("AAPL", (error, data, response) => {
        console.log(data)
    });
    return (
        <View>
            <Text> This is the Home Screen</Text>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('Stock')}}>
                <Text>Click here for Stocks</Text>
            </TouchableOpacity>
        </View>
    )
}