import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../utils/colors';
import {getFontSize, getHeight, getWidth} from '../../utils/responsive-helper';

const ListItem = props => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchable
      onPress={props.onPress}
      style={
        props.isChecked ? styles.listItemContainerDel : styles.listItemContainer
      }>
      <Text
        style={props.isChecked ? styles.listItemTxtDel : styles.listItemTxt}>
        {props.title}
      </Text>
      {props.allList && <Text>{'>'}</Text>}
      {props.showPrice && props.grocery && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {props.showPrice && (
            <Text
              style={
                props.isChecked ? styles.listItemTxtDel : styles.listItemTxt
              }>
              {props.price} Rs{' '}
            </Text>
          )}
          {props.grocery && (
            <CheckBox
              boxType="square"
              disabled={props.disabled}
              value={props.value}
              onValueChange={props.onValueChange}
            />
          )}
        </View>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    height: getHeight(6),
    backgroundColor: '#CFD8DB',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  listItemContainerDel: {
    height: getHeight(6),
    backgroundColor: '#CA4131',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  listItemTxt: {
    fontSize: getFontSize(2.5),

    color: appColors.tab_color,
    fontWeight: 'bold',
  },
  listItemTxtDel: {
    fontSize: getFontSize(2.5),
    marginLeft: getWidth(3),
    color: appColors.tab_color,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export default ListItem;
