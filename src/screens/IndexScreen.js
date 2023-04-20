import {Button, Text, View} from "react-native";
import React from "react";
import {LoginScreen} from "./LoginScreen";

export const IndexScreen = (props) => {
    const {navigation} = props
    const {navigate} = navigation
    const [session, setSession] = React.useState(true);

    return session ? (
        <View>
            <Text>IndexScreen</Text>
            <Button title={"+"} Icon={"plus"} onPress={()=>navigate("formS", {screen: "formS"}) }></Button>
        </View>
    ) : <LoginScreen></LoginScreen>
}