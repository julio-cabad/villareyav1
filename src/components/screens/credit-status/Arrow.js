import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Arrow = (props) => {

    const {color, left} = props;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.arrowContainer}>
                {left && <Icon name={'double-arrow'} size={15} color={color}
                style={{transform: [{ rotate: '180deg' }]}}/>}
                <View style={[styles.line, {backgroundColor: color}]}/>
                {!left && <Icon name={'double-arrow'} size={15} color={color}/>}
            </View>
        </View>
    );
};

export default Arrow;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 5,
    },

    arrowContainer: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },


    line: {
        height: 1,
        width: '100%',
    },
});

