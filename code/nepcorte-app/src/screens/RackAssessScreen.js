import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { COLORS } from "../constant/colors";
import Header from "../components/Header";
import AnimalCard from "../components/AnimalCard";
import WrongSearch from "../components/WrongSearch";
import EmptyList from "../components/EmptyList";
import { Context as AnimalContext } from "../context/AnimalsContext/Context";
import { useFocusEffect } from '@react-navigation/native';
import { icons } from "../constant/icons";
import { AnimalEndPoint } from "../api/nepcorteServer";
import { Context as AssessmentsContext } from "../context/AssessContext/Context";

const RackAssessScreen = ({ navigation }) => {
    const { state, GetAnimals, SetAnimalTerm, SetLoadingMore, SetLoading, SetPage, SetHasMore, SetRefreshing } = useContext(AnimalContext);
    const { loading, loadingMore, page, animalSearchTerm, animals, hasMore, refreshing } = state;
    const { SetAnimalId } = useContext(AssessmentsContext) 

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
                animalRace={item.animalRace}
                reproductiveSituation={item.reproductiveSituation}
                age={item.age}
                species={item.species}
                created_at={item.created_at}
                isClickable={true}
                navigation={navigation}
                onPress={()=>SetAnimalId(item.id)}
                nextRoute="InstructionsRackAssess"
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
                    value={animalSearchTerm}
                    onChangeText={(text) => { SetAnimalTerm(text); handleSearch(text); }}
                    theme={{ 
                        colors: { text: COLORS.black }, 
                        roundness: 10 }}
                    style={styles.search}
                />
            </View>
            {renderContent()}
        </SafeAreaView>
    );
};

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
        paddingBottom: '3%',
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RackAssessScreen;
