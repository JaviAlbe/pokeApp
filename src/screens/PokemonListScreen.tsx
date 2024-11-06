import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchOriginalPokemon } from '../api/pokeapi';

const PokemonListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const data = await fetchOriginalPokemon();
                setPokemonList(data);
            } catch (error) {
                console.error('Failed to load Pokémon:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPokemon().then(r => console.log('end of api call'));
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading Pokémon...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonList}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}
                    >
                        <Text style={styles.pokemonName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    pokemonName: {
        fontSize: 18,
        fontWeight: '500',
    },
});

export default PokemonListScreen;
