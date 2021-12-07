import React, {useContext} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {cameraIcon, userIcon_2} from '../utils/Icons';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../store/Context';
import {observer} from 'mobx-react-lite';
import {colors} from '../utils/Colors';

const Avatar = (props) => {

    const {myAccount} = props;

    const {dataStore} = useContext(StoreContext);
    const {profilePicture} = dataStore;

    const navigation = useNavigation();

    return (
        <View style={styles.viewContainer}>
            {profilePicture ?
                <Image source={{uri: profilePicture}}
                       style={{width: 64, height: 64, borderRadius: 32, resizeMode: 'cover'}}/> :
                userIcon_2}
            {myAccount && <TouchableOpacity style={styles.buttonStyle}
                                            onPress={() => navigation.navigate('TakePicture')}>
                {cameraIcon}
            </TouchableOpacity>}
        </View>
    );
};

export default observer(Avatar);

const styles = StyleSheet.create({
    viewContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: colors.secondColor,
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    buttonStyle: {
        position: 'absolute',
        top: -15,
       // right: -15,

    },

});
