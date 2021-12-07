import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View, Keyboard} from 'react-native';
import {colors} from '../../utils/Colors';
import logo from '../../../assets/images/logo_w.png';
import {Layout} from '../../styled-components/StyledComponents';
import LinearGradient from 'react-native-linear-gradient';
import Label from '../../palette/Label';
import {recoverSchema, recoverValues} from '../../utils/FormsSchemas';
import EditText from '../../palette/EditText';
import {emailIcon, imgBack, sendIcon,} from '../../utils/Icons';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {PROYECTO, RECOVER_PWD_URL} from '@env';
import {GenerateToken} from '../../utils/GenerateToken';
import axios from 'axios';
import {Alerts, ErrorAlert} from '../../palette/Alerts';

const RecoverPassword = () => {

    const [loading, setLoading] = useState(false);

    const formikRef = useRef();
    const navigation = useNavigation();

    const onSubmit = async (values) => {

        setLoading(true);
        Keyboard.dismiss()
        const token = await GenerateToken();
        const headers = {'Authorization': `Bearer ${token.access_token}`, 'Content-Type': 'application/json'};
        const data = {email: values.email, proyecto: PROYECTO};
        const url = `${RECOVER_PWD_URL}?email=${values.email}&${PROYECTO}`
        try {
            const result = await axios.post(url, data, {headers: headers});
            Alerts('success', 'CONTRASEÑA ENVIADA', `${result.data}`);
            formikRef.current?.setSubmitting(false);
            formikRef.current?.resetForm();
            navigation.navigate('Login');
            setLoading(false);
        } catch (e) {
            setLoading(false);
            formikRef.current?.setSubmitting(false);
            formikRef.current?.resetForm();
            ErrorAlert();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>

                <Image source={logo} style={{width: 155, height: 130, resizeMode: 'stretch', marginTop: 25}}/>
                <Layout center>
                    <LinearGradient colors={['#EFB611', '#ECCA12', '#EAD827']} style={styles.textContainer}>
                        <Label text={'RECUPERAR CONTRASEÑA'} size={15} color={'white'} weight={'700'}/>
                    </LinearGradient>
                </Layout>
            </View>
            <View style={styles.formContainer}>
                <Formik
                    innerRef={formikRef}
                    validateOnMount={false}
                    validationSchema={recoverSchema}
                    initialValues={recoverValues}
                    onSubmit={values => onSubmit(values)}
                >
                    {({
                          handleChange,
                          handleSubmit,
                          values,
                          errors,
                      }) => (
                        <>
                            <EditText label={'E-MAIL'} field={'email'} placeholder={'INGRESA TUS DATOS'}
                                      icon={emailIcon} value={values.email} onChangeText={handleChange}
                                      errors={errors.email}
                            />
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 35
                            }}
                                              onPress={() => navigation.navigate('Login')}>
                                {imgBack}
                                <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}
                                              disabled={loading}>
                                {loading ?
                                    <ActivityIndicator size="small" color={'white'}/> : sendIcon}
                                <Label text={'ENVIAR'} color={'white'} weight={'700'} left={10} size={16}/>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
                <Label text={'Se enviará un correo electrónico con una nueva clave para ingresar a la aplicación'}
                       left={'14%'} color={colors.appColor} top={20}/>
            </View>
        </View>
    );
};

export default RecoverPassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.appColor,
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '30%',
        backgroundColor: colors.appColor,
    },

    textContainer: {
        width: '50%',
        height: 40,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 60,
        borderTopWidth: 3,
        borderRightWidth: 3,
        padding: 20,
        borderTopColor: colors.secondColor,
        borderRightColor: colors.secondColor,
    },

    bodyContainer: {
        flexGrow: 1,
        paddingHorizontal: 30,
    },


    buttonStyle: {
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.secondColor,
        marginTop: 20,
        borderRadius: 10,
        marginLeft: '10%',
    },
});
