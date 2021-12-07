   import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {colors} from '../../utils/Colors';
import logo from '../../../assets/images/logo_ca.png';
import {Layout} from '../../styled-components/StyledComponents';
import LinearGradient from 'react-native-linear-gradient';
import Label from '../../palette/Label';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderCreateAccount = () => {
    return (
        <View style={styles.headContainer}>
            <View style={[styles.logoRegister, {backgroundColor: colors.logoRegisterColor}]}>
                <Image source={logo} style={{width: 120, height: 100, resizeMode: 'stretch', marginTop: 20}}/>
                <Layout center>
                    <LinearGradient colors={['#EFB611', '#ECCA12', '#EAD827']} style={styles.registerTextContainer}>
                        <Label text={'Registro'} size={20} color={'white'} weight={'700'}/>
                    </LinearGradient>
                </Layout>
            </View>
            <View style={[styles.pictureContainer, {backgroundColor: 'white'}]}>
                <View style={styles.pictureFontContainer}>
                    <View style={styles.avatarContainer}>
                        <Icon name={'user-alt'} color={colors.secondColor} size={60}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HeaderCreateAccount;

const styles = StyleSheet.create({

    headContainer: {
        width: '100%',
        height: 170,
        backgroundColor: colors.appColor,
        flexDirection: 'row',
    },

    logoRegister: {
        backgroundColor: 'white',
        width: '65%',
        height: 170,
        borderTopRightRadius: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    registerTextContainer: {
        width: '80%',
        height: 40,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pictureContainer: {
        width: '35%',
        height: 170,
        backgroundColor: 'white',
    },
    pictureFontContainer: {
        width: '100%',
        height: 170,
        backgroundColor: colors.appColor,
        borderBottomLeftRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 6,
        borderColor: colors.secondColor,
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
