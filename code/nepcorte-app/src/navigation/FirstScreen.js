import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainApp  from "./TabNavigator";
import Login from "../screens/Login";
import { getTokens } from "../api/nepcorteServer";
import { Context as AuthContext } from "../context/UserContext/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FirstScreen(){
    const { state, SetAuthenticated } = useContext(AuthContext)
    const { isAuthenticated } = state

    useEffect(()=>{
        if ( getTokens() !== null){
            SetAuthenticated(true)
            console.log(getTokens())
        }    
    }, [])

    console.log(isAuthenticated)
    return(
        <NavigationContainer>
            {!isAuthenticated ? <Login/> : <MainApp/> }
        </NavigationContainer>
    )
}