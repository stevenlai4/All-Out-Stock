import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function StockCard({ name, shareTotal, avgPrice, quote }) {
    const calcProfitLoss = () => {
        const calcResult = avgPrice * shareTotal - quote?.c * shareTotal;

        if (calcResult > 0) {
            return <Text>Profit: {calcResult.toFixed(2)}</Text>;
        } else if (calcResult === 0) {
            return <Text>Your are in break-even</Text>;
        } else {
            return <Text>Loss: {calcResult.toFixed(2)}</Text>;
        }
    };

    return (
        <View style={styles.root}>
            <Text style={styles.name}>{name}</Text>
            <Text>Current Price: ${quote?.c.toFixed(2)}</Text>
            <Text>Average Price: ${avgPrice.toFixed(2)}</Text>
            {shareTotal ? (
                <>
                    <Text>Share Total: {shareTotal}</Text>
                    {calcProfitLoss()}
                </>
            ) : null}
        </View>
    );
}
