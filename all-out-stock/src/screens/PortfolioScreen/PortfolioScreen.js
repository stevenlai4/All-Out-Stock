import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import StockCard from '../../components/StockCard/StockCard';
import styles from './styles';
import firebase from 'firebase';
import { finnhubClient } from '../../finnhub/config';
import { useIsFocused } from '@react-navigation/native'

export default function PortfolioScreen({ navigation }) {
    const [positions, setPositions] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [cash, setCash] = useState(0.0);
    const db = firebase.firestore();
    const isFocused = useIsFocused();

    const getUserCash = async (uid) => {
        try {
            // Get user info from firestore database
            const tempUser = await db
                .collection('users')
                .doc(uid)
                .get();

            // Set the user cash state
            setCash(tempUser.data().cash);
        } catch (error) {
            console.error(error);
        }
    }
    
    const calcPortfolioValue = () => {
        var initialValue = 0
        positions.forEach((position) => {
            const quote = quotes.find((quote) => quote.symbol === position.symbol); 
            initialValue += quote?.c * position.shareTotal
        })
        return cash + initialValue
    }

    // CDM
    useEffect(() => {
        (async () => {
            // Get user auth from firestore auth
            const currentUser = firebase.auth().currentUser;

            await getUserCash(currentUser.uid)

            // Set stock quotes and user positions
            db.collection('users')
                .doc(currentUser.uid)
                .collection('transactionSummary')
                .onSnapshot((querySnapshot) => {
                    let tempPositions = [];

                    querySnapshot.forEach((docSnapshot) => {
                        tempPositions.push({ ...docSnapshot.data() });
                    });

                    setPositions(tempPositions);
                });
        })();
    }, [isFocused]);



    useEffect(() => {
        if (positions) {
            positions.forEach((position) => {
                finnhubClient.quote(
                    position.symbol,
                    (error, data, response) => {
                        setQuotes((prev) => [
                            ...prev,
                            { ...data, symbol: position.symbol },
                        ]);
                    }
                );
            });
        }
    }, [positions]);

    

    const createStockCard = ({ item }) => {
        const quote = quotes.find((quote) => quote.symbol === item.symbol);

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
                    avgPrice={item.avgPrice}
                    shareTotal={item.shareTotal}
                    quote={quote}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>
            <Text style={[styles.userCashText, styles.centerText]}>
                Your personal account has: ${cash.toFixed(2)}
            </Text>
            <Text style={[styles.userCashText, styles.centerText]}>
                portfolio value: ${calcPortfolioValue().toFixed(2)}
            </Text>
            <Text style={styles.portfolioText}>Portfolio:</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) =>
                    `${data.name} ${data.price} ${data.share}`
                }
                data={positions}
                renderItem={createStockCard}
            />
        </View>
    );
}
