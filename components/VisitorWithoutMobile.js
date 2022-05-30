import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  // Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
import {Appbar, Card, Button} from 'react-native-paper';
import {Picker as SelectPicker} from '@react-native-picker/picker';

// import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import IconAntDesign from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';

export class VisitorWithoutMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: 'NOMOB',
      fname: '',
      lname: '',
      loader: false,
      token: '',
      purposeData: [],
      purposeValue: '',
    };
  }

  async componentDidMount() {
    // alert('clear');
    try {
      // await AsyncStorage.clear();
      await AsyncStorage.multiRemove([
        'visitorId',
        'visitorMobile',
        'visitorFirstName',
        'visitorLastName',
        'meetingName',
        'purposeValue',
        'visitTime',
        'slipID',
        'visitorData',
      ]);
      let localData = JSON.parse(await AsyncStorage.getItem('visitorData'));
      console.log('local Data :', localData);
    } catch (error) {
      console.log(error);
    }

    const localMobile = JSON.parse(await AsyncStorage.getItem('visitorMobile'));
    console.log('local data', localMobile);

    this.checkInternet();
  }

  checkInternet() {
    NetInfo.addEventListener(state => {
      console.log('Connection type ', state.type);
      console.log('Is connected? ', state.isConnected);

      if (state.isConnected === true) {
        this.getPurposeData();
      } else {
        ToastAndroid.show(
          'Please Check Network Connection.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    });
  }

  async getPurposeData() {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));

    fetch(`https://ashoka.vizsense.in/api/purpose`, {
      method: 'GET',
      headers: {
        token: tokenn,
        uid: terminal,
      },
    })
      .then(data => {
        data.json().then(async resp => {
          console.log('reasone =>', resp);
          if (resp.response === 'success') {
            this.setState({
              purposeData: resp.data,
            });
            // console.log('puo :', this.state.purposeData);
          } else {
            Alert.alert(
              'Error!',
              'Something wents wrong. Please try again.',
              [{text: 'Ok'}],
              {cancelable: true},
            );
          }
        });
      })
      .catch(error => {
        Alert.alert(
          'Error!',
          'There has been a problem with your fetch operation.',
          [{text: 'Ok'}],
          {cancelable: true},
        );
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }

  onPickerValueChange = (value, index, label) => {
    this.setState(
      {
        purposeValue: value,
        purposeName: this.state.purposeData[index].purpose,
      },
      // () => {
      //   console.log(this.state.purposeData[index].p_name);
      // },
    );
  };

  check() {
    if (
      this.state.mobile !== '' &&
      this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.purposeValue !== ''
    ) {
      console.log('purposeValue', this.state.purposeValue);
      this.addVisitorData();
    } else {
      Alert.alert('Wrong Input', 'Please fill all the fields.', [
        {text: 'Okay'},
      ]);
      this.setState({
        loader: false,
      });
    }
  }

  async addVisitorData() {
    this.setState({
      loader: true,
    });

    try {
      await AsyncStorage.setItem(
        'visitorMobile',
        JSON.stringify(this.state.mobile),
      );

      await AsyncStorage.setItem(
        'visitorFirstName',
        JSON.stringify(this.state.fname),
      );

      await AsyncStorage.setItem(
        'visitorLastName',
        JSON.stringify(this.state.lname),
      );

      await AsyncStorage.setItem(
        'purposeValue',
        JSON.stringify(this.state.purposeValue),
      );

      this.props.navigation.navigate('VisitorReason');
      this.setState({
        loader: false,
      });
    } catch (error) {
      console.log('local storage post error :' + error);
      this.setState({
        loader: false,
      });
    }

    console.warn(
      'local',
      await AsyncStorage.getItem('visitorMobile'),
      await AsyncStorage.getItem('visitorFirstName'),
      await AsyncStorage.getItem('visitorLastName'),
      await AsyncStorage.getItem('purposeValue'),
    );
  }

  render() {
    return (
      <SafeAreaView
        animation="fadeInRight"
        // duration="1000"
        style={{flex: 1, backgroundColor: '#fff'}}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>
          <Appbar.Content title="Visitor Without Mobile Entry - Ashoka University, Sonipat" />
        </Appbar.Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cr}>
            <View style={styles.cardShadow}>
              <View style={styles.mgt}>
                <View style={styles.cdm}>
                  <View style={{marginBottom: '5%'}}>
                    <Text style={{color: '#959595'}}>
                      Please enter the details...
                    </Text>
                  </View>

                  <Text style={[styles.text_footer]}>Mobile Number</Text>

                  <View
                    style={[
                      {width: '100%', flexDirection: 'row', marginTop: 10},
                    ]}>
                    <View style={[styles.action, styles.nomob]}>
                      <Entypo
                        name="mobile"
                        color="#05375a"
                        size={20}
                        style={{paddingTop: 10, marginLeft: 2}}
                      />

                      <TextInput
                        selectTextOnFocus={false}
                        editable={false}
                        label="Number"
                        maxLength={10}
                        keyboardType="numeric"
                        returnKeyType="next"
                        placeholder="Mobile Number"
                        style={[styles.textInput, {paddingTop: 18}]}
                        value="NOMOB"
                        onChangeText={text => this.setState({mobile: text})}
                        // onBlur={e => this.getVisitorData(e)}
                      />
                    </View>
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: '20%',
                      }}>
                      <IconAntDesign
                        name="search"
                        size={25}
                        color="#696969"
                        style={{marginLeft: '5%'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cdm}>
                  <Text style={[styles.text_footer]}>First Name</Text>
                  <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />

                    <TextInput
                      label="First Name"
                      mode="outlined"
                      keyboardType="default"
                      returnKeyType="next"
                      placeholder="First Name"
                      style={styles.textInput}
                      value={this.state.fname}
                      onChangeText={fname => this.setState({fname: fname})}
                    />
                  </View>
                </View>

                <View style={styles.cdm}>
                  <Text style={[styles.text_footer]}>Last Name</Text>
                  <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />

                    <TextInput
                      label="Last Name"
                      mode="outlined"
                      keyboardType="default"
                      placeholder="Last Name"
                      style={styles.textInput}
                      value={this.state.lname}
                      returnKeyType="next"
                      onChangeText={text => this.setState({lname: text})}
                    />
                  </View>
                </View>

                <View style={styles.cdm}>
                  <Text style={[styles.text_footer]}>Purpose of meeting</Text>
                  <View style={[styles.action, {marginTop: 0}]}>
                    <FontAwesome
                      name="user-o"
                      color="#05375a"
                      size={20}
                      style={{marginTop: 15}}
                    />

                    <SelectPicker
                      style={{width: '100%', marginTop: 0, padding: 0}}
                      // mode="dropdown"
                      selectedValue={this.state.purposeValue}
                      onValueChange={(value, index, label) => {
                        this.onPickerValueChange(value, index, label),
                          this.setState({
                            purposeIndexValue: value,
                          });
                      }}>
                      {this.state.purposeData.map((item, i) => (
                        <SelectPicker.item
                          label={item.purpose}
                          color="#6f6f6f"
                          value={item.purposeId}
                        />
                      ))}
                    </SelectPicker>
                  </View>
                </View>
              </View>

              <View
                style={[styles.inp, {marginTop: '10%', marginBottom: '5%'}]}>
                <View style={styles.cdm}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.wd}>
                      <LinearGradient
                        colors={['#fe8c00', '#fe8c00']}
                        style={{borderRadius: 5}}>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.goBack()}
                          style={[
                            styles.touchBack,
                            {justifyContent: 'center', alignItems: 'center'},
                          ]}>
                          <Text
                            style={{
                              padding: '5%',
                              marginTop: '2%',
                            }}>
                            <AntDesign
                              name="arrowleft"
                              size={20}
                              style={{color: 'white'}}
                            />
                          </Text>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              marginRight: '5%',
                              fontSize: 16,
                            }}>
                            Back
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>

                    <View style={styles.wd}></View>

                    <View style={styles.wd}>
                      <LinearGradient
                        colors={['#fe8c00', '#fe8c00']}
                        style={{borderRadius: 5}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.check();
                          }}
                          style={[
                            styles.touchBack,
                            {justifyContent: 'center', alignItems: 'center'},
                          ]}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              // marginTop: '5%',
                              marginLeft: '10%',
                              fontSize: 16,
                            }}>
                            Next
                          </Text>
                          <Text style={{padding: '5%', marginTop: '2%'}}>
                            <AntDesign
                              name="arrowright"
                              size={20}
                              style={{color: 'white'}}
                            />
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            // position: 'relative',
            // bottom: 0,
            marginBottom: '3%',
            marginLeft: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.link}>
            <Image
              source={require('./image/partner.png')}
              style={{width: 200, height: 35}}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cardShadow: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ttl: {
    backgroundColor: '#ffffff',
  },
  cl: {
    color: '#6f6f6f',
  },
  wd: {
    width: '33%',
  },
  cr: {
    height: '100%',
    margin: '5%',
    marginTop: '5%',
  },
  cdm: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
  },
  mgt: {
    marginTop: '10%',
  },
  inp: {
    marginBottom: '5%',
  },

  touchBack: {
    flexDirection: 'row',
    // backgroundColor: '#0d6efd',
    padding: '5%',
    borderRadius: 5,
    width: '100%',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 12,
    color: '#05375a',
  },
  nomob: {
    borderWidth: 1,
    borderColor: '#000',
    borderBottomColor: '#000',
    borderRadius: 5,
    width: '80%',
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
    marginTop: 0,
    borderRightWidth: 0,
  },
});

export default VisitorWithoutMobile;
