import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, ActivityIndicator} from 'react-native';
import {Layout} from '../styled-components/StyledComponents';
import {colors} from '../utils/Colors';
import Label from './Label';
import EyeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {searchIcon} from '../utils/Icons';
import ActionButton from './ActionButton';

const EditText = (props) => {

    const {
        icon, placeholder, value, onChangeText, field, label, top, textArea, errors,
        loading, editable, handleGetDataUser,
    } = props;

    const [password, setPassword] = useState(false);
    const [idUser, setIdUser] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [autoCapitalize, setAutoCapitalize] = useState('none');

    useEffect(() => {
        let isMounted = true;
        setPassword(field === 'password' || field === 'checkPassword');
        (field === 'password' || field === 'checkPassword') && setSecureTextEntry(true);
        (field === 'identificacion') && setIdUser(true);
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (field === 'email') {
            setAutoCapitalize('none');
        } else {
            setAutoCapitalize('sentences');
        }

    }, [value]);

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
                        secureTextEntry={secureTextEntry}
                        multiline={!!textArea}
                        color={'#333'}
                        placeholderTextColor={'gray'}
                        numberOfLines={textArea ? 4 : 1}
                        textAlignVertical="top"
                        value={value}
                        editable={editable}
                        onChangeText={onChangeText(field)}
                        autoCapitalize={autoCapitalize}
                    />
                    {password &&
                    <View>
                        <EyeIcon name={secureTextEntry ? 'eye-off' : 'eye-check'}
                                 size={25} color={colors.appColor}
                                 onPress={() => setSecureTextEntry(!secureTextEntry)}/>
                    </View>}
                    {idUser &&
                    <View>
                        {loading ? <ActivityIndicator size="small" color={colors.secondColor}/> :
                            <ActionButton radius={20} icon={searchIcon} onPress={handleGetDataUser}/>}
                    </View>
                    }
                </View>
                {errors !== undefined && <Label text={errors} color={'red'} size={10}/>}
            </View>
        </Layout>
    );
};

export default EditText;

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
