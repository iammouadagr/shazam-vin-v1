import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/login';
import register from './screens/register';
import dashboard from './screens/dashboard';
import productsList from './screens/productsList';
import singleProduct from './screens/singleProduct';
import addNewProduct from './screens/addNewProduct';
import scanProduct from './screens/scanProduct';


const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle : { backgroundColor : "#2C6BED"},
  headerTitleStyle : {color :"#fff"},
  headerTintColor : "#fff"
}

export default function App() {
  return (

    <Provider store={store}>
         <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen 
            options ={{ title : "Welcome to shazam-vin"}} 
            name ="Login" 
            component={login} 
          />
          <Stack.Screen 
            options ={{ title : "Get Started "}}
            name ="Register"
            component={register}
          />

          <Stack.Screen 
            options ={{ title : " Dashboard "}}
            name ="Dashboard"
            component={dashboard}
          />

          <Stack.Screen 
            options ={{ title : " Products "}}
            name ="ProductList"
            component={productsList}
          />

          <Stack.Screen 
             options ={{ title : " Product Details "}}
            name ="SingleProduct"
            component={singleProduct}
          />
          <Stack.Screen 
             options ={{ title : " New Product "}}
            name ="AddNewProduct"
            component={addNewProduct}
          />
          <Stack.Screen 
             options ={{ title : " Scan "}}
            name ="ScanProduct"
            component={scanProduct}
          />

        </Stack.Navigator>
      </NavigationContainer>
      
    </Provider>
     
    
   
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
