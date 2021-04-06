import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import StockCard from '../../components/StockCard/StockCard';
import styles from './styles';
import firebase from 'firebase';
import { finnhubClient } from '../../finnhub/config';
import axios from 'axios';

export default function PortfolioScreen({ navigation }) {
    const [user] = useState({
        id: 'jzWwiZ0QMKfKp3OHAhoxWGqoQWB2',
        fullName: 'Anthony Chan',
        email: 'anthonychan_74@hotmail.com',
        cash: 50000,
    });
    //const [quote, setQuote] = useState({});
    const [positions, setPositions] = useState([]);
    const db = firebase.firestore();

    // CDM
    useEffect(() => {
        db.collection('users')
            .doc(user.id)
            .collection('transaction')
            .onSnapshot((querySnapshot) => {
                const tempPositions = [];

                querySnapshot.forEach((docSnapshot) => {
                    tempPositions.push({ ...docSnapshot.data() });
                });

                setPositions(tempPositions);
            });
    }, []);

    // Fetch stock api
    const searchApi = async (symbol) => {
        try {
            const response = await axios.get(
                `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
                {
                    headers: {
                        'X-Finnhub-Token': 'c1hm37n48v6q1s3o4krg',
                    },
                }
            );

            if (response) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    //const createStockCard = async ({ item }) => {};

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>
            <Text style={[styles.userCashText, styles.centerText]}>
                Your personal account has: ${user.cash.toFixed(2)}
            </Text>
            <Text style={styles.portfolioText}>Portfolio:</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) =>
                    `${data.name} ${data.price} ${data.share}`
                }
                data={positions}
                renderItem={async ({ item }) => {
                    try {
                        const quote = await searchApi(item.symbol);

                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('StockDetail', {
                                        name: item.name,
                                        quote,
                                    })
                                }
                            >
                                <StockCard
                                    name={item.name}
                                    current_price={quote.c}
                                    average_price={25}
                                />
                            </TouchableOpacity>
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }}
            />
        </View>
    );
}
