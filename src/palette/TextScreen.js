import React from 'react';
import {StyleSheet, View} from 'react-native';
import Label from './Label';

const TextScreen = (props) => {

    const {text, subText, color, colorTextContainer, colorText, icon} = props;

    return (
        <View style={[styles.nameViewContainer, {backgroundColor: color}]}>
            <View style={[styles.textContainer, {backgroundColor: colorTextContainer}]}>
                <View style={{width: '85%'}}>
                    <Label text={text} color={colorText} size={20} weight={'700'}/>
                    {subText && <Label text={subText} color={colorText} size={11} weight={'500'}/>}
                </View>
                <View style={{width: '25%'}}>
                    {subText ? icon : null}
                </View>
            </View>
        </View>
    );
};


export default TextScreen;

const styles = StyleSheet.create({

    nameViewContainer: {
        width: '100%',
        height: 65,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },


    textContainer: {
        width: '91%',
        height: 55,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        paddingLeft: 30,
        paddingRight: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

