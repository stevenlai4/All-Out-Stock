import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function StockDetailScreen(porps) {
    const [name, setName] = useState('Apple Inc.');
    const [quote, setQuote] = useState({
        c: 261.74,
        h: 263.31,
        l: 260.68,
        o: 261.07,
        pc: 259.45,
        t: 1582641000,
    });

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>
            <Text style={[styles.name, styles.centerText]}>{name}</Text>
            <Text style={[styles.currentPrice, styles.centerText]}>
                ${quote.c}
            </Text>
            <View style={styles.cell}>
                <Text style={styles.cellText}>Open</Text>
                <Text style={styles.cellText}>${quote.o}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>High</Text>
                <Text style={styles.cellText}>${quote.h}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>Low</Text>
                <Text style={styles.cellText}>${quote.l}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>Previous Closing</Text>
                <Text style={styles.cellText}>${quote.pc}</Text>
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
