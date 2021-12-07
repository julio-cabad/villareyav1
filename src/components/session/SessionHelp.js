import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/Colors';
import logo from '../../../assets/images/logo_w.png';
import {Layout} from '../../styled-components/StyledComponents';
import LinearGradient from 'react-native-linear-gradient';
import Label from '../../palette/Label';
import HelpButtons from '../../palette/HelpButtons';
import {chatIcon, helpIcon} from '../../utils/Icons';

const SessionHelp = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={{width: 155, height: 130, resizeMode: 'stretch', marginTop: 25}}/>
                <Layout center>
                    <LinearGradient colors={['#68C6E5', '#8BD3EB', '#B7E4F2']} style={styles.textContainer}>
                        <Label text={'Necesito ayuda'} size={15} color={colors.appColor} weight={'700'}/>
                    </LinearGradient>
                </Layout>
            </View>
            <View style={styles.formContainer}>
                <HelpButtons icon={chatIcon} text={'CHAT BOOT'} width={'70%'} size={16} />
                <HelpButtons icon={helpIcon} text={'CONTACTANOS'} width={'70%'} size={16} top={70}/>
            </View>
        </View>
    );
};

export default SessionHelp;

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
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 10,
        borderRadius: 10,
        marginLeft: '10%',
    },
});
