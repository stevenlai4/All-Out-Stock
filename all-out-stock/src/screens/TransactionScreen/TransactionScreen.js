import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import firebase from 'firebase'

export default function TransactionScreen(props) {
    const [share, setShare] = useState(0)
    const [avgPrice, setAvgPrice] = useState(0)
    const stock = props.route.params.stock;
    const isBuying = props.route.params.isBuying
    
    const db = firebase.firestore()
    const uid = "jzWwiZ0QMKfKp3OHAhoxWGqoQWB2"

    var totalShare = 0
    var totalPrice = 0

    const handleBuyTransaction = async () => {
        
        await db.collection("users").doc(uid).collection("transaction").add({name: stock.name, price: stock.quote.c, share: parseInt(share)});
        const transactions = await db.collection("users").doc(uid).collection("transaction").get({name: stock.name})
        transactions.forEach((transaction) => {
            totalShare += transaction.data().share
            totalPrice += transaction.data().price * transaction.data().share
        })
        setAvgPrice(totalPrice/totalShare)
    }

    const handleSellTransaction = async () => {
        
        await db.collection("users").doc(uid).collection("transaction").add({name: stock.name, price: stock.quote.c, share: parseInt(-share)});
        const transactions = await db.collection("users").doc(uid).collection("transaction").get({name: stock.name})
        transactions.forEach((transaction) => {
            totalShare += transaction.data().share
            totalPrice += transaction.data().price * transaction.data().share
        })
        setAvgPrice(totalPrice/totalShare)
    }

    return (
        <View style={styles.root}>
            <Text style={[styles.logo, styles.centerText]}>All Out Stock</Text>

            <Text> How many shares of {stock.name} do you want to buy?</Text>
            
            <TextInput style={styles.text} placeholder="0" keyboardType="numeric" onChangeText={(text) => setShare(text)}> </TextInput>
            <Text>
                {stock.name} Price: ${stock.quote.c}
            </Text>
            <Text>
                Average cost/share: ${avgPrice}
            </Text>
            <Text>
                Available to trade: $100
            </Text>


            <View style={styles.btnContainer}>
                {
                    isBuying &&
                    <TouchableOpacity style={styles.button} onPress={()=>{handleBuyTransaction()}}>
                        <Text style={styles.btnText}>Buy</Text>
                    </TouchableOpacity> ||
                    <TouchableOpacity style={styles.button} onPress={()=>{handleSellTransaction()}}>
                    <Text style={styles.btnText}>Sell</Text>
                </TouchableOpacity>
                }
                
            </View>
        </View>
    );
}
