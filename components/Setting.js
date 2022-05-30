import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  BackHandler,
  Alert,
} from 'react-native';
import {Appbar, Card} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

export default class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: true,
      bluetooth: true,
      network:true
    };
  }

  async componentDidMount() {
    try {
      let checkStatus = JSON.parse(await AsyncStorage.getItem('SinglePageShow'));
      let bluetoothStatus = JSON.parse(await AsyncStorage.getItem('bluetoothStatus'));
      let networkStatus = JSON.parse(await AsyncStorage.getItem('networkStatus'));
      console.log(checkStatus);
      if (checkStatus == true) {
        this.setState({switch: true});
      } else {
        this.setState({switch: false});
      }

      if (bluetoothStatus == true) {
        this.setState({bluetooth: true});
      } else {
        this.setState({bluetooth: false});
      }

      if (networkStatus == true) {
        this.setState({network: true});
      } else {
        this.setState({network: false});
      }
    } catch (error) {
      Alert.alert('Alert!',error.message,[{text:'ok'}],{cancelable:true})
    }
  }

  async showSinglePageVisitor() {
    try {
      if (this.state.switch === true) {
        this.setState({switch: false});
        await AsyncStorage.setItem('SinglePageShow', JSON.stringify(false));
      } else {
        this.setState({
          switch: true,
        });
        await AsyncStorage.setItem('SinglePageShow', JSON.stringify(true));
      }

      console.log(await AsyncStorage.getItem('SinglePageShow'));
    } catch (error) {
      Alert.alert('Alert!',"Something wents wrong. Please try again.",[{text:'ok'}],{cancelable:true})
    }
  }

  async bluetooth() {
    try {
      if (this.state.bluetooth === true) {
        this.setState({bluetooth: false});
        await AsyncStorage.setItem('bluetoothStatus', JSON.stringify(false));
      } else {
        this.setState({
          bluetooth: true,
        });
        await AsyncStorage.setItem('bluetoothStatus', JSON.stringify(true));
      }

      console.log(await AsyncStorage.getItem('bluetoothStatus'));
    } catch (error) {
      Alert.alert('Alert!',"Something wents wrong. Please try again.",[{text:'ok'}],{cancelable:true})
    }
  }

  async network() {
    try {
      if (this.state.network === true) {
        this.setState({network: false});
        await AsyncStorage.setItem('networkStatus', JSON.stringify(false));
      } else {
        this.setState({
          network: true,
        });
        await AsyncStorage.setItem('networkStatus', JSON.stringify(true));
      }

      console.log(await AsyncStorage.getItem('networkStatus'));
    } catch (error) {
      Alert.alert('Alert!',"Something wents wrong. Please try again.",[{text:'ok'}],{cancelable:true})
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.props.navigation.push('Home'),
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>

          <Appbar.Content title="Setting" />
        </Appbar.Header>
        <ScrollView>
          <View style={{padding: 10}}>
            <View style={{marginBottom: '5%'}}>
              <View style={styles.heading}>
                <Text style={[styles.textStyle, styles.textUp]}>
                  Visitor Page
                </Text>
              </View>

              <View style={styles.fldR}>
                <Octicons name="arrow-switch" size={23} />
                <View style={styles.rightIcon}>
                  <Text style={[styles.textStyle, styles.textClMg]}>
                    Visitor Entry Single Page
                  </Text>
                  <View style={{flex: 1}}>
                    <Switch
                      value={this.state.switch}
                      onValueChange={v => this.showSinglePageVisitor(v)}
                      trackColor={{true: '#6dd5ed', false: '#6dd5ed'}}
                      thumbColor={'#2193b0'}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{marginBottom: '5%'}}>
              <View style={styles.heading}>
                <Text style={[styles.textStyle, styles.textUp]}>Printer</Text>
              </View>

              <View style={styles.fldR}>
                <Octicons name="arrow-switch" size={23} />
                <View style={styles.rightIcon}>
                  <Text style={[styles.textStyle, styles.textClMg]}>
                    Bluetooth
                  </Text>
                  <View style={{flex: 1}}>
                    <Switch
                      value={this.state.bluetooth}
                      onValueChange={v => this.bluetooth()}
                      trackColor={{true: '#6dd5ed', false: '#6dd5ed'}}
                      thumbColor={'#2193b0'}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.fldR}>
                <Octicons name="arrow-switch" size={23} />
                <View style={styles.rightIcon}>
                  <Text style={[styles.textStyle, styles.textClMg]}>
                    Network
                  </Text>
                  <View style={{flex: 1}}>
                    <Switch
                      value={this.state.network}
                      onValueChange={v => this.network()}
                      trackColor={{true: '#6dd5ed', false: '#6dd5ed'}}
                      thumbColor={'#2193b0'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  ttl: {
    backgroundColor: '#ffffff',
  },
  rightIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 16,
  },
  textClMg: {
    marginLeft: '5%',
    color: '#050505',
    textTransform: 'capitalize',
  },
  textUp: {
    color: '#989898',
    textTransform: 'uppercase',
  },
  heading: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  fldR: {
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 15,
  },
});
