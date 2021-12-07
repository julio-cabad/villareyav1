import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Label from './Label';
import Avatar from './Avatar';
import {colors} from '../utils/Colors';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../store/Context';

const Header = (props) => {

    const {color, picBgColor, textColor,myAccount} = props;

    const {dataStore} = useContext(StoreContext);
    const {client} = dataStore;

    const [textLoading, setTexLoading] = useState('Cargando datos...');

    useEffect(() => {

        let isMounted = true;

        isMounted && setTimeout(() => setTexLoading('Espere un momento'), 10000);

        return () => {
            isMounted = false;
        };
    }, []);


    return (
        <View style={styles.headContainer}>
            <View style={[styles.nameViewContainer, {backgroundColor: color}]}>
                <Label text={client ? client : textLoading} color={textColor} size={14} weight={'bold'}
                       top={10}/>
            </View>
            <View style={[styles.pictureContainer, {backgroundColor: picBgColor}]}>
                <View style={styles.pictureFontContainer}>
                    <Avatar myAccount={myAccount}/>
                </View>
            </View>
        </View>
    );
};

export default observer(Header);

const styles = StyleSheet.create({
    headContainer: {
        width: '100%',
        height: 113,
        backgroundColor: colors.appColor,
        flexDirection: 'row',
    },

    nameViewContainer: {
        backgroundColor: 'white',
        width: '65%',
        height: 113,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        padding: 20,
    },
    pictureContainer: {
        width: '35%',
        height: 113,
        backgroundColor: 'white',
    },

    pictureFontContainer: {
        width: '100%',
        height: 113,
        backgroundColor: colors.appColor,
        borderBottomLeftRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
