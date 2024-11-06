import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen.';

const Stack = createStackNavigator();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PokemonList">
                <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Pokémon List' }} />
                <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Pokémon Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
