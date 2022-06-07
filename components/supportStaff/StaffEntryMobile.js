import React,{useState,useEffect} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import Header from '../custom/Header';

import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import IconAntDesign from 'react-native-vector-icons/MaterialIcons';

const StaffEntryMobile = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [mobileData, setmobileData] = useState([{'person1':9811929305},{'person2':8285896425}])
  const [personData, setpersonData] = useState([])
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [vendor, setvendor] = useState('')
  const [joinedon, setjoinedon] = useState('')
  const [image, setimage] = useState('')
  const [showImage, setshowImage] = useState(true)
  const [validtill, setvalidtill] = useState('')
  const [showDetails, setshowDetails] = useState(false)
  const [loader, setloader] = useState(false)

  const searchMobile=()=>{
    if(mobileData[1]=== mobile){
      setshowDetails(true)
    }else{
      Alert.alert('Error!','NO data found',[{text:'Ok'}],{cancelable:true})
    }
  }

  const searchVendor=async()=>{
    let url = `https://ashoka.vizsense.in/api/supportstaff?vendorId=1&prefix=&staffId=26 `

    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));
    const loc = await AsyncStorage.getItem('staffId');
    const purp = await AsyncStorage.getItem('purposeValue');

    console.log(loc, purp);
    fetch(url,
      {
        method: 'GET',
        headers: {
          token: tokenn,
          uid: terminal,
        },
      },
    )
      .then(result => {
        result.json().then(resp => {
          console.log('userAddress : ', resp.data[0]);

          if (resp.response === 'success') {
            setpersonData( resp.data[0])
            this.setState({
              employeeId: resp.data[0].employeeId,
              fname: resp.data[0].fname,
              lname: resp.data[0].lname,
              vendor: resp.data[0].vendor,
              mobile: resp.data[0].mobile,
              joinedon: resp.data[0].joinedon,
              validtill: resp.data[0].validtill,

              showPhoto: true,
              loader: false,
            });

            if (resp.data[0].photo === '') {
              console.log('empt');
              this.setState({
                showPhoto: false,
              });
            } else {
              this.setState({
                image1: resp.data[0].photo,
                showPhoto: true,
              });
            }
          } else {
            this.setState({
              loader: false,
            });
            ToastAndroid.show(
              'Something wents wrong.',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          }

          // console.log(this.state.image);
        });
      })
      .catch(error => {
        this.setState({
          loader: false,
        });
        Alert.alert('Error', error.message, [{text: 'Okay'}], {
          cancelable: true,
        });
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Staff Entry With Mobile - Ashoka University, Sonipat"
        navigation={navigation}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cr}>
          <View style={styles.mgt}>
            <View style={[styles.cdm, {marginBottom: '2%'}]}>
              <View
                style={{
                  position: 'absolute',
                  top: -30,
                  backgroundColor: '#fff',
                }}>
                <Text style={{color: '#959595', fontSize: 15}}>
                  Please select the person mobile number
                </Text>
              </View>
            </View>

            <View style={styles.cdm}>
              <Text style={styles.cl}>Enter Mobile Number</Text>
              <View style={styles.searchSt}>
                  <TextInput
                    returnKeyType="go"
                    placeholder="search"
                    placeholderTextColor="#696969"
                    style={styles.searchInputStyle}
                    value={mobile}
                    onChangeText={value => setMobile(value)}
                  />
                <TouchableOpacity
                  onPress={() => searchVendor()}
                  style={{borderLeftWidth: 1}}>
                  <IconAntDesign
                    style={styles.iconStyle}
                    name="search"
                    size={25}
                    color="#696969"
                  />
                </TouchableOpacity>
              </View>
            </View>




            


                
          </View>

          <View style={{marginTop: '5%', marginBottom: '8%'}}>
            <View style={styles.cdm}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.wd}>
                  <LinearGradient
                    colors={['#fe8c00', '#fe8c00']}
                    style={{borderRadius: 2}}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        flexDirection: 'row',
                        padding: '5%',
                        borderRadius: 5,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          padding: '5%',
                          // marginLeft: '7%',
                          marginTop: '1%',
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
                          marginRight: '10%',
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
                    style={{borderRadius: 2}}>
                    <TouchableOpacity
                      onPress={() => checkReason()}
                      style={{
                        flexDirection: 'row',
                        padding: '5%',
                        borderRadius: 5,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          marginLeft: '10%',
                          fontSize: 16,
                        }}>
                        Next
                      </Text>
                      <Text style={{padding: '5%'}}>
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

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: '3%',
            marginLeft: '5%',
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <View style={styles.link}>
            <Image
              source={require('../image/partner.png')}
              style={{width: 200, height: 35}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffEntryMobile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
  },

  flatstyles: {
    maxHeight: windowWidth - 90,
    width: '100%',
    // position: 'absolute',
    // elevation: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    borderWidth: 1,
  },

  searchSt: {
    marginTop: 8,
    width: '100%',
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
  },
  iconStyle: {
    paddingTop: 15,
    marginHorizontal: 10,
  },
  searchText: {
    flex: 1,
    fontSize: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchTextSyle: {
    width: '100%',
    // flex: 1,
    marginVertical: 2,

    margin: 0,
    backgroundColor: '#fff',
  },
  searchInputStyle: {
    flex: 1,
    width: '100%',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin: 0,
    color: 'black',
  },
  fnts: {
    fontSize: 16,
    color: '#212529',
    marginTop: '5%',
  },
  cl: {
    color: '#6f6f6f',
  },
  wd: {
    width: '33%',
  },
  cr: {
    margin: '3%',
    marginTop: '10%',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  cdm: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
  },

  mgt: {
    marginTop: '5%',
  },
});
