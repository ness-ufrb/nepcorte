import React, { useEffect, useReducer, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";

const initialStates = {
    porcent: 0,
    length: false,
    minuscula: false,
    maiuscula: false,
    number: false
}

function reducer(state, action) {
    switch(action.type){
        case 'porcent':
            return {...state, porcent: state.porcent + action.payload}
        case 'length':
            return {...state, length: action.payload}
        case 'minuscula':
            return {...state, minuscula: action.payload}
        case 'maiuscula':
            return {...state, maiuscula: action.payload}
        case 'number':
            return {...state, number: action.payload}
        default:
            return state
    }
}

export default function PasswordStrengthMeterBar({password}){
    
    const [state, dispatch] = useReducer(reducer ,initialStates)

    useEffect(()=>{
        
        if(password.length >= 8 && state.length === false){
            dispatch({type: 'porcent', payload: 25})
            dispatch({type: 'length', payload: true})
        } 
        if (state.length === true && password.length < 8){
            if (state.porcent > 0){
                dispatch({type: 'porcent', payload: -25})
                dispatch({type: 'length', payload: false})
            }
        }
        if(/[A-Z]/.test(password) && state.maiuscula === false){
            dispatch({type: 'porcent', payload: 25})
            dispatch({type: 'maiuscula', payload: true})
        }
        if (state.maiuscula === true && !(/[A-Z]/.test(password))){
            if (state.porcent > 0){
                dispatch({type: 'porcent', payload: -25})
                dispatch({type: 'maiuscula', payload: false})
            }
        }
        if(/[a-z]/.test(password) && state.minuscula === false){
            dispatch({type: 'porcent', payload: 25})
            dispatch({type: 'minuscula', payload: true})
        }
        if (state.minuscula === true && !(/[a-z]/.test(password))){
            if (state.porcent > 0){
                dispatch({type: 'porcent', payload: -25})
                dispatch({type: 'minuscula', payload: false})
            }
        }
        if(/[0-9]/.test(password) && state.number === false){
            dispatch({type: 'porcent', payload: 25})
            dispatch({type: 'number', payload: true})
        }
        if (state.number === true && !(/[0-9]/.test(password))){
            if (state.porcent > 0){
                dispatch({type: 'porcent', payload: -25})
                dispatch({type: 'number', payload: false})
            }
        }
    
    },[password])

    if(password){
        return(
            
            <View>
                <View style={styles.emptyBar}>
                    <View style={[styles.progressBar, {width:`${state.porcent}%`}]} >
    
                    </View>
                </View>
                { !state.length && <Text style={styles.textRequirements}>Pelo menos 8 digitos</Text>}
                { !state.minuscula && <Text style={styles.textRequirements}>Letra minúscula</Text>}
                { !state.maiuscula && <Text style={styles.textRequirements}>Letra maiúscula</Text>}
                { !state.number && <Text style={styles.textRequirements}>Número</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyBar: {
        width:'100%',
        height:6,
        marginTop:10,
        backgroundColor:'#F0F0F0',
        borderRadius:4,
    },
    progressBar:{
        maxWidth:'100%',
        backgroundColor:'green',
        height:6,
        borderRadius:4,
    },
    textRequirements:{
        fontSize:10,
        fontWeight:'bold',
        paddingTop:8,
        color: COLORS.main
    }
})