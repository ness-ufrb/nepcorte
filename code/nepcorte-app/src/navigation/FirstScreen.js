import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainApp  from "./TabNavigator";
import Login from "../screens/Login";
import { Context as AuthContext } from "../context/UserContext/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FirstScreen(){
    const { state, SetAuthenticated } = useContext(AuthContext)
    const { isAuthenticated } = state

    useEffect(()=>{
        const verifyUser = async () =>{
            const token = await AsyncStorage.getItem('accessToken')
            if ( token !== null){
                SetAuthenticated(true)
                console.log(token)
            }
        }
        verifyUser()
    }, [])

    console.log(isAuthenticated)
    return(
        <NavigationContainer>
            {isAuthenticated ? <MainApp/> : <Login/> }
        </NavigationContainer>
    )
}