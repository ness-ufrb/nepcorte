import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";

//tela de loading com fundo preto que aparece em requisições nas áreas de usuário
export default function Loading() {
    return(
        <Modal transparent={true} visible={true} animationType="fade">
            <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)', alignItems:'center', justifyContent:'center'} } >
                <ActivityIndicator color={'white'} size={'large'} style={{padding:30}}/>
            </View> 
        </Modal>
    )
}