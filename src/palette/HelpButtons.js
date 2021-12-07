import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Label from './Label';
import {colors} from '../utils/Colors';

const HelpButtons = (props) => {

    const {text, icon, onPress, width, size, top} = props;

    return (
        <View style={[styles.viewContainer, {width: width, marginTop: top}]}>
            <LinearGradient colors={['#EFB611', '#ECCA12', '#EAD827']} style={styles.linearGradient}>
                {icon}
            </LinearGradient>
            <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
                <Label color={'#FFF'} size={size ? size : 8} weight={'700'} text={text} left={30}/>
            </TouchableOpacity>
        </View>
    );
};

export default HelpButtons;

const styles = StyleSheet.create({

    viewContainer: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
    },
    linearGradient: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        zIndex: 1000,
    },

    buttonStyle: {
        height: 35,
        borderRadius: 15,
        width: '100%',
        backgroundColor: colors.secondColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        zIndex: 999,
        marginLeft: 10,
    },
});
