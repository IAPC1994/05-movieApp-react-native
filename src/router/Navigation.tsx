import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { Movie } from '../interfaces/moviesInterfaces';


export type RootStackParams = {
    HomeScreen: undefined;
    DetailsScreen: Movie;
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
