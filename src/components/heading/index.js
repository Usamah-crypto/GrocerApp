import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {appColors} from '../../utils/colors';
import {getHeight, getWidth} from '../../utils/responsive-helper';

const Heading = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.heading}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: getHeight(2),
  },
  heading: {
    fontSize: 35,
    fontWeight: '600',
    color: appColors.tab_color,
    marginLeft: getWidth(3),
  },
});

export default Heading;
