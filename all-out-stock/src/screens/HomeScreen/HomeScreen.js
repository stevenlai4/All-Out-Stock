import React from 'react'
import { Text, View } from 'react-native'
import { finnhubClient } from '../../firebase/config'

export default function HomeScreen(props) {
    finnhubClient.quote("AAPL", (error, data, response) => {
        console.log(data)
    });
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}