import React, {useContext, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {Layout} from '../../styled-components/StyledComponents';
import Label from '../../palette/Label';
import LoginButtons from '../../palette/LoginButtons';
import Banners from '../carousel/Banners';
import {colors} from '../../utils/Colors';
import {querySession} from '../../database/Schemas';
import {StoreContext} from '../../store/Context';
import {GenerateToken} from '../../utils/GenerateToken';
import {Alerts, ErrorAlert} from '../../palette/Alerts';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const Login = (props) => {

    const {dataStore} = useContext(StoreContext);

    const [loading, setLoading] = useState(false);

    const loadInBrowser = () => {
        Linking.openURL('https://www.ciudadceleste.com')
            .catch(err => console.error("Couldn't load page", err));
    };

    const handleEmailPwd = async () => {
        const result = await querySession();

        setLoading(true);

        if (result.length === 0) {
            setLoading(false);
            const token = await GenerateToken();
            props.navigation.navigate('LoginForm');
        }
        if (result.length > 0) {
            const {identificacion, sessionStatus, email, clave} = result[0];
            if (sessionStatus === 1) {
                const token = await GenerateToken()
                dataStore.NewToken(token);
                try {
                    await dataStore.GetDataUser(identificacion, token.access_token);
                    props.navigation.navigate('Home');
                    Alerts('success', 'BIENVENIDO', 'Ingreso exitoso');
                    await dataStore.AccountStatus(clave, email, token.access_token);
                    await dataStore.ProfilePicture();
                    await dataStore.Referred(identificacion, token.access_token);
                    setLoading(false);
                } catch (e) {
                    setLoading(false);
                    ErrorAlert();
                }

            } else {
                props.navigation.navigate('LoginForm');
                setLoading(false);
                const token = await GenerateToken();
                dataStore.NewToken(token);
                //await dataStore.GetDataUser(identificacion, token.access_token);
                //await dataStore.AccountStatus(clave, email, token.access_token);
            }
        }
    };

    const createAccount = async () => {
        props.navigation.navigate('CreateAccount');
        await dataStore.GetToken();
    };

    const fingerPrint = async () => {

        const token = await GenerateToken();
        dataStore.NewToken(token);

        const result = await querySession();
        if (result.length === 0) {
            props.navigation.navigate('CreateAccount');
        } else {
            const {identificacion, email, clave} = result[0];

            FingerprintScanner
                .isSensorAvailable()
                .then(async () => {
                    props.navigation.navigate('FingerPrint');
                    await dataStore.GetDataUser(identificacion, token.access_token);
                    await dataStore.AccountStatus(clave, email, token.access_token);
                    await dataStore.Referred(identificacion, token.access_token);
                    await dataStore.ProfilePicture();
                })
                .catch(() => {
                    Alerts('error', 'AVISO', 'Su dispositivo no dispone de servicios biométricos' +
                        'o no se ha configurado el servicio de huella.', 4000);
                });
        }
    };

    return (
        <View styele={styles.viewContainer}>
            <View style={styles.viewCarouselContainer}>
                <Banners/>
            </View>

            <View style={styles.viewLoginMethodContainer}>
                <View style={{height: '10%'}}>
                    <Layout center>
                        <Label text={'ELIGE TU MÉTODO DE INGRESO.'} color={'#FFF'} size={18} weight={'700'}/>
                    </Layout>
                </View>
                <View style={styles.buttonsContainer}>
                    <Layout center>
                        <LoginButtons text={'Usuario y contraseña'} icon={'user-alt'} onPress={handleEmailPwd}
                                      loading={loading}/>
                    </Layout>
                    <Layout center>
                        <LoginButtons text={'Huella dactilar'} icon={'fingerprint'} onPress={fingerPrint}/>
                    </Layout>
                    <Layout center>
                        <LoginButtons text={'Regístrese'} icon={'file-alt'} onPress={createAccount}/>
                    </Layout>
                </View>
                <View style={styles.extrasContainer}>
                    <Layout center row space>
                        <TouchableOpacity onPress={() => props.navigation.navigate('RecoverPassword')}>
                            <Label text={'Recuperar contraseña'} color={'#B2D1C2'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={loadInBrowser}>
                            <Label text={'Necesito ayuda'} color={'#B2D1C2'}/>
                        </TouchableOpacity>
                    </Layout>
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
    },

    viewCarouselContainer: {
        height: '50%',
    },

    viewLoginMethodContainer: {
        height: '50%',
        flexDirection: 'column',
        borderTopWidth: 5,
        borderTopColor: colors.secondColor,
        backgroundColor: colors.appColor,
        padding: 30,
    },

    buttonsContainer: {
        height: '70%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },

    extrasContainer: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonsStyles: {},
});
