import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../presentation/screens/movies/homeScreen';
import DetailMovie from '../presentation/screens/movies/detailScreen';
import {TouchableOpacity} from 'react-native';
import FavouritesMovies from '../presentation/screens/movies/favouriteScreen';
import {Icon} from 'react-native-elements';
import { defaultColor, primaryColor, secondaryColor } from '../styles/styles';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          title: '',
          headerStyle: {backgroundColor: primaryColor},
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('FavouritesMovies')}>
              <Icon name="heart" type="font-awesome" size={30} color={secondaryColor} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DetailMovie"
        component={DetailMovie}
        options={{
          title: '',
          headerStyle: {backgroundColor: primaryColor},
          headerTintColor: defaultColor,
        }}
      />
      <Stack.Screen
        name="FavouritesMovies"
        component={FavouritesMovies}
        options={{
          title: 'Favourites',
          headerStyle: {backgroundColor: primaryColor},
          headerTintColor: defaultColor,
        }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
