import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import logo from '../../../assets/images/logo_w.png';
import finger from '../../../assets/images/fingerImg.png';
import {Layout} from '../../styled-components/StyledComponents';
import LinearGradient from 'react-native-linear-gradient';
import Label from '../../palette/Label';
import {colors} from '../../utils/Colors';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Alerts,} from '../../palette/Alerts';
import {useNavigation} from '@react-navigation/native';
import {updateSession} from '../../database/Schemas';

const windowWidth = Dimensions.get('window').width;

const FingerPrint = () => {

    const [biometrics, setBiometrics] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        let isMounted = true;

        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => setBiometrics(biometryType))
            .catch(() => {
                Alerts('error', 'AVISO', 'Su dispositivo no dispone de servicios biométricos' +
                    'o no se han configurado el servicio de huella');
                //navigation.navigate('Login');
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {

        let isMounted = true;

        if (biometrics) {
            FingerprintScanner
                .authenticate({
                    cancelButton: 'Cancelar',
                    description: 'Ponga su huella digital en el escáner del dispositivo para continuar.',
                })
                .then(async () => {
                    Alerts('success', 'BIENVENIDO', 'Ingreso exitso');
                    const update = [1, '001'];
                    await updateSession(update);
                    navigation.navigate('Home');
                })
                .catch(() => {
                   // ErrorAlert();
                    navigation.navigate('Login');
                });
        }

        return () => {
            FingerprintScanner.release();
            isMounted = false;
        };
    }, [biometrics]);


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>

                <Image source={logo} style={{width: 155, height: 130, resizeMode: 'stretch', marginTop: 25}}/>
                <Layout center>
                    <LinearGradient colors={['#EFB611', '#ECCA12', '#EAD827']} style={styles.textContainer}>
                        <Label text={'INGRESO'} size={20} color={colors.appColor} weight={'700'}/>
                    </LinearGradient>
                </Layout>
            </View>
            <View style={styles.formContainer}>
                <Image source={finger}
                       style={{width: windowWidth - 150, height: '70%', resizeMode: 'stretch', marginTop: 25}}/>
            </View>
        </View>
    );
};

export default FingerPrint;

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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
