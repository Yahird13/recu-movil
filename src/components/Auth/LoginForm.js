import {StyleSheet, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";


export default function LoginForm() {
    const navigation = useNavigation()
    const [pass, setPass] = useState(false);
    const showPass = () => {
        setPass(!pass)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            pass: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid Email format").required("Required"),
            pass: Yup.string().required("Required"),
        }),
        validateOnChange: false
        ,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(
                    auth, formValue.email, formValue.pass
                )
                //se puede usar las siguientes formas
                navigation.navigate("indexS")
                //navigation.goBack()
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error at Sign-in"
                })
                console.log("login" + error)
            }
        }
    })
    return (
        <View style={styles.viewForm}>
            <Input containerStyle={styles.input} placeholder='Correo Electrónico'
                   rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon}/>}
                   onChangeText={text => formik.setFieldValue("email", text)} errorMessage={formik.errors.email}
            />
            <Input containerStyle={styles.input} placeholder='Contraseña' secureTextEntry={!pass}
                   rightIcon={<Icon type="material-community" name={pass ? "eye-off-outline" : "eye-outline"}
                                    iconStyle={styles.icon} onPress={showPass}/>}
                   onChangeText={text => formik.setFieldValue("pass", text)} errorMessage={formik.errors.pass}
            />
            <Button title={"iniciar Sesión"} containerStyle={styles.containerBtn} buttonStyle={styles.btn}
                    onPress={formik.handleSubmit} loading={formik.isSubmitting}
            />
            <Text style={styles.login} onPress={irRegistro}>Ir a Registro</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    TextForm: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    viewForm: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        width: 300,
        textAlign: 'center',
        padding: 10,
        paddingBottom: 20,
    },
    login: {
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn:{
        borderRadius: 10,
        backgroundColor: '#00a680',
    }
})