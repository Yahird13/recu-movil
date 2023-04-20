
import {View, Text, StyleSheet} from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import {useNavigation} from "@react-navigation/native";

export const LoginScreen = (props) => {
    const navigation = useNavigation();

    const irARegistro = () => {
        navigation.navigate('registerS');
        console.log("irARegistro")
    };
    return (
        <View>

            <View style={styles.contentForm}>
                <LoginForm />
                <Text style={styles.text}>
                    ¿Aún no tienes una cuenta?{' '}
                    <Text style={styles.textBtn} onPress={irARegistro}>
                        Registrate
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginTop: 30,
    },
    contentForm: {
        marginHorizontal: 30,
    },
    text: {
        marginTop: 15,
        marginHorizontal: 10,
        color: '#0D5BD7',
    },
    textBtn: {
        fontWeight: 'bold',
        color: '#0D5BD7',
    }
})
