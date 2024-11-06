import React from "react";
import { View, TextInput } from "react-native";

export default function CopyInput(){
    return (
        <View style={styles.textInput}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                activeOutlineColor={COLORS.gray}
                mode="outlined"
                label="Código"
                placeholder="Informe o código recebido no e-mail"
                value={values.token} // Corrigido para usar 'token' em vez de 'email'
                onChangeText={handleChange('token')} // Corrigido para usar 'token' em vez de 'email'
                outlineColor={errors.token && touched.token ? 'red' : COLORS.gray}
                style={styles.inputStyle}
                outlineStyle={styles.outlineStyle}
            />
            <View >
                <Ionicons color={'black'} name='copy'/>
            </View>
        </View>
    )
}