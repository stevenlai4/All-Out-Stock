import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import StockCard from '../../components/StockCard/StockCard';
import styles from './styles';
import firebase from 'firebase';
import { finnhubClient } from '../../finnhub/config';

export default function PortfolioScreen({ navigation }) {
    const [positions, setPositions] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const db = firebase.firestore();

    // CDM
    useEffect(() => {
        const currentUser = firebase.auth().currentUser;

        db.collection('users')
            .doc(currentUser.uid)
            .collection('transaction')
            .onSnapshot((querySnapshot) => {
                const tempPositions = [];

                querySnapshot.forEach((docSnapshot) => {
                    tempPositions.push({ ...docSnapshot.data() });

                    finnhubClient.quote(
                        docSnapshot.data().symbol,
                        (error, data, response) => {
                            setQuotes([...quotes, data]);
                        }
                    );
                });

                setPositions(tempPositions);
            });
    }, []);

    const createStockCard = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('StockDetail', {
                        name: item.name,
                        quote: quotes[index],
                    })
                }
            >
                <StockCard name={item.name} quote={quotes[index]} />
            </TouchableOpacity>
        );
    };

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
                renderItem={createStockCard}
            />
        </View>
    );
}
