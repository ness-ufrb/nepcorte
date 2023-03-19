import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";

const DropdownComponent = ({ data, placeholder }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: COLORS.black }]}>
                    {placeholder}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: COLORS.black }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? placeholder : '...'}
                searchPlaceholder="Pesquisar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.grayBackground,
        width: '100%',
        padding: 20,
    },
    dropdown: {
        borderColor: COLORS.gray,
        height: 70,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        color: COLORS.grayDark,
        position: 'absolute',
        backgroundColor: COLORS.grayBackground,
        fontSize: fontSizes.descriptionTextSize,
        marginLeft: 10,
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8
    },
    placeholderStyle: {
        color: COLORS.gray,
        marginLeft: 10,
        fontFamily: 'Inter-Light',
        fontSize: fontSizes.descriptionTextSize
    },
    selectedTextStyle: {
        color: COLORS.gray,
        fontSize: fontSizes.descriptionTextSize,
        fontFamily: 'Inter-Light',
        marginLeft: 10,
    },
    inputSearchStyle: {
        color: COLORS.gray,
        fontFamily: 'Inter-Light',
        fontSize: fontSizes.descriptionTextSize,
        height: 50
    }
});
