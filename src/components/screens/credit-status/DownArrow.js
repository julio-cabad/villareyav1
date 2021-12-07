import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DownArrow = (props) => {

    const {color, left} = props;

    return (
        <View style={[styles.mainContainer, {paddingLeft: left ? 20 : 0, paddingRight: !left ? 20 : 0}]}>
            <View style={[styles.verticalLine, {backgroundColor: color}]}/>
            <Icon name={'double-arrow'} size={15} color={color}
                  style={{transform: [{rotate: '90deg'}]}}/>

        </View>
    );
};

export default DownArrow;

const styles = StyleSheet.create({
    mainContainer: {
        width: 120,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    verticalLine: {
        width: 1,
        height: 25,
    },
});
