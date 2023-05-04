import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constant/colors';
import { FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AnimalCard from '../components/AnimalCard';
import Header from "../components/Header";

// Temos que gravar a data/hora de registro animal no banco

const AssessmentsScreen = () => {
    const wasSent = true;
    const exampleData = [
        {
            id: 1,
            code: 'A12G3',
            animalRace: 'Ovino chinês',
            reproductiveSituation: 'Fêmea',
            age: '3 dentes',
            species: 'Ovino',
            trimLevel: 50.0,
            fatDeposition: 165.0
        },
        {
            id: 2,
            code: 'XA23Y',
            animalRace: 'Caprino africano',
            reproductiveSituation: 'Castrado',
            age: '2 dentes',
            species: 'Caprino',
            // trimLevel: 30.0,
            // fatDeposition: 124.0
        },
        {
            id: 3,
            code: 'A439S',
            animalRace: 'Nelore',
            reproductiveSituation: 'Macho',
            age: '1 dente',
            species: 'Bovino',
            trimLevel: 24.0,
            fatDeposition: 122.0
        }
    ];

    const renderItem = ({ item }) => {
        return <AnimalCard
            title={item.code}
            animalRace={item.animalRace}
            reproductiveSituation={item.reproductiveSituation}
            age={item.age}
            species={item.species}
            isClickable={false}
            trimLevel={item.trimLevel}
            fatDeposition={item.fatDeposition}
            wasSent={wasSent}
        />;
    };

    const [filterText, setFilterText] = useState('');
    const filteredData = exampleData.filter((item) =>
        item.species.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <Header notHasReturn={true} code="Animais" />
            <View style={styles.textInput}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    activeOutlineColor={COLORS.grayLine}
                    mode="outlined"
                    label="Encontre o animal que deseja pela espécie"
                    left={<TextInput.Icon name={() => <FontAwesome name="search" size={24} color={COLORS.grayLine} />} />}
                    placeholder="..."
                    placeholderTextColor={COLORS.grayLine}
                    value={filterText}
                    onChangeText={setFilterText}
                    theme={{ 
                        colors: { text: COLORS.black }, 
                        roundness: 10 }}
                    style={styles.search}
                />
            </View>
            <View>
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainerFlatList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    search: {         
        backgroundColor: COLORS.screenBackgroungColor,
    },
    textInput: {
        paddingBottom: '3%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        width: '90%',
        flexDirection: 'column',
    },
    contentContainerFlatList: {
        width: '100%',
        flexGrow: 1,
        // borderColor: 'black',
        // borderWidth: 2
    },
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    }
});

export default AssessmentsScreen;
