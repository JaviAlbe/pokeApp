import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { fetchOriginalPokemon } from './src/api/pokeapi';

const App: React.FC = () => {
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

        loadPokemon();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading Pokémon...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Original 150 Pokémon</Text>
            <FlatList
                data={pokemonList}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.pokemonName}>{item.name}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
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
        elevation: 3, // Adds a shadow effect on Android
    },
    pokemonName: {
        fontSize: 18,
        fontWeight: '500',
    },
});

export default App;
