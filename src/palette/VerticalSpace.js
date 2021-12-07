import React from 'react';
import {Text, View} from 'react-native';

const VerticalSpace = (props) => {

    const {space} = props;

    return (
        <View style={{paddingVertical: space}}/>
    );
};

export default VerticalSpace;
