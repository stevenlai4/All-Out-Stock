import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function StockCard({ name, avgPrice, quote }) {
    return (
        <View style={styles.root}>
            <Text style={styles.name}>{name}</Text>
            <Text>Current Price: ${quote?.c.toFixed(2)}</Text>
            <Text>Average Price: ${avgPrice.toFixed(2)}</Text>
        </View>
    );
}
