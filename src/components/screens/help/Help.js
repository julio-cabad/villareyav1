import React, {useContext, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet,View, BackHandler, Linking} from 'react-native';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import HelpCards from './HelpCards';
import VerticalSpace from '../../../palette/VerticalSpace';
import {headPhonesIcon, imgOperator} from '../../../utils/Icons';
import HelpButtons from '../../../palette/HelpButtons';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';

const Help = () => {

    const {dataStore} = useContext(StoreContext);
    const {creditAdvisor, seller} = dataStore;

    const [trigger, setTrigger] = useState(false);

    const scrollRef = useRef(null);

    const route = useRoute();

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return route.name === 'Help';
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [route]),
    );

    useEffect(() => {

        let isMounted = true;

        if (scrollRef) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };

    }, [trigger]);

    const loadInBrowser = () => {
        setTrigger(!trigger);
        Linking.openURL('https://www.ciudadceleste.com')
            .catch(err => console.error('Couldn\'t load page', err));
    };

    return (
        <View style={styles.mainContainer}>
            <Header color={'#FFF'} picBgColor={'#FFF'} textColor={colors.appColor}/>
            <TextScreen text={'AYUDA'} color={'#FFF'} colorTextContainer={colors.secondColor}
                        colorText={'#FFF'}/>
            <ScrollView style={styles.bodyView} ref={scrollRef} contentContainerStyle={{alignItems: 'center'}}>

                {seller && imgOperator}

                {seller &&
                <>
                    <HelpCards title={'VENDEDOR'} body={seller.name}/>
                    <HelpCards title={'TELÉFONO'} body={seller.phone}/>
                    <HelpCards title={'CORREO ELECTRONICO'} body={seller.email}/>
                </>}
                <VerticalSpace space={15}/>

                {creditAdvisor && imgOperator}

                {creditAdvisor &&
                <>
                    <HelpCards title={'ASESOR DE CRÉDITO'} body={creditAdvisor.name}/>
                    <HelpCards title={'TELÉFONO'} body={creditAdvisor.phone}/>
                    <HelpCards title={'CORREO ELECTRÓNICO'} body={creditAdvisor.email}/>
                </>}
                <VerticalSpace space={15}/>

                {/*<HelpButtons icon={chatBoxIcon} text={'CHAT BOT'} width={'67%'} size={16}
                             onPress={() => {
                                 setTrigger(!trigger);
                             }}/>*/}
                <HelpButtons icon={headPhonesIcon} text={'CONTACTENOS'} width={'67%'} top={30} size={16}
                             onPress={loadInBrowser}/>
                <VerticalSpace space={25}/>
            </ScrollView>
        </View>
    );
};


export default observer(Help);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
    },

    bodyView: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 14,
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 5,
    },

    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        borderRadius: 45,
        height: 90,
        borderWidth: 5,
        borderColor: '#4199E5',
    },
});
