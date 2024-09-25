import React, { useContext, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import AnimalCard from '../components/AnimalCard';
import Header from "../components/Header";
import WrongSearch from "../components/WrongSearch";
import EmptyList from "../components/EmptyList";
import { Context as AnimalContext } from "../context/AnimalsContext/Context";
import { useFocusEffect } from '@react-navigation/native';
import { ReviewEndPoint } from "../api/nepcorteServer";
import { COLORS } from '../constant/colors';
import { icons } from '../constant/icons';

const AssessmentsScreen = ({ navigation }) => {
    const { state, GetAnimals, SetReviewSearchTerm, SetLoadingMore, SetRefreshing } = useContext(AnimalContext);
    const { loading, loadingMore, page, reviewSearchTerm, analysis_result, hasMore, refreshing } = state;

    // Função que faz a busca ao abrir a tela e ao digitar na barra de pesquisa
    useFocusEffect(
        React.useCallback(() => {
            const fetchInitialAnimals = () => {
                GetAnimals(reviewSearchTerm, ReviewEndPoint, 1, true);
            };
            fetchInitialAnimals();
        }, [reviewSearchTerm, navigation]) 
    );

    const fetchMoreAnimals = () => {
        if (loadingMore || !hasMore) return; 
        SetLoadingMore(true);
        GetAnimals(reviewSearchTerm, ReviewEndPoint, page);
        SetLoadingMore(false);
    };

    const onRefresh = () => {
        SetReviewSearchTerm('');
        
        GetAnimals('', ReviewEndPoint, 1, true); 
        
    };

    // Função que renderiza os itens na lista
    const renderItem = ({ item }) => {
        const analysisResult = item.analysis_result ? item.analysis_result[0] : null;
        return (
            <AnimalCard
                title={item.code}
                animalRace={item.race}
                reproductiveSituation={item.reproductiveSituation}
                age={item.age}
                species={item.species}
                isClickable={false}
                trimLevel={analysisResult ? analysisResult.marbling_level : null}
                fatDeposition={analysisResult ? analysisResult.fat_distribution : null}
                wasSent={true}
            />
        );
    };

    // Função que renderiza o conteúdo com base no estado (busca, lista vazia, carregando)
    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" style={styles.loading} />;
        }

        if (analysis_result.length > 0) {
            return (
                <FlatList
                    data={analysis_result}
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

        if (reviewSearchTerm) {
            return <WrongSearch
            message={"Nenhum animal encontrado:"}
            screen={'verifique as palavras utilizadas na busca e tente novamente...'} 
            />;
        }

        return <EmptyList 
            title={"Lista de avaliações vazia..."} 
            description={'Crie avaliações na tela "Avaliar"'} 
            imageSource={icons.camera003} 
        />;
    };

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <Header notHasReturn={true} code="Avaliações" />
            <View style={styles.textInput}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    activeOutlineColor={COLORS.grayLine}
                    mode="outlined"
                    label="Encontre o animal que deseja..."
                    left={<TextInput.Icon name={() => <FontAwesome name="search" size={24} color={COLORS.grayLine} />} />}
                    placeholder="Código, Raça, Idade, Situação..."
                    placeholderTextColor={COLORS.grayLine}
                    value={reviewSearchTerm}
                    onChangeText={(text) => { SetReviewSearchTerm(text) }}
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

export default AssessmentsScreen;
