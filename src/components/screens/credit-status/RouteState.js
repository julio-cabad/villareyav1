import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Label from '../../../palette/Label';
import {colors} from '../../../utils/Colors';

const RouteState = (props) => {

    const {icon, text, number, color, left} = props;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <View style={[styles.textContainer, {justifyContent: left ? 'flex-end' : 'flex-start'} ]}>
                <View style={[styles.numberContainer, {backgroundColor: color}]}>
                    <Label text={number} color={'#FFF'} size={10}/>
                </View>
                <Label text={text} color={color} size={8} left={5} weight={'600'}/>
            </View>
        </View>
    );
};

export default RouteState;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        height: 10,
    },
    textContainer: {
        height: 40,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    numberContainer: {
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
