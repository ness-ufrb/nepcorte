import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import DropdownComponent from '../components/Dropdown';
import ProgressStep from '../components/ProgressSteps';
import { Button, Input } from '@rneui/themed';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";

// Falta implementar o disable do botão, para habilitá-lo apenas quando todos os campos estiverem preenchidos

const DetailsAnimalScreen = ({ navigation }) => {
    const code = 'A12G3'; //Este código deve ser passado pela tela anterior ou ser buscado no reducer da triagem
    const [animalAge, setAnimalAge] = useState();

    // Aqui o data deve ser definido pela tela anterior (espécie do animal)
    const sheepRaces = [
        { label: 'Morada Nova', value: '1' },
        { label: 'Cariri', value: '2' },
        { label: 'Santa Inês', value: '3' },
        { label: 'Somali', value: '4' },
        { label: 'Dâmara ou Rabo Largo', value: '5' },
        { label: 'Dorper', value: '6' }
    ];

    const goatRaces = [
        { label: 'Moxotó', value: '1' },
        { label: 'Canindé', value: '2' },
        { label: 'Anglo Nubiana', value: '3' },
        { label: 'Boer', value: '4' },
        { label: 'Savana', value: '5' },
        { label: 'Alpina', value: '6' },
        { label: 'Toggemburg', value: '7' },
        { label: 'Saanen', value: '8' }
    ];

    const reproductiveSituations = [
        { label: 'Macho', value: '1' },
        { label: 'Fêmea', value: '2' },
        { label: 'Castrado', value: '3' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header code={code} navigation={navigation} />
            <ProgressStep />
            <ScrollView centerContent={true} contentContainerStyle={styles.contentContainerScrollView}>
                <DropdownComponent data={sheepRaces} placeholder='Informe a raça'/>
                <DropdownComponent data={reproductiveSituations} placeholder='Informe a situação reprodutiva'/>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Informe a quantidade de dentes'
                    containerStyle={{
                        paddingTop: 15,
                        width: '95%'
                    }}
                    onChangeText={(newCode) => setAnimalAge(newCode)}
                />
                <Button
                    title="Finalizar triagem"
                    buttonStyle={{
                        backgroundColor: COLORS.main,
                        borderRadius: 10,
                        height: 70
                    }}
                    titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-SemiBold', }}
                    containerStyle={{
                        paddingHorizontal: 5,
                        paddingBottom: 15,
                        width: '100%'
                    }}
                    onPress={() => { 
                        console.log('Finalize assessment');
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    contentContainerScrollView: {
        width: '90%', 
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    container: {
        // position: 'relative',
        flex: 1,
        flexDirection: 'column',
    }
});

export default DetailsAnimalScreen;