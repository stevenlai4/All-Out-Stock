import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function StockCard({ name, current_price, average_price }) {
    return (
        <View style={styles.root}>
            <Text style={styles.name}>{name}</Text>
            <Text>Current Price: ${current_price}</Text>
            <Text>Average Price: ${average_price}</Text>
        </View>
    );
}
