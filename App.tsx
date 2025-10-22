import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddMenuItemScreen from './screens/AddMenuItemScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#2E7D32' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Chef Christoffel Menu' }} />
        <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} options={{ title: 'Add Menu Item' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;