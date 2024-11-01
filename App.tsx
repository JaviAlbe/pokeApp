import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const App: React.FC = () => {
    const handlePress = () => {
        Alert.alert("Hello from PokeApp!", "This is the landing screen.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to PokeApp</Text>
            <Text style={styles.subtitle}>Expo is landing here!</Text>
            <Button title="Press Me" onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
});

export default App;
