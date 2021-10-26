import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/login';
import register from './screens/register';


const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle : { backgroundColor : "#2C6BED"},
  headerTitleStyle : {color :"#fff"},
  headerTintColor : "#fff"
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen 
            options ={{ title : "Get Started"}} 
            name ="Login" 
            component={login} 
          />
          <Stack.Screen 
            options ={{ title : "Admin "}}
            name ="Register"
            component={register}
          />

        </Stack.Navigator>
      </NavigationContainer>
      
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
