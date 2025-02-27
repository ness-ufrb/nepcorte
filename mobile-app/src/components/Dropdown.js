import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";

const DropdownComponent = ({ data, placeholder, callback }) => {
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
                    callback(item.label);
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
        backgroundColor: COLORS.screenBackgroungColor,
        width: '100%',
        paddingVertical: 15,
        // paddingHorizontal: 20,        
    },
    dropdown: {
        borderColor: COLORS.black,
        height: 60,
        borderWidth: 0.5,
        borderRadius: 3,
        paddingHorizontal: 8,
    },
    label: {
        color: COLORS.grayDark,
        position: 'absolute',
        backgroundColor: COLORS.screenBackgroungColor,
        fontSize: fontSizes.descriptionTextSize,
        marginLeft: 10,
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8
    },
    placeholderStyle: {
        backgroundColor: COLORS.screenBackgroungColor,
        color: COLORS.gray,
        marginLeft: 10,
        fontFamily: 'Inter-Light',
        fontSize: fontSizes.descriptionTextSize
    },
    selectedTextStyle: {
        backgroundColor: COLORS.screenBackgroungColor,
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
