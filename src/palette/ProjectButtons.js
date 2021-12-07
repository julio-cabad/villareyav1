import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Label from './Label';
import {colors} from '../utils/Colors';

const ProjectButtons = (props) => {

    const {icon, onPress, text} = props;


    return (
        <View style={styles.viewContainer}>
            <View style={styles.linearGradient}/>
            <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: colors.secondColor}]} onPress={onPress}>
                <View style={{width:'25%', paddingLeft:10,  }}>
                    {icon}
                </View>
                <View style={{width:'75%'}}>
                    <Label color={'#FFF'} size={8} weight={'700'} text={text} left={7}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProjectButtons;

const styles = StyleSheet.create({

    viewContainer: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        width: '50%',
        padding: 4
    },


    linearGradient: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.appColor,
        position: 'absolute',
        left: 0,
        zIndex: 999,
    },

    buttonStyle: {
        height: 40,
        borderRadius: 25,
        backgroundColor: colors.appColor,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1000,
    },
});
