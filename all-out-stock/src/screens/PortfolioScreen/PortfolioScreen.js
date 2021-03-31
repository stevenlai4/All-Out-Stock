import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import StockCard from '../../components/StockCard/StockCard';
import styles from './styles';

export default function PortfolioScreen({ navigation }) {
    const [user, setUser] = useState({ cash: 50000 });
    const [stocks, setStocks] = useState([
        { name: 'Air Canada', curret_price: 21.55, average_price: 20.64 },
        { name: 'Cineplex', curret_price: 21.55, average_price: 22.41 },
        { name: 'Nike', curret_price: 21.55, average_price: 20.24 },
        { name: 'Amazon', curret_price: 21.55, average_price: 20.25 },
        { name: 'Google', curret_price: 21.55, average_price: 20.26 },
        { name: 'Fackebook', curret_price: 21.55, average_price: 28.24 },
        { name: 'Shopify', curret_price: 21.55, average_price: 29.24 },
        { name: 'Bestbuy', curret_price: 21.55, average_price: 21.24 },
        { name: 'Roots', curret_price: 21.55, average_price: 26.24 },
    ]);

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>
            <Text style={[styles.userCashText, styles.centerText]}>
                Your personal account has: ${user.cash.toFixed(2)}
            </Text>
            <Text style={styles.portfolioText}>Portfolio:</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) => data.name}
                data={stocks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('StockDetail', {
                                name: item.name,
                                quote: {
                                    c: 22.35,
                                    o: 21.24,
                                    h: 24.22,
                                    l: 20.11,
                                    pc: 23.0,
                                },
                            })
                        }
                    >
                        <StockCard
                            name={item.name}
                            current_price={item.curret_price}
                            average_price={item.average_price}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
