import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';
import IconPig from "../assets/icons/019-pig.svg";
import IconLamb from "../assets/icons/031-lamb.svg";
import IconGoat from "../assets/icons/043-goat.svg";
import IconBeef from "../assets/icons/025-beef.svg";
import AnimalStatus from './AnimalStatus';
import moment from 'moment';

const AnimalCard = ({ title, animalRace, reproductiveSituation, age, species, teeth, created_at, isClickable, navigation, nextRoute, wasSent, trimLevel, fatDeposition, onPress }) => {
    
    // Formatando o tempo de criação
    const formattedDateTime = moment(created_at).format('DD/MM/YYYY [às] HH:mm');

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
            activeOpacity={isClickable ? 0.2 : 1}
            onPress={
                () => {
                    if (isClickable) {
                        onPress();
                        navigation.navigate(nextRoute);
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
                            {
                            species != "Ovino" ? 
                            <Text style={styles.age}>{age} meses</Text>
                            :
                            <Text style={styles.age}>{teeth} dentes</Text>
                        }
                            
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        {icon}
                    </View>
                </View>
                {!wasSent ?
                    <View style={styles.bottomContainer}>
                        <View style={{
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            marginVertical: 15,
                        }}></View>
                        <Text style={styles.descriptionText}>{formattedDateTime}</Text>
                    </View>
                    : null}
                {wasSent ? <AnimalStatus trimLevel={trimLevel} fatDeposition={fatDeposition}></AnimalStatus> : null}
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
        flexDirection: 'row'
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'center',
        borderRadius: 8,
        paddingTop: '4%',
        paddingBottom: '4%',
        paddingHorizontal: '4%',
        width: '85%',
        // height: 300, //Esse valor tem de ser relativo
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
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: COLORS.main,
        borderRadius: 12,
        color: COLORS.white,
        overflow: 'hidden',
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        alignSelf: 'flex-start'
    },
    leftSide: {
        height: '100%',
    },
    rightSide: {
        paddingHorizontal: '5%',
        height: '100%',
        alignSelf: 'flex-end',
    },
    descriptionText: {
        fontFamily: 'Inter-SemiBold',
        color: COLORS.grayDark,
        fontSize: fontSizes.descriptionTextSize
    },
    trimLevelContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    trimLevelText: {
        fontFamily: 'Inter-SemiBold',
        alignSelf: 'center',
        paddingVertical: 3,
        color: COLORS.gray,
        fontSize: fontSizes.descriptionTextSize,
    },
    trimLevelGood: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: '#FF5D5D',
        borderRadius: 12,
        color: COLORS.white,
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        alignSelf: 'flex-start'
    }
});

export default AnimalCard;