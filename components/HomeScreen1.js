import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomSwitch from './custom/CustomSwitch';
import ListItem from './listHome/VisitorList';
import SupportStafList from './listHome/SupportStafList';

export default function HomeScreen1({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);

  const onSelectSwitch = value => {
    setGamesTab(value);
  };


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginVertical: 20,marginBottom:"10%"}}>
        <CustomSwitch
          selectionMode={1}
          option1="VISITOR"
          option2={'S.STAFF'}
          onSelectSwitch={onSelectSwitch}
        />
      </View>
      {gamesTab == 1 && <ListItem navigation={navigation} />}
      {gamesTab == 2 && <SupportStafList navigation={navigation} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
