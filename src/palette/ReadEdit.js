import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../utils/Colors';
import Label from './Label';
import EyeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from './ActionButton';
import {searchIcon} from '../utils/Icons';
import {Layout} from '../styled-components/StyledComponents';

const ReadEdit = (props) => {

    const {
        icon, placeholder, value, label, top, textArea, editable,
    } = props;

    console.log(value)



    return (
        <Layout row center padding={5} top={top}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <View style={styles.inputContainer}>
                <Label text={label} color={colors.appColor} size={12} weight={'600'} left={5}/>
                <View style={[styles.sectionStyle, {height: textArea ? 60 : 40}]}>
                    <TextInput
                        style={{flex: 1, paddingHorizontal: 3}}
                        placeholder={placeholder}
                        underlineColorAndroid="transparent"
                        multiline={!!textArea}
                        color={'#333'}
                        placeholderTextColor={'gray'}
                        numberOfLines={textArea ? 4 : 1}
                        textAlignVertical="top"
                        value={value}
                        editable={false}
                    />
                </View>
            </View>
        </Layout>
    );
};

export default ReadEdit;


const styles = StyleSheet.create({
    iconContainer: {
        width: '10%',
        height: '100%',
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'column',
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.secondColor,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: '100%',
    },

});
