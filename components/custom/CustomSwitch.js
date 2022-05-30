import React,{useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: '100%',
        backgroundColor: '#e4e4e4',
        borderRadius: 5,
        borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? '#fe8c00' : '#e4e4e4',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : '#FF3232',
            fontSize: 17,
            fontWeight:getSelectionMode ==1 ?  'bold' :''
          }}>
          {option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? '#fe8c00' : '#e4e4e4',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : '#FF3232',
            fontSize: 17,
            fontWeight:getSelectionMode ==2 ?  'bold' :''
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
