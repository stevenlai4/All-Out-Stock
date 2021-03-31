import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './styles';

export default function StockDetailScreen(props) {
    const [stock, setStock] = useState(props.route.params);

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>
            <Text style={[styles.name, styles.centerText]}>{stock.name}</Text>
            <Text style={[styles.currentPrice, styles.centerText]}>
                ${stock.quote.c}
            </Text>
            <View style={styles.cell}>
                <Text style={styles.cellText}>Open</Text>
                <Text style={styles.cellText}>${stock.quote.o}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>High</Text>
                <Text style={styles.cellText}>${stock.quote.h}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>Low</Text>
                <Text style={styles.cellText}>${stock.quote.l}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>Previous Closing</Text>
                <Text style={styles.cellText}>${stock.quote.pc}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.refresh}>Refresh</Text>
            </TouchableOpacity>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Sell</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
