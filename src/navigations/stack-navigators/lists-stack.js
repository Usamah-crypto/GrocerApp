import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllListScreen from '../../screens/all-lists-screen';
import createListScreen from '../../screens/create-screen';
import GroceryListScreen from '../../screens/grocery-list-screen';

const Stack = createStackNavigator();

export const ListStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GroceryListScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroceryListScreen" component={GroceryListScreen} />
      <Stack.Screen name="AllListScreen" component={AllListScreen} />
      <Stack.Screen name="CreateListScreen" component={createListScreen} />
    </Stack.Navigator>
  );
};
