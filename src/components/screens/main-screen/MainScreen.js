import React, {useContext,  useLayoutEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, BackHandler, ScrollView, Animated} from 'react-native';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import Properties from './Properties';
import {colors} from '../../../utils/Colors';
import house from '../../../../assets/images/house.png';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import VerticalSpace from '../../../palette/VerticalSpace';
import {bankingInstitution} from '../../../utils/BankingInstitution';

const MainScreen = () => {

    const {dataStore} = useContext(StoreContext);
    const {houseList, accountStatus} = dataStore;

    const route = useRoute();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {

        let isMounted = true;

        isMounted && Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            },
        ).start();

        return () => {
            isMounted = false;
        };

    }, [fadeAnim]);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return route.name === 'MainScreen';
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [route]),
    );

    return (
        <Animated.View style={[styles.mainContainer, {opacity: fadeAnim}]}>
            <Header color={'white'} picBgColor={'white'} textColor={colors.appColor}/>
            <TextScreen text={'MI HOGAR'} color={'white'} colorTextContainer={colors.secondColor}
                        colorText={'#FFF'}/>
            <ImageBackground source={house} resizeMode="cover" style={{flex: 1}}>
                <ScrollView style={styles.bodyView}>
                    {houseList?.map((items, i) => {

                        const seller = {
                            name: items.ejecutivoCuenta,
                            phone: items.ejecutivoCuentaTelefono,
                            email: items.ejecutivoCuentaCorreo,
                        };

                        const creditAdvisor = {
                            name: items.asesorCredito,
                            phone: items.asesorCreditoTelefono,
                            email: items.asesorCreditoCorreo,
                        };


                        const urbanization = `Urbanización ${items.nombreUrbanizacion}`;
                        const contractCode = items?.codigoContrato;
                        const details = items.descripcion;
                        const houseImg = items.imagen;
                        const contractStatus = items.estado;
                        const bank = items.institucionFinanciera;
                        const typeConstruction = items.tipo;

                        let bankingInstitutionCat;
                        let count = 0;
                        bankingInstitution.forEach(items => {
                            if (bank === items.bank) {
                                count = count + 1;
                                bankingInstitutionCat = items;
                            }
                        });
                        if (count === 0) {
                            bankingInstitutionCat = {cat: null, bank: ''};
                        }

                        return (
                            <Properties key={i} project={'VILLA DEL REY'} urbanization={urbanization}
                                        details={details} contractStatus={contractStatus}
                                        contractCode={contractCode} accountStatus={accountStatus}
                                        dataStore={dataStore} houseImg={houseImg}
                                        creditAdvisor={creditAdvisor} seller={seller}
                                        bankingInstitutionCat={bankingInstitutionCat}
                                        typeConstruction={typeConstruction}/>
                        );
                    })}
                    <VerticalSpace space={20}/>
                </ScrollView>
            </ImageBackground>
        </Animated.View>
    );
};

export default observer(MainScreen);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
    },

    bodyView: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderTopLeftRadius: 14,
        padding: 15,
    },
});
