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
            <Input containerStyle={styles.input} placeholder='Email'
                   rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon}/>}
                   onChangeText={text => formik.setFieldValue("email", text)} errorMessage={formik.errors.email}
            />
            <Input containerStyle={styles.input} placeholder='Password' secureTextEntry={!pass}
                   rightIcon={<Icon type="material-community" name={pass ? "eye-off-outline" : "eye-outline"}
                                    iconStyle={styles.icon} onPress={showPass}/>}
                   onChangeText={text => formik.setFieldValue("pass", text)} errorMessage={formik.errors.pass}
            />
            <Button title={"Login"} containerStyle={styles.containerBtn} buttonStyle={styles.btn}
                    onPress={formik.handleSubmit} loading={formik.isSubmitting}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm: {
        marginTop: 30,

    },
    containerBtn: {
        width: "95%",
        marginTop: 20,

    },
    btn: {
        backgroundColor: "green"
    }
})