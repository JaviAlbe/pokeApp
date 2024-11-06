import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PokemonDetailScreen: React.FC<{ route: any }> = ({ route }) => {
    const { name } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokémon Details</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
    },
});

export default PokemonDetailScreen;
