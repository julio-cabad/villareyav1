import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Divider = (props) => {

    const {height, top} = props;

    return (
        <View style={[styles.dividerContainer, {height: height, marginTop: top}]}/>
    );
};

export default Divider;

const styles = StyleSheet.create({
    dividerContainer: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        borderRadius: 2,
    },
});
