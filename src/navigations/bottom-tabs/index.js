import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllListScreen from '../../screens/all-lists-screen';
import GroceryListScreen from '../../screens/grocery-list-screen';
import {getHeight} from '../../utils/responsive-helper';
import {appColors} from '../../utils/colors';
import {ListStack} from '../stack-navigators/lists-stack';

const Tab = createMaterialTopTabNavigator();

export const Bottomtabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          flex: 0.09,
          paddingBottom: Platform.OS === 'ios' ? getHeight(1) : getHeight(0),
          borderTopWidth: 0.2,
          borderColor: 'gray',
          backgroundColor: appColors.tab_color,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',

        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
        }}
        name="ListStack"
        component={ListStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'All List',
        }}
        name="AllListScreen"
        component={AllListScreen}
      />
    </Tab.Navigator>
  );
};
