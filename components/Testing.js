import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';

import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
  COMMANDS,
} from 'react-native-thermal-receipt-printer-image-qr';
import LinearGradient from 'react-native-linear-gradient';

export default class Testing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      printers: [],
    };
  }

  componentDidMount = () => {
    NetPrinter.init().then(() => {
      this.setState(
        Object.assign({}, this.state, {
          printers: [{host: '192.168.1.251', port: 9100}],
        }),
      );
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
  };

  // printTextTest = () => {
  //   console.log(this.state.currentPrinter);
  //   if (this.state.currentPrinter) {
  //     NetPrinter.printText('<C>sample text</C>\n');
  //   }
  // };

  printTextTest = () => {
    if (this.state.currentPrinter) {
      let address = "2700 S123 Grand Ave, Los Angeles, CA 90007223, USA."
      const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
      const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
      const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;
      const OFF_CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_LT;

      
      NetPrinter.printText(`${CENTER}${BOLD_ON} Ashoka University - Day Visitor ${BOLD_OFF}\n`);
      // NetPrinter.printText(`${CENTER}${address}${OFF_CENTER}`);
      // NetPrinter.printText('090 3399 031 555\n');
      NetPrinter.printText(`Date : 10-Oct-2021`);
      NetPrinter.printText(`Name : Vijender Pandita`);
      NetPrinter.printText(`-----------------------------`);
      NetPrinter.printText(`V2205300002`);
      NetPrinter.printImageBase64(`https://sportshub.cbsistatic.com/i/2021/04/09/9df74632-fde2-421e-bc6f-d4bf631bf8e5/one-piece-trafalgar-law-wano-anime-1246430.jpg`, {
        imageWidth: 300,
        imageHeight: 300,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.printers.map(printer => (
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
        {/* <TouchableOpacity onPress={() => this.printTextTest()}>
          <Text> Print Text </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.printBillTest()}>
          <Text> Print Bill Text </Text>
        </TouchableOpacity> */}

        <Button
          title="Click Me"
          onPress={() => {
            this.printTextTest();
          }}
        />

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

// --------------------BLUETOOTH---------------------------------

// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';

// import {
//   USBPrinter,
//   NetPrinter,
//   BLEPrinter,
// } from 'react-native-thermal-receipt-printer-image-qr';

// if (Platform.OS === 'android') {
//   PermissionsAndroid.requestMultiple([
//     PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//   ]).then(result => {
//     if (result['android.permission.BLUETOOTH_CONNECT'] === 'granted') {
//       // this.setState({
//       //   permissionsGranted: true,
//       // });
//     } else if (
//       result['android.permission.BLUETOOTH_CONNECT'] === 'never_ask_again'
//     ) {
//       ToastAndroid.show(
//         'Please Go into Settings -> Applications -> Vizsense -> Permissions and Allow permissions to continue',
//       );
//     }
//   });
// }

// const Testing = () => {
//   const [printers, setPrinters] = useState([]);
//   const [currentPrinter, setCurrentPrinter] = useState();

//   useEffect(() => {
//     BLEPrinter.init().then(() => {
//       BLEPrinter.getDeviceList().then(setPrinters);
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       {printers.map(printer => (
//         <TouchableOpacity
//           key={printer.inner_mac_address}
//           onPress={() => _connectPrinter(printer)}>
//          <Text> {`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}</Text>
//         </TouchableOpacity>
//       ))}
//       <TouchableOpacity>
//         <Text>Print Text</Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text>Print Bill Text</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default Testing;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
