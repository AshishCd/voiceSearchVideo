import 'react-native-gesture-handler';
import React from 'react';
import Store from './src/store';
import {Provider} from 'react-redux';
import SimpleVideos from './src/SimpleVideos';
import DetailsScreen from './src/components/Details';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
        <Stack.Screen
         name="Home" 
         component={SimpleVideos}
         options={{
          headerShown:false
        }}
         />
        <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{
          title: "Video Detail"
        }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
