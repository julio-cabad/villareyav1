import React from 'react';
import {Text} from 'react-native';

const Label = (props) => {

    const {color, size, text, weight, right, left, top}=props

    return (
        <Text
            style={{flexShrink: 1, color: color, fontSize: size, fontWeight: weight, marginRight: right, marginLeft: left,
            marginTop: top}}>
            {text}
        </Text>
    );
};

export default Label;
