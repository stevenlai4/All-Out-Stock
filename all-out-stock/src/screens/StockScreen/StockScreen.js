import React, {useState} from 'react'
import { Text, View } from 'react-native'
import { finnhubClient } from '../../finnhub/config'

export default function StockScreen(props) {
    const [keyword, setKeyword] = useState("")
    
    finnhubClient.quote("AAPL", (error, data, response) => {
        console.log(data)
    });

    return (
        <View>
            <Text>This is the Stock Screen</Text>
        </View>
    )
}