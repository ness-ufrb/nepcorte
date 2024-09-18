import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constant/colors';
import { FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { icons } from '../constant/icons';
import AnimalCard from '../components/AnimalCard';
import Header from "../components/Header";
import WrongSearch from "../components/WrongSearch";
import EmptyList from "../components/EmptyList";
import { Context as AnimalContext } from "../context/AnimalsContext/Context";
import { useFocusEffect } from '@react-navigation/native';
import { AnimalEndPoint } from "../api/nepcorteServer";

const AnimalsScreen = ({ navigation }) => {
    const { state, GetAnimals, SetAnimalTerm, SetLoadingMore, SetLoading, SetHasMore, SetRefreshing } = useContext(AnimalContext);
    const { loading, loadingMore, page, animalSearchTerm, animals, hasMore, refreshing } = state;

    useFocusEffect(
        React.useCallback(() => {
            const fetchInitialAnimals = async () => {
                SetLoading(true)
                await GetAnimals(animalSearchTerm, AnimalEndPoint, 1, true);
                SetLoading(false)
            };
            fetchInitialAnimals();
        }, [animalSearchTerm, navigation])
    );

    const handleSearch = (text) => {
        SetHasMore(true);
        GetAnimals(text, AnimalEndPoint, 1, true);
    };

    const fetchMoreAnimals = () => {
        if (loadingMore || !hasMore) return; 
        SetLoadingMore(true);
        GetAnimals(animalSearchTerm, AnimalEndPoint, page);
        SetLoadingMore(false);
    };

    const onRefresh = async () => {
        SetAnimalTerm('');
        SetRefreshing(true);
        await GetAnimals('', AnimalEndPoint, 1, true); 
        SetRefreshing(false);
    };

    const renderItem = ({ item }) => {
        return (
            <AnimalCard
                title={item.code}
                animalRace={item.race}
                reproductiveSituation={item.reproductiveSituation}
                age={item.age}
                species={item.species}
                created_at={item.created_at}
                isClickable={false}
                wasSent={false}
            />
        );
    };

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" style={styles.loading} />;
        }

        if (animals.length > 0) {
            return (
                <FlatList
                    data={animals}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.contentContainerFlatList}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    onEndReached={fetchMoreAnimals} 
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
                />
            );
        } 

        if (animalSearchTerm) {
            return <WrongSearch
            message={"Nenhum animal encontrado:"}
            screen={'verifique as palavras utilizadas na busca e tente novamente...'} 
            />;
        }

        return <EmptyList 
            title={"Lista de animais vazia..."} 
            description={'Crie animais na tela "Triagem"'} 
            imageSource={icons.truck054} 
        />;
    };

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <Header notHasReturn={true} code="Animais" />
            <View style={styles.textInput}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    activeOutlineColor={COLORS.grayLine}
                    mode="outlined"
                    label="Encontre o animal que deseja..."
                    left={<TextInput.Icon name={() => <FontAwesome name="search" size={24} color={COLORS.grayLine} />} />}
                    placeholder="Código, Gênero, Espécie, Raça..."
                    placeholderTextColor={COLORS.grayLine}
                    value={animalSearchTerm}
                    onChangeText={(text) => { SetAnimalTerm(text); handleSearch(text); }}
                    theme={{ 
                        colors: { text: COLORS.black }, 
                        roundness: 10 
                    }}
                    style={styles.search}
                />
            </View>

            {/* Aqui o componente vai renderizar de acordo com a lista de animais */}
            {renderContent()}

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
    },
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    footer: {
        paddingVertical: 100,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimalsScreen;
