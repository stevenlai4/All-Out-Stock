import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import firebase from 'firebase';

export default function TransactionScreen(props) {
    const [share, setShare] = useState(0);
    const [avgPrice, setAvgPrice] = useState(0);
    const [trade, setTrade] = useState(0);
    const [uid, setUid] = useState('');
    const stock = props.route.params.stock;
    const isBuying = props.route.params.isBuying;

    const db = firebase.firestore();

    var totalShare = 0;
    var totalPrice = 0;
    var totalTrade = 50000;
    var data = null;
    var holdShare = 0;

    useEffect(() => {
        const currUser = firebase.auth().currentUser;
        setUid(currUser.uid);
    }, []);

    const handleBuyTransaction = async () => {
        await db
            .collection('users')
            .doc(uid)
            .collection('transaction')
            .add({
                name: stock.name,
                price: stock.quote.c,
                share: parseInt(share),
            });
        const transactions = await db
            .collection('users')
            .doc(uid)
            .collection('transaction')
            .where('name', '==', stock.name)
            .get();
        const transactionSummarys = await db
            .collection('users')
            .doc(uid)
            .collection('transactionSummary')
            .where('name', '==', stock.name)
            .get();
        transactions.forEach((transaction) => {
            totalShare += transaction.data().share;
            totalPrice += transaction.data().price * transaction.data().share;
        });
        setAvgPrice(totalPrice / totalShare);
        setTrade((totalTrade -= totalPrice));
        transactionSummarys.forEach((transactionSummary) => {
            data = transactionSummary.data().name;
        });
        if (data === null) {
            await db
                .collection('users')
                .doc(uid)
                .collection('transactionSummary')
                .doc(stock.name)
                .set({
                    name: stock.name,
                    symbol: stock.symbol,
                    avgPrice: avgPrice,
                    shareTotal: totalShare,
                });
        } else {
            await db
                .collection('users')
                .doc(uid)
                .collection('transactionSummary')
                .doc(stock.name)
                .update({ avgPrice: avgPrice, shareTotal: totalShare });
        }
    };

    const handleSellTransaction = async () => {
        const transactionSummarys = await db
            .collection('users')
            .doc(uid)
            .collection('transactionSummary')
            .where('name', '==', stock.name)
            .get();
        transactionSummarys.forEach((transactionSummary) => {
            holdShare = transactionSummary.data().shareTotal;
        });
        if (holdShare >= share) {
            await db
                .collection('users')
                .doc(uid)
                .collection('transaction')
                .add({
                    name: stock.name,
                    price: stock.quote.c,
                    share: parseInt(-share),
                });
            const transactions = await db
                .collection('users')
                .doc(uid)
                .collection('transaction')
                .where('name', '==', stock.name)
                .get();
            transactions.forEach((transaction) => {
                totalShare += transaction.data().share;
                totalPrice +=
                    transaction.data().price * transaction.data().share;
            });
            setAvgPrice(totalPrice / totalShare);
            setTrade((totalTrade -= totalPrice));
            await db
                .collection('users')
                .doc(uid)
                .collection('transactionSummary')
                .doc(stock.name)
                .update({ avgPrice: avgPrice, shareTotal: totalShare });
        } else {
            alert("You don't have enough share to sell");
        }
    };

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>

            <Text> How many shares of {stock.name} do you want to buy?</Text>

            <TextInput
                style={styles.text}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => setShare(text)}
            >
                {' '}
            </TextInput>
            <Text>
                {stock.name} Price: ${stock.quote.c}
            </Text>
            <Text>Average cost/share: ${avgPrice}</Text>
            <Text>Available to trade: ${trade}</Text>

            <View style={styles.btnContainer}>
                {(isBuying && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleBuyTransaction();
                        }}
                    >
                        <Text style={styles.btnText}>Buy</Text>
                    </TouchableOpacity>
                )) || (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleSellTransaction();
                        }}
                    >
                        <Text style={styles.btnText}>Sell</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
