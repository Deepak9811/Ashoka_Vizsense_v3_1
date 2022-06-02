import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import windowHeight, { windowWidth } from '../utils/Dimensions'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'

const SupportStafList = ({navigation}) => {
  return (
    <View style={styles.cr}>
      <View style={styles.inp}>
          <LinearGradient
           colors={['#fe8c00', '#fe8c00']}
          >
        <TouchableOpacity onPress={() => navigation.navigate('StaffEntryMobile')}>
          <View style={[styles.signIn]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="log-in-outline" size={28} style={{marginRight: '3%'}} color={"#fff"} />

              <View style={styles.rightIcon}>
              <Text style={styles.textSign}>S.Staff Entry With Mobile</Text>
                <View style={{ flex:1}}>
                <MaterialIcons name="vibration" size={25} style={{textAlign:"right"}} color={"#fff"} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
          </LinearGradient>
          
      </View>

      <View style={[styles.inp,]}>
        <LinearGradient    colors={['#fe8c00', '#fe8c00']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StaffEntryQR')}>
            <View style={[styles.signIn]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="log-in-outline" size={28} style={{marginRight: '3%'}} color={"#fff"} />
             
              <View style={styles.rightIcon}>
              <Text style={styles.textSign}>S.Staff Entry With QR</Text>

               <View style={{ flex:1}}>
                <MaterialIcons name="qr-code-scanner" size={25} style={{textAlign:"right"}} color={"#fff"} />
                </View>
              </View>
            </View>
          </View>
        
        </TouchableOpacity>
            </LinearGradient>
      </View>

      <View style={[styles.inp, ]}>
        <LinearGradient    colors={['#fe8c00', '#fe8c00']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Staff')}>
              <View style={[styles.signIn]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="log-in-outline" size={28} style={{marginRight: '3%'}} color={"#fff"} />
             
              <View style={styles.rightIcon}>
              <Text style={styles.textSign}>S.Staff Entry From Vendor List</Text>

               <View style={{ flex:1}}>
                <MaterialIcons name="format-list-bulleted" size={25} style={{textAlign:"right"}} color={"#fff"} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
            </LinearGradient>
      
      </View>

      <View style={styles.inp}>
          <LinearGradient
           colors={['#fe8c00', '#fe8c00']}
          >
        <TouchableOpacity onPress={() => navigation.navigate('StaffExitMobile')}>
          <View style={[styles.signIn]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="log-in-outline" size={28} style={{marginLeft:"0.5%",marginRight: '3%',transform: [{rotate: '-180deg'}]}} color={"#fff"} />

              <View style={styles.rightIcon}>
              <Text style={styles.textSign}>S.Staff Exit With Mobile</Text>
                <View style={{ flex:1}}>
                <MaterialIcons name="vibration" size={25} style={{textAlign:"right"}} color={"#fff"} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
          </LinearGradient>
          
      </View>


      <View style={[styles.inp,]}>
        <LinearGradient    colors={['#fe8c00', '#fe8c00']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StaffExitCode')}>
            <View style={[styles.signIn]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="log-in-outline" size={28} style={{marginLeft:"0.5%",marginRight: '3%',transform: [{rotate: '-180deg'}]}} color={"#fff"} />
             
              <View style={styles.rightIcon}>
              <Text style={styles.textSign}>S.Staff Exit With Code</Text>

               <View style={{ flex:1}}>
                <MaterialIcons name="qr-code-scanner" size={25} style={{textAlign:"right"}} color={"#fff"} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
            </LinearGradient>
        
      </View>


      <View style={[styles.inp, ]}>
        <LinearGradient    colors={['#fe8c00', '#fe8c00']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StaffInList')}>
              <View style={[styles.signIn]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="log-in-outline" size={28} style={{marginLeft:"0.5%",marginRight: '3%',transform: [{rotate: '-180deg'}]}} color={"#fff"} />
             
              <View style={styles.rightIcon}>
              <Text style={styles.textSign}>S.Staff Exit From Vendor IN List</Text>

               <View style={{ flex:1}}>
                <MaterialIcons name="format-list-bulleted" size={25} style={{textAlign:"right"}} color={"#fff"} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
            </LinearGradient>
      
      </View>
    </View>
  );
};

export default SupportStafList;

const styles = StyleSheet.create({
  cr: {
    marginBottom: windowWidth/4,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  inp: {
    marginBottom: '4%',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    shadowColor:'#000',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.18,
    shadowRadius: 1.0,
    elevation:1,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal:10,
    paddingLeft:5
  },
  textSign: {
    fontSize: 17,
    fontWeight: 'bold',
    color: "#fff",
  },
  rightIcon:{
    flexDirection:'row',
    justifyContent:"space-between",
    width:'90%'
  }
});
