import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import {Appbar, Card} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({title,navigation}) => {
    
  return (
    <>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>

          <Appbar.Content title={title} />
        </Appbar.Header>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
    ttl: {
        backgroundColor: '#ffffff',
      },
})