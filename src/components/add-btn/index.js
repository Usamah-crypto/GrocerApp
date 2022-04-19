import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../utils/colors';

const AddBtn = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: appColors.tab_color,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default AddBtn;
