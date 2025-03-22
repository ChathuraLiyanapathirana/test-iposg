import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RecordScreen, ResultsScreen} from '../screens';
import {RootStackParamList} from '../types/app';
import {theme} from '../styles/theme';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Record"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
