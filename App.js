import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen1 from './components/HomeScreen1';
import Home from './components/Home';
import Login from './components/Login';
import Staff from './components/Staff';
import ReadQr from './components/ReadQr';
import Testing from './components/Testing';
import Visitor from './components/Visitor';
import VisitorSinglePage from './components/VisitorSinglePage'
import Courier from './components/Courier';
import AddStaff from './components/AddStaff';
import StaffEdit from './components/StaffEdit';
import Bluetooth from './components/Bluetooth';
import VisitorAcc from './components/VisitorAcc';
import EmployeeIn from './components/EmployeeIn';
import ListInside from './components/ListInside';
import StaffDetails from './components/StaffDetails';
import PrintVisitor from './components/PrintVisitor';
import SplashScreen from 'react-native-splash-screen';
import VisitorReason from './components/VisitorReason';
import EmployeeScann from './components/EmployeeScann';
import VisitorWithoutMobile from './components/VisitorWithoutMobile';
import PopUp from './components/PopUp';
import Nav from './components/Nav';
import StaffOut from './components/StaffOut';
import Termal_printer from './components/Termal_printer';
import Setting from './components/Setting';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeName: 'Login',
    };
  }

  async componentDidMount() {
    const tokenn = JSON.parse(await AsyncStorage.getItem('token'));
    const terminal = JSON.parse(await AsyncStorage.getItem('terminalid'));
    const email = JSON.parse(await AsyncStorage.getItem('email'));
    console.log('tokenn : ', tokenn);
    if (tokenn !== null) {
      this.setState({
        routeName: 'Bluetooth',
      });
    }
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={this.state.routeName}
          screenOptions={{
            headerShown: false,
          }}>
          <>
            {/* <Stack.Screen name="testing" component={Testing} /> */}


            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen1} /> */}
            <Stack.Screen name="termalprinter" component={Termal_printer} />
            <Stack.Screen name="Bluetooth" component={Bluetooth} />
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Setting" component={Setting} />

            <Stack.Screen name="Courier" component={Courier} />

            <Stack.Screen name="EmployeeIn" component={EmployeeIn} />
            <Stack.Screen name="EmployeeScann" component={EmployeeScann} />

            <Stack.Screen name="Visitor" component={Visitor} />
            <Stack.Screen name="VisitorSinglePage" component={VisitorSinglePage} />
            <Stack.Screen name="VisitorWithoutMobile" component={VisitorWithoutMobile} />
            <Stack.Screen name="VisitorReason" component={VisitorReason} />
            <Stack.Screen name="VisitorAcc" component={VisitorAcc} />

            <Stack.Screen name="Staff" component={Staff} />
            <Stack.Screen name="AddStaff" component={AddStaff} />
            <Stack.Screen name="StaffDetails" component={StaffDetails} />
            <Stack.Screen name="StaffEdit" component={StaffEdit} />

            <Stack.Screen name="PrintVisitor" component={PrintVisitor} />
            <Stack.Screen name="ReadQr" component={ReadQr} />

            <Stack.Screen name="ListInside" component={ListInside} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
