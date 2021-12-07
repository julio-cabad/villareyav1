import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import IconButtons from '../../palette/IconButtons';
import {SideBarList} from './SideBarList';
import {colors} from '../../utils/Colors';
import LogoSide from '../../../assets/images/logoSideBar.png';
import {updateSessionStatus} from '../../database/Schemas';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../store/Context';
import {Alerts} from '../../palette/Alerts';
import SignOutModal from '../../palette/SignOutModal';

const windowHeight = (Dimensions.get('window').height / 2) - 70;

const SideBar = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {dataUser, creditAdvisor, seller} = dataStore;

    const [selectIcon, setSelectIcon] = useState(null);
    const [newList, setNewList] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const sidebarList = {...SideBarList[0], backgroundColor: '#5F9DFC'};
        let list;
        if (seller || creditAdvisor) {
            list = SideBarList.filter(newList => newList.id !== 1);
        } else {
            const filter = SideBarList.filter(newList => newList.id !== 3);
            list = filter.filter(newList => newList.id !== 1);

        }
        setNewList(list);
        setSelectIcon(sidebarList);
    }, [seller, creditAdvisor]);

    const handleLogout = async () => {
        setLoading(true);
        const update = [0, '001'];
        Alerts('success', 'HASTA PRONTO', `${dataUser.nombres}`);
        dataStore.ResetData();
        await updateSessionStatus(update);
        setLoading(false);
        props.navigation.navigate('Login');
    };

    const onHandleRoutes = async (id, screen) => {

        if (screen === 'Login') {
            setModalVisible(true);
        } else {
            const sidebarList = {...SideBarList[id - 1], backgroundColor: '#5F9DFC'};

            let list;
            if (seller || creditAdvisor) {
                list = SideBarList.filter(newList => newList.id !== id);
            } else {
                const filter = SideBarList.filter(newList => newList.id !== 3);
                list = filter.filter(newList => newList.id !== id);

            }

            // const list = SideBarList.filter(newList => newList.id !== id);
            setNewList(list);
            setSelectIcon(sidebarList);
            props.navigation.navigate(screen);
        }
    };

    return (
        <View style={styles.sideContainer}>
            <View style={{width: 70, alignItems: 'center'}}>
                <IconButtons icon={'setting'} top={30} backgroundColor={'#E5E9F7'} iconColor={'#1E457D'}/>
                <View style={styles.selectIcon}>
                    <View style={styles.roundView}>
                        <IconButtons icon={selectIcon?.icon} backgroundColor={colors.secondColor} iconColor={'white'}/>
                    </View>
                </View>
                {newList?.map(items => {


                    return (
                        <IconButtons icon={items.icon} top={30}
                                     key={items.id} disabled={!dataUser}
                                     backgroundColor={items?.backgroundColor}
                                     onPress={() => onHandleRoutes(items.id, items.screen)}
                                     iconColor={'white'}/>
                    );
                })}
            </View>
            <View style={styles.imageContainer}>
                <View style={{height: 150, width: 70, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={LogoSide} style={styles.image}/>
                </View>
            </View>
            <SignOutModal modalVisible={modalVisible} setModalVisible={setModalVisible}
                          onPress={handleLogout} loading={loading}/>
        </View>
    );
};


export default observer(SideBar);


const styles = StyleSheet.create({
    sideContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        zIndex: 999,
        backgroundColor: colors.appColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    selectIcon: {
        width: 130,
        height: 70,
        backgroundColor: 'transparent',
        marginTop: 31,
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,

    },
    roundView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.appColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        width: '100%',
        height: windowHeight,
        justifyContent: 'center',
        padding: 5,
    },

    image: {
        height: '100%',
        width: 100,
        transform: [{ rotate: '-90deg' }],
        resizeMode: 'contain'
    },
});
