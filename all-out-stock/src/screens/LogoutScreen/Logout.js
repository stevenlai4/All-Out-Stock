import React from 'react'
import { firebase } from '../../firebase/config'

export default function SignOut() {
    firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  return
}