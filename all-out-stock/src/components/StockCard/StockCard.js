import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function StockCard({ company, average_price }) {
    return (
        <View style={styles.root}>
            <Text style={styles.company}>{company}</Text>
            <Text>{`Average Price: $${average_price}`}</Text>
        </View>
    );
}
