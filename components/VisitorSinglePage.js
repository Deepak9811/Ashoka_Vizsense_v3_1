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
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Appbar, Button, Card} from 'react-native-paper';
import {Picker as SelectPicker} from '@react-native-picker/picker';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import {windowHeight, windowWidth} from './utils/Dimensions';
import ImagePicker from 'react-native-image-crop-picker';

export class VisitorSinglePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      fname: '',
      lname: '',
      loader: false,
      token: '',
      purposeData: [],
      purposeValue: '',
      image_type: 'Visitor',
      govt_it: 'govt_id',
      accessories: 'accessories',
      vehicle: 'vehicle',
      visibleImage2: false,
      visibleImage3: false,
      visibleImage4: false,
      visitorId: '',
      image1: '',
      employId: '',
    };
  }

  async componentDidMount() {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));

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
      console.warn('local Data :', localData);
    } catch (error) {
      console.log(error);
    }

    const localMobile = JSON.parse(await AsyncStorage.getItem('visitorMobile'));
    console.log('local data', localMobile);

    fetch(`https://ashoka.vizsense.in/api/purpose`, {
      method: 'GET',
      headers: {
        token: tokenn,
        uid: terminal,
      },
    })
      .then(data => {
        data.json().then(async resp => {
          console.log('purpose =>', resp);
          if (resp.response === 'success') {
            this.setState({
              purposeData: resp.data,
            });
            // console.log('puo :', this.state.purposeData);
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

  componentWillUnmount() {}

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

  async getVisitorData(s) {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));
    console.log(terminal);

    let phoneNumberLength = this.state.mobile.length;
    if (phoneNumberLength === 10) {
      this.setState({
        loader: true,
      });

      fetch(
        `https://ashoka.vizsense.in/api/searchVisitor?mobile=${this.state.mobile}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            token: tokenn,
            uid: terminal,
          },
        },
      )
        .then(result => {
          result.json().then(async resp => {
            console.log('mobile search : ', resp);
            if (resp.response === 'success') {
              console.warn('response => ', resp);

              //   await AsyncStorage.setItem(
              //     'visitorId',
              //     JSON.stringify(resp.data.visitorId),
              //   );

              //   await AsyncStorage.setItem(
              //     'visitorMobile',
              //     JSON.stringify(resp.data.mobile),
              //   );

              //   await AsyncStorage.setItem(
              //     'visitorFirstName',
              //     JSON.stringify(resp.data.fName),
              //   );

              //   await AsyncStorage.setItem(
              //     'visitorLastName',
              //     JSON.stringify(resp.data.lName),
              //   );

              this.setState({
                mobile: resp.data.mobile,
                fname: resp.data.fName,
                lname: resp.data.lName,
                visitorId: resp.data.visitorId,
                loader: false,
              });

              console.warn(
                'mobile',
                this.state.mobile,
                'fname =>',
                this.state.fname,
                'lname =>',
                this.state.lname,
              );

              if (
                this.state.mobile !== '' &&
                this.state.fname !== '' &&
                this.state.lname !== ''
              ) {
                // this.props.navigation.navigate('VisitorReason');
              } else {
                alert('Something wents wrong.');
              }
            } else {
              this.setState({
                loader: false,
              });
              ToastAndroid.show(
                'Number not found',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          });
        })
        .catch(error => {
          Alert.alert(
            'Alert!',
            'There has been a problem with your fetch operation. ',
            [{text: 'Ok'}],
            {cancelable: true},
          );
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          this.setState({
            loader: false,
          });
        });
    } else if (phoneNumberLength === 0) {
      Alert.alert(
        'Wrong Input',
        'Please enter mobile number. ',
        [{text: 'Ok'}],
        {cancelable: true},
      );
      this.setState({
        loader: false,
      });
    } else if (phoneNumberLength < 10) {
      Alert.alert(
        'Wrong Input',
        'Please check mobile number. ',
        [{text: 'Ok'}],
        {cancelable: true},
      );
      this.setState({
        loader: false,
      });
    } else {
      Alert.alert(
        'Wrong Input',
        'Please insert mobile number. ',
        [{text: 'Ok'}],
        {cancelable: true},
      );
      this.setState({
        loader: false,
      });
    }
  }

  async addVisitorData() {
    this.setState({
      loader: true,
    });

    const lengthMobile = this.state.mobile.length;

    if (lengthMobile < 10) {
      Alert.alert(
        'Wrong Input',
        'Please check mobile number.',
        [{text: 'Ok'}],
        {cancelable: true},
      );
      this.setState({
        loader: false,
      });
    } else {
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
  }

  async searchVisitor(value) {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));
    // console.log('hlloe');
    // this.setState({
    //   listArray: [],
    // });

    if (!value) {
      this.setState({listArray: [], showSearchContent: false});
    }

    this.setState({
      searchLoader: true,
    });

    if (this.state.searchMeeting.length === 0) {
      ToastAndroid.show(
        "Enter person's name",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      this.setState({
        searchLoader: false,
        showSearchContent: false,
      });
    } else {
      let sParameter = this.state.searchMeeting;
      sParameter = encodeURIComponent(sParameter.trim());

      fetch(`https://ashoka.vizsense.in/api/searchEmp?prefix=` + sParameter, {
        method: 'GET',
        headers: {
          token: tokenn,
          uid: terminal,
        },
      })
        .then(data => {
          data.json().then(resp => {
            console.log('searcher =>', resp);
            if (resp.response == 'success') {
              console.log('search =>', resp);
              this.setState({
                listArray: resp.data,
                showSearchContent: true,
                searchLoader: false,
              });
            } else {
              this.setState({
                searchLoader: false,
              });
              ToastAndroid.show(
                resp.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          });
        })
        .catch(error => {
          this.setState({
            searchLoader: false,
          });
          Alert.alert(
            'Alert!',
            'There has been a problem with your fetch operation.',
            [{text: 'Ok'}],
            {cancelable: true},
          );
          // ToastAndroid.show(
          //   error.message,
          //   ToastAndroid.LONG,
          //   ToastAndroid.BOTTOM,
          // );
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    }
  }

  getTextValue(item) {
    const meting = item.name;

    this.state.mName = meting;
    this.state.employId = item.empid;
    this.state.searchMeeting = meting;
    this.setState({
      showSearchContent: false,
    });
    console.log(
      'name => ',
      this.state.mName,
      this.state.employId,
      this.state.searchMeeting,
    );
  }

  //--------------------------image section--------------------------------------------

  async cameraCapture() {
    try {
      const imagePickerRes = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
        compressImageQuality: 1,
        size: 20,
      });
      console.log('imagePicker Result : ', imagePickerRes);
      this.setState({
        image1: imagePickerRes.data,
        mime: imagePickerRes.mime,
        visibleImage1New: true,
      });
    } catch (err) {
      console.log('Error : ', err.message);
    }

    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: false,
    //   includeBase64: true,
    //   compressImageQuality: 1,
    //   size: 25,
    // })
    //   .then(image => {
    //     console.warn(image);
    //     this.setState({
    //       image1: image.data,
    //       mime: image.mime,
    //       visibleImage1New: true,
    //     });

    //     // this.onChangeImage(image)
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
  }

  cameraCapture2 = () => {
    this.setState({
      imageLoader2: true,
    });

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 1,
      size: 25,
    })
      .then(image => {
        console.warn(image.size);
        this.setState({
          image2: image.data,
          mime2: image.mime,
          visibleImage2: true,
          imageLoader2: false,
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          imageLoader2: false,
        });
      });
  };

  cameraCapture3 = () => {
    this.setState({
      imageLoader3: true,
    });

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 1,
      size: 25,
    })
      .then(image => {
        console.warn(image.size);
        this.setState({
          image3: image.data,
          mime3: image.mime,
          visibleImage3: true,
          imageLoader3: false,
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          imageLoader3: false,
        });
      });
  };

  cameraCapture4 = () => {
    this.setState({
      imageLoader4: true,
    });

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 1,
      size: 25,
    })
      .then(image => {
        console.warn(image.size);
        this.setState({
          image4: image.data,
          mime4: image.mime,
          visibleImage4: true,
          imageLoader4: false,
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          imageLoader4: false,
        });
      });
  };

  check() {
    if (
      this.state.mobile !== '' &&
      this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.purposeValue !== '' &&
      this.state.employId !== '' &&
      this.state.visitorId !== ''
    ) {
      console.log(
        'purposeValue',
        this.state.visitorId,
        this.state.purposeValue,
        this.state.employId,
      );
      this.saveVisitorData();
    } else {
      Alert.alert(
        'Wrong Input',
        'Please fill all the fields.',
        [{text: 'Ok'}],
        {cancelable: true},
      );
      this.setState({
        finalLoader: false,
      });
    }
  }

  async saveVisitorData() {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));

    if (this.state.image1.length !== 0) {
      // console.log(this.state.image1);

      this.setState({
        finalLoader: true,
      });

      fetch(`https://ashoka.vizsense.in/api/visit`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: tokenn,
          uid: terminal,
        },
        body: JSON.stringify({
          visitorId: this.state.visitorId,
          mobile: this.state.mobile,
          fName: this.state.fname,
          lName: this.state.lname,
          purposeId: this.state.purposeValue,
          empId: this.state.employId,
          terminalId: terminal,

          visitorPhoto: this.state.image1,
          idPhoto: this.state.image2,
          vehiclePhoto: this.state.image3,
          exPhoto: this.state.image4,
          // image_type: this.state.image_type,
        }),
      })
        .then(result => {
          console.log(result);
          result.json().then(async resp => {
            console.warn('saveVisitorData :', resp);
            if (resp.response === 'success') {
              await AsyncStorage.setItem(
                'slipID',
                JSON.stringify(resp.data.slipNo),
              );
              await AsyncStorage.setItem(
                    'visitorId',
                    JSON.stringify(resp.data.visitId),
                  );

                  await AsyncStorage.setItem(
                        'visitorMobile',
                        JSON.stringify(resp.data.mobile),
                      );
      
                      await AsyncStorage.setItem(
                        'visitorFirstName',
                        JSON.stringify(resp.data.fName),
                      );
      
                      await AsyncStorage.setItem(
                        'visitorLastName',
                        JSON.stringify(resp.data.lName),
                      );
              await AsyncStorage.setItem(
                'visitTime',
                JSON.stringify(resp.data.visitTime),
              );
              console.warn('resp.data.slipNo', resp.data.slipNo);

              this.setState({
                finalLoader: false,
              });
              this.props.navigation.navigate('PrintVisitor');
            } else {
              Alert.alert(
                'Error!',
                'Something wents wrong.',
                [{text: 'Ok'}],
                {cancelable: true},
              );
              this.setState({
                finalLoader: false,
              });
            }
          });
        })
        .catch(error => {
          this.setState({
            finalLoader: false,
          });
          ToastAndroid.show(
            error.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          this.setState({
            finalLoader: false,
          });
        });
    } else {
      Alert.alert('Alert!', "Please take visitor's photo.", [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.push('Home')}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>
          <Appbar.Content title="Visitor Entry - Ashoka University, Sonipat" />
        </Appbar.Header>

        {/* {this.state.loader ? (
          <>
            <View
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                elevation: 3,
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}></View>
            <View
              style={{
                flex: 1,
                width: '100%',
                position: 'absolute',
                elevation: 3,
                top: '50%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#0d6efd" />
            </View>
          </>
        ) : null} */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.cr}>
            <View style={styles.cardShadow}>
              <View style={styles.mgt}>
                <View style={styles.cdm}>
                  <View
                    style={{
                      position: 'absolute',
                      top: -28,
                      backgroundColor: '#fff',
                    }}>
                    <Text style={{color: '#959595', fontSize: 15}}>
                      Please enter mobile number first
                    </Text>
                  </View>

                  <Text style={[styles.text_footer, {marginTop: '5%'}]}>
                    Mobile Number
                  </Text>
                  <View
                    style={[
                      styles.action,
                      {borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 5},
                    ]}>
                    <Entypo
                      name="mobile"
                      color="#05375a"
                      size={23}
                      style={{paddingTop: 10}}
                    />

                    <TextInput
                      label="Number"
                      maxLength={10}
                      keyboardType="numeric"
                      returnKeyType="next"
                      placeholderTextColor={'#959595'}
                      placeholder="Mobile Number"
                      style={[styles.textInput, {paddingTop: 17}]}
                      value={this.state.mobile}
                      onChangeText={text => this.setState({mobile: text})}
                      // onBlur={e => this.getVisitorData(e)}
                    />
                    <TouchableOpacity
                      disabled={this.state.loader ? true : false}
                      onPress={value => this.getVisitorData(value)}
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}>
                      {!this.state.loader ? (
                        <IconAntDesign
                          name="search"
                          size={25}
                          color="#696969"
                          style={{marginLeft: '5%'}}
                        />
                      ) : (
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: 3,
                          }}>
                          <ActivityIndicator
                            size="small"
                            color="#0d6efd"
                            style={{marginLeft: 10, marginRight: 5}}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cdm}>
                  <Text style={[styles.text_footer]}>First Name</Text>
                  <View style={styles.action}>
                    <Feather name="user" color="#05375a" size={23} />

                    <TextInput
                      label="First Name"
                      mode="outlined"
                      keyboardType="default"
                      returnKeyType="next"
                      placeholderTextColor={'#959595'}
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
                    <Feather name="user" color="#05375a" size={23} />

                    <TextInput
                      label="Last Name"
                      mode="outlined"
                      keyboardType="default"
                      placeholderTextColor={'#959595'}
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
                    <Feather
                      name="user"
                      color="#05375a"
                      size={23}
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

                {/* ------------------------second page--meeting whom------------------------------------------------------- */}

                <View
                  style={[
                    styles.cdm,
                    {
                      borderBottomWidth: 1,
                      paddingBottom: 15,
                      marginBottom: '5%',
                      borderColor: '#E8E8E8',
                    },
                  ]}>
                  <Text style={[styles.text_footer]}>Meeting Whom</Text>

                  <View
                    style={[
                      styles.action,
                      {borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 5},
                    ]}>
                    <TextInput
                      label="Number"
                      returnKeyType="next"
                      placeholderTextColor={'#959595'}
                      placeholder="Search Name"
                      style={[styles.textInput, {paddingTop: 17}]}
                      value={this.state.searchMeeting}
                      onChangeText={value => {
                        this.setState({searchMeeting: value});
                      }}
                      // onBlur={e => this.getVisitorData(e)}
                    />
                    <TouchableOpacity
                      onPress={value => this.searchVisitor(value)}
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}>
                      <IconAntDesign
                        name="search"
                        size={25}
                        color="#696969"
                        style={{marginLeft: '5%'}}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* <View style={styles.searchSt}>
                    <View >
                      <TextInput
                        returnKeyType="go"
                        placeholder="search"
                        placeholderTextColor="#696969"
                        style={[styles.textInput, {paddingTop: 17}]}
                        // style={styles.searchInputStyle}
                        value={this.state.searchMeeting}
                        onChangeText={value => {
                          this.setState({searchMeeting: value});
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={value => this.searchVisitor(value)}
                      style={{borderLeftWidth: 1}}>
                      <IconAntDesign
                        style={styles.iconStyle}
                        name="search"
                        size={25}
                        color="#696969"
                      />
                    </TouchableOpacity>
                  </View> */}

                  {!this.state.searchLoader ? (
                    <>
                      {this.state.showSearchContent ? (
                        <View
                          style={{
                            marginTop: '10%',
                            width: '100%',
                          }}>
                          <View style={styles.flatstyles}>
                            <ScrollView
                              showsVerticalScrollIndicator={false}
                              nestedScrollEnabled={true}>
                              <View
                                style={{
                                  marginTop: '5%',
                                  marginBottom: '5%',
                                  width: '100%',
                                }}>
                                {this.state.listArray.map((item, i) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <View style={{elevation: 1}}>
                                        <TouchableOpacity
                                          style={styles.searchTextSyle}
                                          value={this.state.mName}
                                          onPress={() =>
                                            this.getTextValue(item)
                                          }>
                                          <Text style={[styles.searchText]}>
                                            {item.name}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </React.Fragment>
                                  );
                                })}
                              </View>
                            </ScrollView>
                          </View>
                        </View>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          position: 'absolute',
                          elevation: 3,
                          top: '50%',
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator size="large" color="#0d6efd" />
                      </View>
                    </>
                  )}
                </View>

                {/* -------------------------------image-section------------------------------------------------------ */}

                <View style={styles.carCa}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: '5%',
                    }}>
                    <View style={{width: '43%'}}>
                      <Card>
                        <View style={styles.centCam}>
                          <Text style={styles.centCamInfo}>Visitor</Text>

                          <TouchableOpacity
                            onPress={() => this.cameraCapture()}>
                            {/* <FontAwesomeIcon
                              icon={faCamera}
                              style={{color: '#0d6efd', marginBottom: '5%'}}
                              size={80}
                            /> */}

                            {/* <Image
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginBottom: '5%',
                                  borderRadius: 5,
                                }}
                                source={
                                  this.state.visibleImage1New
                                    ? {
                                        uri: `data:${this.state.mime};base64,${this.state.image1}`,
                                      }
                                    : this.state.image1
                                }
                              /> */}

                            {!this.state.visibleImage1New ? (
                              <Text
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginTop: '8%',
                                  borderRadius: 5,
                                }}>
                                <Feather
                                  name="user"
                                  size={90}
                                  color="#fe8c00"
                                />
                              </Text>
                            ) : (
                              <Image
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginBottom: '5%',
                                  borderRadius: 5,
                                }}
                                source={{
                                  uri: `data:${this.state.mime};base64,${this.state.image1}`,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </View>

                    <View style={{width: '43%'}}>
                      <Card>
                        <View style={styles.centCam}>
                          <Text style={styles.centCamInfo}>ID Proof</Text>
                          <TouchableOpacity
                            onPress={() => this.cameraCapture2()}>
                            {!this.state.visibleImage2 ? (
                              <Text
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginTop: '8%',
                                  borderRadius: 5,
                                }}>
                                <FontAwesome
                                  name="vcard-o"
                                  size={90}
                                  color="#fe8c00"
                                />
                              </Text>
                            ) : (
                              <Image
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginBottom: '5%',
                                  borderRadius: 5,
                                }}
                                source={{
                                  uri: `data:${this.state.mime2};base64,${this.state.image2}`,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={{width: '43%'}}>
                      <Card>
                        <View style={styles.centCam}>
                          <Text style={styles.centCamInfo}>Accessories</Text>
                          <TouchableOpacity
                            onPress={() => this.cameraCapture3()}>
                            {!this.state.visibleImage3 ? (
                              <Text
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginTop: '8%',
                                  borderRadius: 5,
                                }}>
                                <FontAwesome5
                                  name="toolbox"
                                  size={90}
                                  color="#fe8c00"
                                />
                              </Text>
                            ) : (
                              <Image
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginBottom: '5%',
                                  borderRadius: 5,
                                }}
                                source={{
                                  uri: `data:${this.state.mime3};base64,${this.state.image3}`,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </View>

                    <View style={{width: '43%'}}>
                      <Card>
                        <View style={styles.centCam}>
                          <Text style={styles.centCamInfo}>Vehicle</Text>

                          <TouchableOpacity
                            onPress={() => this.cameraCapture4()}>
                            {!this.state.visibleImage4 ? (
                              <Text
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginTop: '8%',
                                  borderRadius: 5,
                                }}>
                                <FontAwesome
                                  name="car"
                                  size={90}
                                  color="#fe8c00"
                                />
                              </Text>
                            ) : (
                              <Image
                                style={{
                                  height: 100,
                                  width: 100,
                                  marginBottom: '5%',
                                  borderRadius: 5,
                                }}
                                source={{
                                  uri: `data:${this.state.mime4};base64,${this.state.image4}`,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </View>
                  </View>
                </View>

                {/* --------------------------------------------------------------------------------- */}

                {/* <View style={styles.cdm}>
                  <Text style={styles.cl}>Purpose of meeting</Text>

                  <View style={styles.pkr}>
                    <SelectPicker
                      style={{width: '100%'}}
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
                </View> */}
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
                              size={23}
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
                              size={23}
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
                // position: 'relative',
                // bottom: 0,
                marginTop: windowWidth / 4,
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


           
          </View>


          {this.state.finalLoader ? ( 
          <>
            <View
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                elevation: 1,
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}></View>
            <View
              style={{
                flex: 1,
                width: '100%',
                position: 'absolute',
                elevation: 5,
                top: '50%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#0d6efd" />
            </View>
          </>
        ) : null} 
        </ScrollView>
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
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E9E9E9',
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
    margin: '2%',
    marginTop: '5%',
  },
  cdm: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
  },
  mgaw: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mgt: {
    marginTop: '5%',
  },
  inp: {
    marginBottom: '5%',
  },
  mText: {
    backgroundColor: '#fff',
    padding: 5,
    height: 40,
    width: 300,
    borderColor: '#333',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  textFocus: {
    backgroundColor: '#eee',
    borderColor: '#5d05d5',
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
    borderBottomColor: '#DBDBDB',
    // paddingBottom: 5,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 12,
    color: '#05375a',
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

  carCa: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
  },

  centCam: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  },
  centCamInfo: {
    fontSize: 16,
    marginTop: '5%',
    marginBottom: '5%',
    textAlign: 'center',
    width: '100%',
  },
});

export default VisitorSinglePage;
