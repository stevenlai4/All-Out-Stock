import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { finnhubClient } from '../../finnhub/config';
import SearchBar from '../../components/SearchBar/SearchBar';
import StockCard from '../../components/StockCard/StockCard';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function StockScreen(props) {
    const [symbol, setSymbol] = useState('');
    const [quote, setQuote] = useState();
    const [name, setName] = useState('');

    const searchApi = () => {
        finnhubClient.quote(symbol, (error, data, response) => {
            setQuote(data);
        });
        finnhubClient.companyProfile2(
            { symbol: symbol },
            (error, data, response) => {
                setName(data.name);
            }
        );
    };

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>
            <SearchBar
                term={symbol}
                onTermChange={(text) => setSymbol(text)}
                onTermSubmit={() => searchApi()}
            />
            {quote && (
                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate('StockDetail', {
                            name,
                            quote,
                            symbol,
                        })
                    }
                >
                    <StockCard
                        name={name}
                        avgPrice={(quote.h + quote.l) / 2}
                        quote={quote}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
