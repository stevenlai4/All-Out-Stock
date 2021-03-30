import React, {useState,useEffect} from 'react'
import { Text, View } from 'react-native'
import { finnhubClient } from '../../finnhub/config'

export default function StockScreen(props) {
    const [keyword, setKeyword] = useState("")
    const [quote, setQuote] = useState({})

    useEffect(()=>{
        setKeyword("IBM")    
    },[])

    useEffect(()=>{
        finnhubClient.quote(keyword, (error, data, response) => {
            setQuote(data)
        })
    },[keyword])

    console.log(quote)

    return (
        <View>
            <Text>{keyword}</Text>
            {
                quote &&
                <Text>Current Price: {quote.c}</Text>
            }
        </View>
    )
}