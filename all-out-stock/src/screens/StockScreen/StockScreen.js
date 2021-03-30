import React, {useState,useEffect} from 'react'
import { Text, View } from 'react-native'
import { finnhubClient } from '../../finnhub/config'
import SearchBar from '../../components/SearchBar/SearchBar';
import StockCard from '../../components/StockCard/StockCard'
import styles from './styles';

export default function StockScreen(props) {
    const [symbol, setSymbol] = useState("")
    const [quote, setQuote] = useState()
    const [name, setName] = useState("")
    
    const searchApi = () => {
        finnhubClient.quote(symbol, (error, data, response) => {
            setQuote(data)
        })
        finnhubClient.companyProfile2({'symbol': symbol}, (error, data, response) => {
            setName(data.name)
        })

        finnhubClient.stockSymbols("US", (error, data, response) => {
            console.log(data)
        });
    }

    return (
        <View style={styles.root}>
            <SearchBar
                term={symbol} 
                onTermChange={(text) => setSymbol(text)}
                onTermSubmit={() => searchApi()} />
            {
                quote &&
                <StockCard
                    company={name}
                    current_price={quote.c}
                    average_price={(quote.h + quote.l)/2}
                />
            }
            
        </View>
    )
}