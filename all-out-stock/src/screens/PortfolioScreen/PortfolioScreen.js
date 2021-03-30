import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import StockCard from '../../components/StockCard/StockCard';
import styles from './styles';

export default function PortfolioScreen({ navigation }) {
    const [user, setUser] = useState({ cash: 50000 });
    const [stocks, setStocks] = useState([
        { company: 'Air Canada', average_price: 20.64 },
        { company: 'Cineplex', average_price: 22.41 },
        { company: 'Nike', average_price: 20.24 },
        { company: 'Amazon', average_price: 20.25 },
        { company: 'Google', average_price: 20.26 },
        { company: 'Fackebook', average_price: 28.24 },
        { company: 'Shopify', average_price: 29.24 },
        { company: 'Bestbuy', average_price: 21.24 },
        { company: 'Roots', average_price: 26.24 },
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
                keyExtractor={(data) => data.company}
                data={stocks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('StockDetail', item)}
                    >
                        <StockCard stock={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
