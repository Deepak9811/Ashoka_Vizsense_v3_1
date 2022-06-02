import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
  COMMANDS,
} from 'react-native-thermal-receipt-printer-image-qr';

export default class Termal_printer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      printers: [],
      dk: [],
    };
  }

  componentDidMount = () => {
    console.log('data :-----------', this.props.fNmae);

    NetPrinter.init().then(() => {
      this.setState(
        Object.assign({}, this.state, {
          printers: [{host: '192.168.1.251', port: 9100}],
        }),
      );
      // NetPrinter.getDeviceList().then(() => this.state.singh);
    });

    this._connectPrinter();
  };

  _connectPrinter = (host, port) => {
    //connect printer
    NetPrinter.connectPrinter('192.168.1.251', 9100).then(
      printer =>
        this.setState(Object.assign({}, this.state, {currentPrinter: printer})),
      error => console.warn(error),
    );

    // console.log(this.state.singh);
  };

  printTextTest = async () => {
    console.log('current printer :- ', this.props.qrCode);
    if (this.state.currentPrinter) {
      try {
        let address = '2700 S123 Grand Ave, Los Angeles, CA 90007223, USA.';
        const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
        const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
        const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;
        const OFF_CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_LT;

        NetPrinter.printText(
          `${CENTER}${BOLD_ON} Ashoka University - Day Visitor ${BOLD_OFF}${OFF_CENTER}\n`,
        );
        NetPrinter.printText(`Date : ${this.props.time}`);
        NetPrinter.printText(
          `Name : ${this.props.fNmae}${' '}${this.props.lname}`,
        );
        NetPrinter.printText(`-----------------------------`);
        NetPrinter.printText(`${this.props.slipId}`);
        NetPrinter.printImageBase64(`${this.props.qrCode}`, {
          imageWidth: 150,
          imageHeight: 150,
        });
        NetPrinter.printBill(``, {beep: false});
        ToastAndroid.show(
          'Take Slip from Printer',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        this.props.navigation.navigate('Home');

      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Printer Not Found' || 'ERROR');
        ToastAndroid.show(
          'Entry success',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    }
  };

  // printBillTest = () => {
  //   if (this.state.currentPrinter) {
  //     NetPrinter.printBill('<C>sample bill</C>');
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.printers.map(printer => (
          <TouchableOpacity
            key={printer.device_id}
            onPress={printer =>
              this._connectPrinter(printer.host, printer.port)
            }>
            <Text>
              {`device_name: ${printer.device_name}, host: ${printer.host}, port: ${printer.port}`}{' '}
              click
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => this.printTextTest()}>
          <Text> Print Text </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => this.printBillTest()}>
          <Text> Print Bill Text </Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => this.printTextTest()}>
          <LinearGradient colors={['#fe8c00', '#fe8c00']} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
             Network Print
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: '5%',
  },

  signIn: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  textSign: {
    fontSize: 16,
    // fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
