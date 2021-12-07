import React, {useContext, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TextInput,
    ActivityIndicator,
    TouchableOpacity, Keyboard,
} from 'react-native';
import {colors} from '../../utils/Colors';
import HeaderCreateAccount from './HeaderCreateAccount';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EditText from '../../palette/EditText';
import {
    emailIcon,
    idCardIcon, imgBack, pwdIcon,
    registerIcon,
    searchIcon,
} from '../../utils/Icons';
import {Layout} from '../../styled-components/StyledComponents';
import Label from '../../palette/Label';
import {registerSchema} from '../../utils/FormsSchemas';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../store/Context';
import {GET_DATAUSER_URL, PROYECTO, USER_REGISTER_URL, PROYECTO_NUMBER} from '@env';
import axios from 'axios';
import {Alerts, ErrorAlert} from '../../palette/Alerts';
import ActionButton from '../../palette/ActionButton';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import {querySession} from '../../database/Schemas';


function isNumeric(num) {
    num = '' + num; //coerce num to be a string
    return !isNaN(num) && !isNaN(parseFloat(num));
}


const CreateAccount = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {dataToken} = dataStore;

    const [loading, setLoading] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [buttonText, setButtonText] = useState('Registrarse');
    const [errors, setError] = useState(false);
    const [textError, setTextError] = useState('La identificación es requerida');
    const [idUser, setIdUser] = useState('');
    const [dataUser, setDataUser] = useState(null);

    const formikRef = useRef();

    const onChangeText = (text) => {
        text === '' ? setError(true) : setError(false);
        text === '' ? setTextError('La identificación es requerida') : setTextError('');
        isNumeric(text) ? setError(false) : setError(true);
        isNumeric(text) ? setTextError('') : setTextError('Ingresar sólo números');
        setIdUser(text.replace(/[^0-9]/g, ''));
    };

    const handleGetDataUser = async () => {
        if (idUser === '') {
            setError(true);
            return;
        }

        Keyboard.dismiss();
        setLoading(true);
        const url = `${GET_DATAUSER_URL}${idUser}&${PROYECTO}`;
        const headers = {'Authorization': `Bearer ${dataToken?.access_token}`};

        await axios.get(url, {headers: headers}).then(res => {
            const {respuesta, identificacion, nombres, email, telefono, direccion} = res.data;
            if (respuesta === 'ok') {
                setDataUser({...dataUser, identificacion, nombres, email, telefono, direccion});
            } else {
                setDataUser(null);
                props.navigation.navigate('Login');
                Alerts('error', 'AVISO', 'Cliente no resgistrado');
            }
            setLoading(false);
        }).catch((e) => {
            console.log(e);
            ErrorAlert();
            setDataUser(null);
            setLoading(false);
        });
    };

    const onSubmit = async (values) => {

        const expiration = addHours(new Date(), 23);
        const expirationToken = format(expiration, 'yyyy-MM-dd HH:mm');

        const data = {identificacion: idUser, proyecto: PROYECTO_NUMBER, clave: values.password};
        const dataInsert = ['001', idUser, values.email, values.password, expirationToken, 1];

        const headers = {'Authorization': `Bearer ${dataToken?.access_token}`, 'Content-Type': 'application/json'};

        setLoadingRegister(true);
        Keyboard.dismiss();

        setTimeout(() => setButtonText('Registrando'), 4000);

        await axios.post(USER_REGISTER_URL, data, {headers: headers})
            .then(async (res) => {
                const result = await querySession();
                if (result.length > 0 || res.data === 'Cliente ya registrado') {
                    setLoadingRegister(false);
                    setTimeout(() => setButtonText('Regístrese'), 4001);
                    Alerts('info', 'USUARIO REGISTRADO', 'Usuario registrado');
                } else {
                    dataStore.DataUser(dataUser);
                    await dataStore.GetDataUser(idUser, dataToken?.access_token);
                    await dataStore.AccountStatus(values.password, values.email, dataToken?.access_token, dataInsert);
                    setLoadingRegister(false);
                    setButtonText('Regístrese');
                    Alerts('success', 'BIENVENIDO', `${dataUser?.nombres}`);
                    props.navigation.navigate('Home');
                    await dataStore.ProfilePicture();
                    await dataStore.Referred(idUser, dataToken?.access_token);
                }
            }).catch(() => {
                ErrorAlert();
                setLoadingRegister(false);
            });
    };

    return (
        <View style={styles.mainContainer}>
            <HeaderCreateAccount/>
            <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainer} scrollEnabled
                                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                     resetScrollToCoords={{x: 0, y: 0}}
                                     extraHeight={60} extraScrollHeight={60}
                                     enableOnAndroid={true}
                                     keyboardShouldPersistTaps="handled">
                <Layout row center padding={5} top={10}>
                    <View style={styles.iconContainer}>
                        {idCardIcon}
                    </View>
                    <View style={styles.inputContainer}>
                        <Label text={'IDENTIFICACIÓN'} color={colors.appColor} size={12} weight={'600'} left={5}/>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={{flex: 1, paddingHorizontal: 3, color: '#333'}}
                                placeholder={'INGRESA TUS DATOS'}
                                value={idUser}
                                keyboardType="phone-pad"
                                onChangeText={text => onChangeText(text)}
                                underlineColorAndroid="transparent"/>
                            <View>
                                {loading ? <ActivityIndicator size="small" color={colors.secondColor}/> :
                                    <ActionButton radius={20} icon={searchIcon} onPress={handleGetDataUser}/>}
                            </View>
                        </View>
                        {errors && <Label text={textError} color={'red'} size={10}/>}
                        {dataUser === null &&
                        <TouchableOpacity style={{
                            flexDirection: 'row', alignItems: 'center', marginTop: 5,
                        }}
                                          onPress={() => props.navigation.navigate('Login')}>
                            {imgBack}
                            <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                        </TouchableOpacity>}
                    </View>

                </Layout>

                <Formik
                    innerRef={formikRef}
                    validateOnMount={false}
                    validationSchema={registerSchema}
                    initialValues={{email: dataUser?.email ? dataUser?.email : '', password: ''}}
                    onSubmit={values => onSubmit(values)}
                >
                    {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          errors,
                      }) => {

                        values.email = dataUser?.email ? dataUser?.email : '';

                        return (
                            <>
                                {dataUser &&
                                <View>
                                    <EditText label={'E-MAIL'} field={'email'} placeholder={'INGRESA TUS DATOS'}
                                              icon={emailIcon} top={5} onChangeText={handleChange}
                                              editable errors={errors.email} value={values.email}
                                    />

                                    <EditText label={'CONTRASEÑA'} field={'password'} placeholder={'INGRESA TUS DATOS'}
                                              icon={pwdIcon} top={5} onChangeText={handleChange}
                                              editable errors={errors.password} value={values.password}
                                    />

                                    <EditText label={'CONFIRMAR CONTRASEÑA'} field={'checkPassword'} icon={pwdIcon}
                                              placeholder={'INGRESA TUS DATOS'} onChangeText={handleChange} top={5}
                                              editable errors={errors.checkPassword} value={values.checkPassword}
                                    />
                                    <TouchableOpacity style={{
                                        flexDirection: 'row', alignItems: 'center', marginTop: 5,
                                    }}
                                                      onPress={() => props.navigation.navigate('Login')}>
                                        {imgBack}
                                        <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}
                                                      disabled={loadingRegister}>
                                        {loadingRegister ?
                                            <ActivityIndicator size="small" color={'white'}/> : registerIcon}
                                        <Label text={buttonText} color={'white'} weight={'700'} left={10} size={16}/>
                                    </TouchableOpacity>
                                </View>}


                                <View style={{
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginTop: 20,
                                }}>
                                </View>
                            </>
                        );

                    }}
                </Formik>

                <View style={{paddingVertical: 10}}/>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default observer(CreateAccount);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
    },

    iconContainer: {
        width: '10%',
        height: '100%',
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'column',
    },

    bodyContainer: {
        flexGrow: 1,
        position: 'relative',
        //justifyContent: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 60,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopColor: colors.secondColor,
        borderRightColor: colors.secondColor,
        padding: 30,
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.secondColor,
        paddingHorizontal: 5,
        borderRadius: 5,
        height: 40,
        width: '100%',
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
