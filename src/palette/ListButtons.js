import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import accountStatus from '../../assets/images/note.png';
import Label from './Label';
import {colors} from '../utils/Colors';
import {forwardIcon, forwardIcon_2} from '../utils/Icons';

const ListButtons = (props) => {

    const {image, text, onPress} = props;

    return (
        <TouchableOpacity style={styles.listContainer} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
                {image}
                <Label text={text} color={colors.appColor} size={14} weight={'bold'} left={7}/>
            </View>
            <View style={{width: '10%'}}>
                {forwardIcon_2}
            </View>

        </TouchableOpacity>
    );
};

export default ListButtons;


const styles = StyleSheet.create({

    listContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,

    },

});

