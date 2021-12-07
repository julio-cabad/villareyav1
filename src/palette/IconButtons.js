import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import SettingsIcon from 'react-native-vector-icons/AntDesign';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import HeadphonesIcon from 'react-native-vector-icons/FontAwesome5';
import PowerOffIcon from 'react-native-vector-icons/FontAwesome';

const IconButtons = (props) => {

    const {icon, top, backgroundColor, iconColor, onPress, disabled} = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.iconButtons, {marginTop: top, backgroundColor: backgroundColor}]}>
            {icon === 'setting' && <SettingsIcon name={icon} color={iconColor} size={30}/>}
            {icon === 'home' && <HomeIcon name={icon} color={iconColor} size={30}/>}
            {icon === 'user' && <UserIcon name={icon} color={iconColor} size={30}/>}
            {icon === 'headphones-alt' && <HeadphonesIcon name={icon} color={iconColor} size={30}/>}
            {icon === 'power-off' && <PowerOffIcon name={icon} color={iconColor} size={30}/>}
        </TouchableOpacity>
    );
};

export default IconButtons;

const styles = StyleSheet.create({

    iconButtons: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
