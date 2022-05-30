import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import windowHeight, {windowWidth} from '../utils/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class VisitorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageShowVisitor: 'Visitor',
    };
  }

  componentDidMount() {
    this.checkVisitorSinglePage();
  }

  async checkVisitorSinglePage() {
    try {
      let status = JSON.parse(await AsyncStorage.getItem('SinglePageShow'));
      if (status == true) {
        this.setState({pageShowVisitor: 'VisitorSinglePage'});
      } else {
        this.setState({pageShowVisitor: 'Visitor'});
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <View style={styles.cr}>
        <View style={styles.inp}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(`${this.state.pageShowVisitor}`)
              }>
              <View style={[styles.signIn]}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="log-in-outline"
                    size={28}
                    style={{marginRight: '3%'}}
                    color={'#fff'}
                  />

                  <View style={styles.rightIcon}>
                    <Text style={styles.textSign}>Visitor Entry</Text>
                    <View style={{flex: 1}}>
                      <MaterialIcons
                        name="vibration"
                        size={26}
                        style={{textAlign: 'right'}}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.inp}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('VisitorWithoutMobile')
              }>
              <View style={[styles.signIn]}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="log-in-outline"
                    size={28}
                    style={{marginRight: '3%'}}
                    color={'#fff'}
                  />

                  <View style={[styles.rightIcon, {width: '90%'}]}>
                    <Text style={styles.textSign} numberOfLines={1}>
                      Visitor Entry Without Mobile Number
                    </Text>
                    <View style={{flex: 1}}>
                      <MaterialIcons
                        name="mobile-off"
                        size={26}
                        style={{textAlign: 'right'}}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.inp}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('VisitorWithoutMobile')
              }>
              <View style={[styles.signIn]}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="log-in-outline"
                    size={28}
                    style={{marginRight: '3%'}}
                    color={'#fff'}
                  />

                  <View style={[styles.rightIcon, {width: '90%'}]}>
                    <Text style={styles.textSign} numberOfLines={1}>
                      Visitor Entry By Appointment
                    </Text>
                    <View style={{flex: 1}}>
                      <MaterialIcons
                        name="format-list-bulleted"
                        size={26}
                        style={{textAlign: 'right'}}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={[styles.inp]}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('ReadQr')}>
              <View style={[styles.signIn]}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="log-in-outline"
                    size={28}
                    style={{
                      marginLeft: '0.5%',
                      marginRight: '3%',
                      transform: [{rotate: '-180deg'}],
                    }}
                    color={'#fff'}
                  />

                  <View style={styles.rightIcon}>
                    <Text style={styles.textSign}>Visitor Exit Mobile</Text>

                    <View style={{flex: 1}}>
                      <MaterialIcons
                        name="vibration"
                        size={26}
                        style={{textAlign: 'right'}}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={[styles.inp]}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('ReadQr')}>
              <View style={[styles.signIn]}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="log-in-outline"
                    size={28}
                    style={{
                      marginLeft: '0.5%',
                      marginRight: '3%',
                      transform: [{rotate: '-180deg'}],
                    }}
                    color={'#fff'}
                  />

                  <View style={styles.rightIcon}>
                    <Text style={styles.textSign}>Visitor Exit Code</Text>

                    <View style={{flex: 1}}>
                      <MaterialIcons
                        name="qr-code-scanner"
                        size={26}
                        style={{textAlign: 'right'}}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={[styles.inp]}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('ListInside')}>
              <View style={[styles.signIn]}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="log-in-outline"
                    size={28}
                    style={{
                      marginLeft: '0.5%',
                      marginRight: '3%',
                      transform: [{rotate: '-180deg'}],
                    }}
                    color={'#fff'}
                  />

                  <View style={styles.rightIcon}>
                    <Text style={styles.textSign}>Visitor Exit List</Text>

                    <View style={{flex: 1}}>
                      <MaterialIcons
                        name="format-list-bulleted"
                        size={26}
                        style={{textAlign: 'right'}}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cr: {
    marginBottom: windowWidth / 4,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingLeft: 5,
  },
  textSign: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  rightIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
