import React from 'react'
import { Text, View } from 'react-native'
import config from "../../../config.json"
import axios from "axios"

export default function StockScreen(props) {
    const axios = require('axios')
    const BASE_URL = "https://finnhub.io/api/v1"
    var keyword = "cineplex"

    axios.get(`${BASE_URL}/search?q=${keyword}&token=${config.FINNHUB_API_KEY}`)
    .then(function(response){
        var bloop = response.data
        console.log(bloop)

    })
    .catch(function (error) {
        console.log(error);
      })

    return (
        <View>
            <Text>This is the Stock Screen</Text>
            
        </View>
    )
}