import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const ActionButton = (props) => {

    const {icon, radius, onPress, top, color,} = props;

    return (
        <TouchableOpacity onPress={onPress}
                          style={[styles.actionButtons, {
                              marginTop: top,
                              backgroundColor: color,
                              width: radius * 2,
                              height: radius * 2,
                              borderRadius: radius,
                          }]}>
            {icon}
        </TouchableOpacity>
    );
};

export default ActionButton;

const styles = StyleSheet.create({

    actionButtons: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
