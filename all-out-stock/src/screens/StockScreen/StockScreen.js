import React, {useState,useEffect} from 'react'
import { Text, TextInput, View } from 'react-native'
import { finnhubClient } from '../../finnhub/config'
import SearchBar from '../../components/SearchBar/SearchBar';

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
    },[]) 

    console.log(symbol)
    console.log(quote)

    return (
        <View>
            <SearchBar
                term={symbol} 
                onTermChange={(text) => setSymbol(text)}
                onTermSubmit={() => searchApi()} />
            <Text>Stock Symbol: {symbol}</Text>
            {
                quote &&
                <Text>Current Price: {quote.c}</Text>
            }
        </View>
    )
}