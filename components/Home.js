import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Appbar, Button, Card, Title, Paragraph} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';

import HomeScreen from './HomeScreen1';
import RNExitApp from 'react-native-exit-app';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      name: '',
      totalVisitor: [],
      todaysVisitor: '',

      vendor: 'https://ashoka.vizsense.in/api/vendors',

      UrlData: [
        {
          ashokaUrl: 'https://ashoka.vizsense.in/api/vendors',
          fileExt: '/AshokaVendor',
        },
        {
          ashokaUrl: 'https://ashoka.vizsense.in/api/downloadSS?vendorId=0',
          fileExt: '/SupportStaff',
        },
        {
          ashokaUrl: 'https://ashoka.vizsense.in/api/searchEmp?prefix=',
          fileExt: '/AshokaEmployee',
        },
      ],

      deleteFiles: [
        {delLocal: '/storage/emulated/0/Download/AshokaVendor.json'},
        {delLocal: '/storage/emulated/0/Download/SupportStaff.json'},
        {delLocal: '/storage/emulated/0/Download/AshokaEmployee.json'},
      ],

      deleteStatus: false,
      showpop: false,
    };
  }

  toastAndroid() {
    ToastAndroid.show('Disable', ToastAndroid.LONG, ToastAndroid.BOTTOM);
  }

  logOut() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.disableBackButton(),
    );
  }

  disableBackButton() {
    Alert.alert(
      '',
      'Do you want to log out  from app ?',
      [
        {text: 'Yes', onPress: () => this.clearToken()},
        {text: 'No', onPress: () => console.warn('No Pressed')},
      ],
      {cancelable: true},
    );
    return true;
  }

  async clearToken() {
    await AsyncStorage.clear();
    RNExitApp.exitApp();
    // BackHandler.exitApp();
  }

  async componentDidMount() {
    // const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));
    // alert(terminal)
    this.getTotalEntry();
    // this.continueCall();
    this.checkInternet();
  }



  checkInternet() {
    NetInfo.addEventListener(state => {
      console.log('Connection type ', state.type);
      console.log('Is connected? ', state.isConnected);

      if (state.isConnected === true) {
        this.state.deleteStatus = true;
        this.setState({
          showpop: false,
        });
      } else {
        console.log('for check');
        (this.state.deleteStatus = false),
          this.setState({
            showpop: true,
          });
      }
    });
  }

  continueCall() {
    setInterval(() => {
      this.getTotalEntry();
    }, 6000);
  }

  async getTotalEntry() {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));

    this.setState({
      token: tokenn,
      terminalId: terminal,
    });

    console.log('token ', tokenn, terminal);

    fetch(`https://ashoka.vizsense.in/api/tiles`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        token: tokenn,
        uid: terminal,
      },
    })
      .then(data => {
        data.json().then(async resp => {
          console.log(resp.data[1].name);
          if (resp.response === 'success') {
            this.setState({
              totalVisitor: resp.data,
              todaysVisitor: resp.data[0].name,
              todaysVisitorCount: resp.data[0].count,
              WithinPremisesCount: resp.data[1].count,
              WithinPremises: resp.data[1].name,
            });
            console.log(this.state);
          }
        });
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Appbar.Header style={styles.ttl}>
          <Appbar.Content title="VIZSENSE - Ashoka University, Sonipat" />
          <View style={{marginRight: 5}}>
            <Appbar.Content
              title={
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                  }}>
                  {'  '}
                  {this.state.todaysVisitorCount}
                </Text>
              }
              subtitle={this.state.todaysVisitor}
              color="#959595"
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ListInside')}>
            <Appbar.Content
              title={
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                  }}>
                  {'   '}
                  {this.state.WithinPremisesCount}
                </Text>
              }
              subtitle={this.state.WithinPremises}
              color="#959595"
              style={{}}
            />
          </TouchableOpacity>
          <Feather
            name="user"
            color="#05375a"
            size={30}
            style={{marginRight: 15, marginLeft: 10}}
          />
        </Appbar.Header>

        <ScrollView showsVerticalScrollIndicator={false} animated={true}>
          <View style={styles.cardShadow}>
            <View style={styles.cdm}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#959595'}}>
                  Select the option below to proceed further...
                </Text>
              </View>

              <HomeScreen navigation={this.props.navigation} />

              {/* ----------------VISITOR------------------------------------------ */}

              {/* <View style={styles.cr}>

                <View style={styles.inp}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Visitor')}>
                    <View style={[styles.signIn]}>
                      <View style={{flexDirection: 'row'}}>
                        <Feather
                          name="user"
                          size={25}
                          style={{marginRight: '3%'}}
                        />
                        <Text style={styles.textSign}>Visitor Entry</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.inp}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.props.navigation.navigate('VisitorWithoutMobile')
                    }>
                    <View style={[styles.signIn]}>
                      <View style={{flexDirection: 'row', width: '97%'}}>
                        <Feather
                          name="user"
                          size={25}
                          style={{marginRight: '3%'}}
                        />
                        <Text style={styles.textSign} numberOfLines={1}>
                          Visitor Entry - Without Mobile Number
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inp, {marginBottom: 0}]}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('ReadQr')}>
                    <View style={[styles.signIn]}>
                      <View style={{flexDirection: 'row'}}>
                        <Feather
                          name="user"
                          size={25}
                          style={{marginRight: '3%'}}
                        />
                        <Text style={styles.textSign}>Visitor Exit</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}

              {/* ---------------------EMPLOYEE------------------------------------------ */}
              {/* <View style={styles.cr}>
                <View
                  style={[styles.inp, {marginBottom: 0, borderBottomWidth: 0}]}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.props.navigation.navigate('EmployeeIn')
                    }>
                    <View style={[styles.signIn]}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('./image/employee1.png')}
                          style={{marginRight: '3%', width: 26, height: 26}}
                        />
                        <Text style={styles.textSign}>Employee</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}

              {/* ---------------STAFF----------------------------------- */}

              {/* <View style={styles.cr}>
                <View
                  style={[styles.inp, {marginBottom: 0, borderBottomWidth: 0}]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Staff')}>
                    <View style={[styles.signIn]}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('./image/staff.png')}
                          style={{marginRight: '3%', width: 30, height: 30}}
                        />
                        <Text style={styles.textSign}>Support Staff</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}

              {/* <View style={[styles.inp, styles.cr]}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.logOut()}>
                  <View style={[styles.signIn]}>
                    <View style={{flexDirection: 'row'}}>
                      <Feather
                        name="log-out"
                        size={22}
                        style={{marginRight: '3%'}}
                      />
                      <Text style={styles.textSign}>Log Out</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View> */}
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => this.logOut()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '5%',
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center',flexDirection:'column'}}>
                  <Feather
                    color={'#fe8c00'}
                    name="log-out"
                    size={25}
                    // style={{marginLeft: 10}}
                  />
                  <Text style={{color: '#fe8c00', fontSize: 17,marginTop:'10%'}}>Exit</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginBottom: '2%',
                  // marginLeft: '5%',
                  // alignItems: 'center',
                }}>
                <View style={[styles.link,{flexDirection:'column',justifyContent:'center',alignItems:"center"}]}>
                  <Image
                    source={require('./image/partner.png')}
                    style={{width: 200, height: 35}}
                  />
                  <Text style={{color:"#000",fontSize:12,marginTop:'5%'}}>V 3.1</Text>
                </View>
              </View>

              <TouchableOpacity
              onPress={()=>this.props.navigation.push('Setting')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '5%',
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center',flexDirection:'column'}}>
                  <MaterialCommunityIcons
                    color={'#fe8c00'}
                    name="playlist-edit"
                    size={30}
                    style={{padding: 0,margin:0}}
                  />
                  <Text style={{color: '#fe8c00', fontSize: 15}}>Admin</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* -------------------SHOW-POP-UP--------------------------------- */}
          {this.state.showpop ? (
            <>
              <View style={styles.popbackgrnd}></View>
              <Animatable.View style={styles.ops} animation={'fadeInUpBig'}>
                <View style={styles.contend}>
                  <MaterialIcons
                    size={55}
                    name="signal-wifi-off"
                    color={'#fe8c00'}
                  />
                  <Text style={styles.mnmsg}>OPPS!</Text>
                </View>
                <Text style={styles.msg}>
                  The server is taking too long to respond OR something is wrong
                  with your internet connection. Please try again later.
                </Text>

                <View style={styles.btnr}>
                  <TouchableOpacity
                    style={styles.btnt}
                    onPress={() => this.checkInternet()}>
                    <Text style={{fontSize: 16, color: '#fff'}}>RETRY</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </>
          ) : null}

          {/* ------------Bottom--------------------- */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    paddingBottom: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  linkS: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ttl: {
    backgroundColor: '#ffffff',
  },
  cr: {
    padding: '5%',
    marginBottom: '5%',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cdm: {
    width: '92%',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
  },
  inp: {
    marginBottom: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#05375a',
  },
  totalentry: {
    width: '77%',
    flexDirection: 'row',
    padding: 5,
  },
  totalText: {
    width: '80%',
  },
  totalCount: {
    width: '30%',
  },

  popbackgrnd: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
  },
  ops: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '20%',
    margin: '5%',
    backgroundColor: '#fff',
    elevation: 5,
    padding: '5%',
    borderRadius: 5,
  },
  contend: {justifyContent: 'center', alignItems: 'center', width: '100%'},
  mnmsg: {textAlign: 'center', fontSize: 25, marginBottom: '3%'},
  msg: {textAlign: 'center', fontSize: 15, color: '#0C0B0B'},
  btnr: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  btnt: {
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#fe8c00',
    width: '50%',
    padding: 8,
  },
});
