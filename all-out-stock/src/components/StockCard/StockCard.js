import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function StockCard({ stock }) {
    return (
        <View style={styles.root}>
            <Text style={styles.company}>{stock.company}</Text>
            <Text>{`Average Price: $${stock.average_price}`}</Text>
        </View>
    );
}
