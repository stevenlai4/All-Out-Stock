import React, {useState,useEffect} from 'react'
import { Text, TextInput, View } from 'react-native'
import { finnhubClient } from '../../finnhub/config'

export default function StockScreen(props) {
    const [symbol, setSymbol] = useState("")
    const [quote, setQuote] = useState({})
    
    const searchApi = () => {
        finnhubClient.quote(symbol, (error, data, response) => {
            setQuote(data)
        })
    }

    useEffect(()=>{
        searchApi()
    },[symbol])

    console.log(symbol)
    console.log(quote)

    return (
        <View>
            <Text>Stock Symbol:</Text>
            <TextInput
                placeholder='Stock'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setSymbol(text)}
                value={symbol}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <Text>{symbol}</Text>
            {
                quote &&
                <Text>Current Price: {quote.c}</Text>
            }
        </View>
    )
}