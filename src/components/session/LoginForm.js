import React, {useContext, useRef, useState} from 'react';
import {
    Image,
    ImageBackground,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import {loginValidationSchema} from '../../utils/FormsSchemas';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../utils/Colors';
import {Formik} from 'formik';
import {Layout} from '../../styled-components/StyledComponents';
import Label from '../../palette/Label';
import {useNavigation} from '@react-navigation/native';
import logo from '../../../assets/images/logo_w.png';
import house from '../../../assets/images/house.png';
import fileIcon from '../../../assets/images/fileIcon.png';
import LinearGradient from 'react-native-linear-gradient';
import EditText from '../../palette/EditText';
import {imgBack, loginIcon, pwdIcon, userIcon} from '../../utils/Icons';
import {Alerts, ErrorAlert} from '../../palette/Alerts';
import {StoreContext} from '../../store/Context';
import {GenerateToken} from '../../utils/GenerateToken';
import {querySession, updateSession} from '../../database/Schemas';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import {LOGIN_URL, PROYECTO_NUMBER,} from '@env';
import axios from 'axios';

const LoginForm = () => {

    const {dataStore} = useContext(StoreContext);

    const [loading, setLoading] = useState(false);

    const formikRef = useRef();
    const navigation = useNavigation();

    const onSubmit = async (values) => {
        const {email, password} = values;

        setLoading(true);
        Keyboard.dismiss();
        const result = await querySession();
        const token = await GenerateToken();
        dataStore.NewToken(token);

        const expiration = addHours(new Date(), 23);
        const expirationToken = format(expiration, 'yyyy-MM-dd HH:mm');

        if (result.length === 0) {
            const data = {identificacion: email, proyecto: PROYECTO_NUMBER, clave: password};
            const headers = {'Authorization': `Bearer ${token.access_token}`, 'Content-Type': 'application/json'};
            const loginResult = await axios.post(LOGIN_URL, data, {headers: headers});
            const client = loginResult.data.cliente;
            const idUser = loginResult.data.identificacion;

            const dataInsert = ['001', idUser, email, password, expirationToken, 1];

            if (client) {
                await dataStore.GetDataUser(idUser, token.access_token);
                await dataStore.ProfilePicture();
                setLoading(false);
                Alerts('success', 'BIENVENIDO', `${client}`);
                navigation.navigate('Home');
                await dataStore.AccountStatus(values.password, values.email, token.access_token, dataInsert);
                await dataStore.Referred(idUser, token.access_token);
            } else {
                Alerts('error', 'AVISO', 'Usuario o contraseña incorrecta');
                setLoading(false);
                formikRef.current?.setSubmitting(false);
                formikRef.current?.resetForm();
            }
        }

        if (result.length > 0) {
            setLoading(true);
            try {
                const data = {identificacion: email, proyecto: PROYECTO_NUMBER, clave: password};
                const headers = {'Authorization': `Bearer ${token.access_token}`, 'Content-Type': 'application/json'};
                const loginResult = await axios.post(LOGIN_URL, data, {headers: headers});
                const client = loginResult.data.cliente;

                if (loginResult.data.lista === null) {
                    setLoading(false);
                    Keyboard.dismiss();
                    Alerts('error', 'AVISO', 'Usuario o contraseña incorrecta');
                } else {

                    Alerts('success', 'BIENVENIDO', `${client}`);
                    navigation.navigate('Home');
                    const loginResult = await axios.post(LOGIN_URL, data, {headers: headers});
                    const idUser = loginResult.data.identificacion;
                    const update = [1, idUser, email, password, '001'];
                    await updateSession(update);
                    await dataStore.GetDataUser(idUser, token.access_token);
                    await dataStore.AccountStatus(password, email, token.access_token);
                    await dataStore.ProfilePicture();
                    await dataStore.Referred(idUser, token.access_token);
                    setLoading(false);
                    formikRef.current?.setSubmitting(false);
                    formikRef.current?.resetForm();
                }

            } catch (e) {
                setLoading(false);
                ErrorAlert();
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>

                <Image source={logo} style={{width: 155, height: 130, resizeMode: 'stretch', marginTop: 25}}/>
                <Layout center>
                    <LinearGradient colors={['#EFB611', '#ECCA12', '#EAD827']} style={styles.textContainer}>
                        <Label text={'INGRESO'} size={20} color={'white'} weight={'700'}/>
                    </LinearGradient>
                </Layout>

            </View>
            <View style={styles.formContainer}>
                <ImageBackground source={house} resizeMode="cover" style={styles.image}
                                 imageStyle={{borderTopRightRadius: 60}}>
                    <View style={styles.overlay}>
                        <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainer} scrollEnabled
                                                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                                 resetScrollToCoords={{x: 0, y: 0}}
                                                 extraHeight={40} extraScrollHeight={40}
                                                 enableOnAndroid={true}
                                                 keyboardShouldPersistTaps="handled">
                            <Layout center>
                                <Image source={fileIcon} style={styles.avatarContainer}/>
                            </Layout>
                            <Formik
                                innerRef={formikRef}
                                validateOnMount={false}
                                validationSchema={loginValidationSchema}
                                initialValues={{email: '', password: ''}}
                                onSubmit={values => onSubmit(values)}
                            >
                                {({
                                      handleChange,
                                      handleSubmit,
                                      values,
                                      errors,
                                  }) => (
                                    <>
                                        <EditText label={'USUARIO'} field={'email'} placeholder={'INGRESA TUS DATOS'}
                                                  icon={userIcon} value={values.email} onChangeText={handleChange}
                                                  errors={errors.email}
                                        />

                                        <EditText label={'CONTRASEÑA'} field={'password'} icon={pwdIcon} top={5}
                                                  placeholder={'INGRESA TUS DATOS'} errors={errors.password}
                                                  value={values.password} onChangeText={handleChange}
                                        />

                                        <TouchableOpacity style={{
                                            flexDirection: 'row', alignItems: 'center', marginTop: 5,
                                            paddingLeft: 5, marginLeft: 30
                                        }}
                                                          onPress={() => navigation.navigate('Login')}>
                                            {imgBack}
                                            <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                                        </TouchableOpacity>

                                        <Layout center top={20}>
                                            <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}
                                                              disabled={loading}>
                                                {loading ?
                                                    <ActivityIndicator size="small" color={'white'}/> : loginIcon}
                                                <Label text={'ENVIAR'} size={12} color={'#FFF'} weight={'700'}
                                                       left={10}/>
                                            </TouchableOpacity>
                                        </Layout>
                                    </>
                                )}
                            </Formik>

                        </KeyboardAwareScrollView>
                    </View>
                </ImageBackground>
            </View>
        </View>

    );
};

export default LoginForm;


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
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        borderTopRightRadius: 60,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopColor: colors.secondColor,
        borderRightColor: colors.secondColor,
    },

    bodyContainer: {
        flexGrow: 1,
        paddingHorizontal: 30,
    },

    image: {
        flex: 1,
    },

    overlay: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        borderTopRightRadius: 60,
    },

    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '50%',
        height: 35,
        backgroundColor: colors.secondColor,
        borderRadius: 15,
    },
});

