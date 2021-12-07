import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Layout} from '../styled-components/StyledComponents';
import {colors} from '../utils/Colors';
import Label from './Label';
import EyeIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Edit = (props) => {

    const {
        placeholder, value, onChangeText, field, label, top, textArea, errors, disabled,
        width
    } = props;

    const [password, setPassword] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [autoCapitalize, setAutoCapitalize] = useState('none');

    useEffect(() => {
        let isMounted = true;
        setPassword(field === 'password' || field === 'checkPassword');
        (field === 'password' || field === 'checkPassword') && setSecureTextEntry(true);
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (field === 'email') {
            setAutoCapitalize('none');
        } else {
            setAutoCapitalize('words');
        }

    }, [value]);

    return (
        <View style={[styles.inputContainer, {width: width ? width : '100%', top: top}]}>
            <Label text={label} color={colors.appColor} size={12} weight={'600'} left={5}/>
            <View style={[styles.sectionStyle, {height: textArea ? 60 : 40}]}>
                <TextInput
                    style={{flex: 1, paddingHorizontal: 3,  textAlignVertical: 'top', fontSize: 12}}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    secureTextEntry={secureTextEntry}
                    multiline={!!textArea}
                    color={'#333'}
                    editable={disabled === false ? disabled : true}
                    placeholderTextColor={'gray'}
                    numberOfLines={textArea ? 4 : 1}
                    value={value}
                    onChangeText={onChangeText(field)}
                    autoCapitalize={autoCapitalize}
                />
                {password &&
                <View>
                    <EyeIcon name={secureTextEntry ? 'eye-off' : 'eye-check'}
                             size={25} color={colors.appColor}
                             onPress={() => setSecureTextEntry(!secureTextEntry)}/>
                </View>}
            </View>
            {errors !== undefined && <Label text={errors} color={'red'} size={7} left={3}/>}
        </View>
    );
};

export default Edit;

const styles = StyleSheet.create({

    inputContainer: {
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
