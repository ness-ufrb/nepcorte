import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { COLORS } from "../constant/colors";
import Header from "../components/Header";
import AnimalCard from "../components/AnimalCard";


const RackAssessScreen = ({ navigation }) => {

    const exampleData = [
        {
            id: 1,
            code: 'A12G3',
            animalRace: 'Ovino chinês',
            reproductiveSituation: 'Fêmea',
            age: '3 dentes',
            species: 'Ovino'
        },
        {
            id: 2,
            code: 'XA23Y',
            animalRace: 'Caprino africano',
            reproductiveSituation: 'Castrado',
            age: '2 dentes',
            species: 'Caprino'
        },
        {
            id: 3,
            code: 'A439S',
            animalRace: 'Nelore',
            reproductiveSituation: 'Macho',
            age: '1 dente',
            species: 'Bovino'
        }
    ];

    const renderItem = ({ item }) => {
        return <AnimalCard
            title={item.code}
            animalRace={item.animalRace}
            reproductiveSituation={item.reproductiveSituation}
            age={item.age}
            species={item.species}
            isClickable={true}
            navigation={navigation}
            nextRoute="InstructionsRackAssess"
        />;
    };

    const [filterText, setFilterText] = useState('');
    const filteredData = exampleData.filter((item) =>
        item.species.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header code="Avaliar carré" navigation={navigation}/>
            <Text style={styles.title}>Escolha o animal a ser analisado</Text>
            <View style={styles.textInput}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    activeOutlineColor={COLORS.grayLine}
                    mode="outlined"
                    label="Encontre o animal que deseja"
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
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainerFlatList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
        flexDirection: 'column',
    },
    title: {
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: COLORS.black,
        textAlign: 'center',
    },
    textInput: {
        paddingTop: 10,
        alignSelf: 'center',
        paddingHorizontal: 10,
        width: '90%',
        flexDirection: 'column',
    },
    search: {         
        backgroundColor: COLORS.screenBackgroungColor,
    },
    contentContainerFlatList: {
        width: '100%',
        flexGrow: 1,
        paddingTop: 20,
    },
});

export default RackAssessScreen;