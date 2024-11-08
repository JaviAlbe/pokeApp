import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { fetchAllPokemon } from '../api/pokeapi';
import debounce from 'lodash/debounce';
import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_CACHE_KEY = 'POKEMON_LIST';

const PokemonListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<{ name: string; url: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const loadPokemon = async () => {
            setLoading(true);
            try {
                // Try to fetch from local cache first
                const cachedPokemonList = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
                if (cachedPokemonList) {
                    const parsedList = JSON.parse(cachedPokemonList);
                    setPokemonList(parsedList);
                    setFilteredPokemonList(parsedList);
                    setHasLoaded(true);
                    console.log('Loaded Pokémon list from cache');
                } else {
                    // Fetch from API if not in cache
                    const data = await fetchAllPokemon();
                    setPokemonList(data);
                    setFilteredPokemonList(data);
                    setHasLoaded(true);
                    // Save to cache
                    await AsyncStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(data));
                    console.log('Fetched and cached Pokémon list from API');
                }
            } catch (error) {
                console.error('Failed to load Pokémon:', error);
                Alert.alert('Error', 'Failed to load Pokémon. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, []);

    // Debounced function to filter Pokémon
    const debouncedFilter = useCallback(
        debounce((text: string) => {
            if (text.trim()) {
                const filteredData = pokemonList.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(text.toLowerCase().trim())
                );
                setFilteredPokemonList(filteredData);
            } else {
                // If search text is empty, reset to full list
                setFilteredPokemonList(pokemonList);
            }
        }, 2000), // 2-second debounce delay
        [pokemonList]
    );

    const handleSearch = (text: string) => {
        setSearchText(text);
        debouncedFilter(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Pokémon by name"
                    value={searchText}
                    onChangeText={handleSearch}
                />
                {loading && <Text style={styles.loadingText}>Loading...</Text>}
            </View>
            <View style={styles.listSection}>
                {hasLoaded && filteredPokemonList.length === 0 ? (
                    <Text style={styles.noMatchesText}>No matches found</Text>
                ) : (
                    <FlatList
                        data={filteredPokemonList}
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
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    listSection: {
        flex: 2,
        paddingHorizontal: 16,
    },
    searchInput: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
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
    loadingText: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        color: '#888',
    },
    noMatchesText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 16,
    },
});

export default PokemonListScreen;
