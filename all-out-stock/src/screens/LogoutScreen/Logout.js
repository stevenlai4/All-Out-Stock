import React from 'react'
import { View } from 'react-native'
import {LoginScreen} from '../index'
import { firebase } from '../../firebase/config'

export default function SignOut({navigation}) {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login', {user: null})
  }).catch((error) => {
      alert(error)
  });
  return (
    <View>
      <LoginScreen />
    </View>
  )
}