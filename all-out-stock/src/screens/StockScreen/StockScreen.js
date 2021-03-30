import React, {useState} from 'react'
import { Text, View } from 'react-native'
import config from "../../../config.json"

export default function StockScreen(props) {
    const finnhub = require('finnhub');
    const [keyword, setKeyword] = useState("")

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = config.FINNHUB_API_KEY
    const finnhubClient = new finnhub.DefaultApi()

    

    return (
        <View>
            <Text>This is the Stock Screen</Text>
        </View>
    )
}