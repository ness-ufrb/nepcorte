import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';
import IconPig from "../assets/icons/019-pig.svg";
import IconLamb from "../assets/icons/031-lamb.svg";
import IconGoat from "../assets/icons/043-goat.svg";
import IconBeef from "../assets/icons/025-beef.svg";

const AnimalCard = ({ title, animalRace, reproductiveSituation, age, species, isClickable }) => {

    let icon;
    switch (species) {
        case "Ovino":
            icon = <IconLamb width={80} height={89} fill={COLORS.black} />
            break;
        case "Bovino":
            icon = <IconBeef width={80} height={89} fill={COLORS.black} />
            break;
        case "Suíno":
            icon = <IconPig width={80} height={89} fill={COLORS.black} />
            break;
        case "Caprino":
            icon = <IconGoat width={80} height={89} fill={COLORS.black} />
            break;
        default:
            icon = <IconBeef width={80} height={89} fill={COLORS.black} />
            break;
    }

    return (
        <TouchableOpacity
            activeOpacity={isClickable? 0.2 : 1}
            onPress={
                () => {
                    if (isClickable) {
                        console.log('Faz algo caso isClickable seja true');
                        // colocar navegação de tela aqui
                    }
                }
            }
        >
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.leftSide}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{animalRace}</Text>
                        <Text style={styles.description}>{reproductiveSituation}</Text>
                        <View style={styles.ageLabel}>
                            <Text style={styles.age}>{age}</Text>
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        {icon}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={{
                        fontFamily: 'Inter-SemiBold',
                        color: COLORS.grayDark,
                        fontSize: fontSizes.descriptionTextSize,
                        borderTopColor: COLORS.grayLine,
                        borderTopWidth: 1
                    }}>Registrado em 12/12/2022 às 16:25</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        justifyContent: 'flex-end'
    },
    topContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: 'blue',
        borderWidth: 2
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        height: 200,
        marginHorizontal: '5%',
        marginVertical: '3%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.buttonTextSize
    },
    description: {
        paddingVertical: 3,
        color: COLORS.gray,
        fontSize: fontSizes.descriptionTextSize,
    },
    age: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: COLORS.main,
        borderRadius: 12,
        color: COLORS.white,
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        alignSelf: 'flex-start'
    },
    leftSide: {
        height: '100%',
        borderColor: 'green',
        borderWidth: 2
    },
    rightSide: {
        paddingHorizontal: '5%',
        height: '100%',
        alignSelf: 'flex-end',
        borderColor: 'red',
        borderWidth: 2
    }
});

export default AnimalCard;