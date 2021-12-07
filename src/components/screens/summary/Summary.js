import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, ScrollView, BackHandler, TouchableOpacity} from 'react-native';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {Layout} from '../../../styled-components/StyledComponents';
import SummaryCards from './SummaryCards';
import Details from './Details';
import {colors} from '../../../utils/Colors';
import {
    calendarIcon,
    coinsIcon,
    imgAccountStatus, imgBack, imgBuildStatus, imgCaseStatus, imgCreditStatus, imgReferral,
    moneyIcon,
} from '../../../utils/Icons';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import LoadData from '../../../palette/LoadData';
import ListButtons from '../../../palette/ListButtons';
import VerticalSpace from '../../../palette/VerticalSpace';
import logo from "../../../../assets/images/logo_w.png";
import Label from "../../../palette/Label";

const Summary = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {
        summary,
        client,
        houseImg,
        countInstallment,
        nextInstallment,
        lastPaymentDate,
        nextInstallmentDate,
        typeConstruction
    } = dataStore;

    const [trigger, setTrigger] = useState(false);

    const scrollRef = useRef(null);

    function handleBackButtonClick() {
        props.navigation.navigate('MainScreen');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    useEffect(() => {

        let isMounted = true;
        if (scrollRef.current) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };

    }, [trigger]);

    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'} client={client}/>
            <TextScreen text={'MI HOGAR'} color={colors.secondColor} colorTextContainer={'#FFF'}
                        colorText={colors.appColor}/>
            {countInstallment !== null ?
                <ScrollView style={styles.bodyView} ref={scrollRef}>
                    <Layout top={3}>
                        <View style={[styles.imageContainer, {alignItems: 'center', justifyContent: 'center'}]}>
                            {typeConstruction === 'TERRENO' ?
                                <Image source={logo} style={{
                                    width: '80%', height: '85%', marginBottom: 10,
                                    resizeMode: 'stretch',
                                }}/>:

                                <Image source={{uri: houseImg}} style={{
                                    width: '100%', height: '100%',
                                    resizeMode: 'stretch', borderRadius: 10,
                                }}/>}
                        </View>
                    </Layout>
                    <View style={styles.summaryContainer}>
                        <View style={{marginTop: 10, height: 'auto'}}>
                            <Layout center row space>
                                <SummaryCards icon={coinsIcon} title={'Pagado'} money={`$${summary[0].totalPagado}`}
                                              footer={lastPaymentDate !== '' ? `Ultimo ${lastPaymentDate}` : 'Sin fecha'}/>
                                <SummaryCards icon={moneyIcon} title={'Saldo Total'}
                                              money={`$${summary[0].saldoPorPagar}`}
                                              footer={`${countInstallment} cuotas restantes`}/>
                                <SummaryCards icon={calendarIcon} title={'Proxima cuota'} money={nextInstallment}
                                              footer={nextInstallmentDate}/>
                            </Layout>
                            <Layout center row space>
                                <Details title={'CONTRATO'}
                                         rowTitle_1={'Cliente'} rowRef_1={client}
                                         rowTitle_2={'Contrato'} rowRef_2={summary[0].contractCode}
                                         rowTitle_3={'Fecha de contrato'} rowRef_3={summary[0].contractDate}
                                         rowTitle_4={'Ejecutivo de cuenta'} rowRef_4={summary[0].accountExecutive}
                                />

                                <Details title={'PROYECTO'}
                                         rowTitle_1={'Nombre'} rowRef_1={summary[0].urbanizationName}
                                         rowTitle_2={'Modelo'} rowRef_2={summary[0].model}
                                         rowTitle_3={'Tipo'} rowRef_3={summary[0].type}
                                         rowTitle_4={'Plantas'} rowRef_4={summary[0].levels}
                                />
                            </Layout>
                        </View>
                        <Layout top={15}>
                            <ListButtons image={imgAccountStatus} text={'ESTADO DE CUENTA'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('AccountStatus');
                                         }}/>
                            <VerticalSpace space={7}/>
                            <ListButtons image={imgBuildStatus} text={'ESTADO DE CONSTRUCCION'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('ConstructionStatus');
                                         }}/>
                            <VerticalSpace space={7}/>
                            <ListButtons image={imgCreditStatus} text={'ESTADO DE CREDITO HIPOTECARIO'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('CreditStatus');
                                         }}/>
                            <VerticalSpace space={7}/>
                            <ListButtons image={imgCaseStatus} text={'REGISTRO Y SEGUIMIENTO DE CASOS POSVENTA'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('CaseTracking');
                                         }}/>
                            <VerticalSpace space={7}/>
                            <ListButtons image={imgReferral} text={'REFERIDOS'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('Referred');
                                         }}/>
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center', marginTop: 15,
                                paddingLeft: 1
                            }}
                                              onPress={() => props.navigation.navigate('MainScreen')}>
                                {imgBack}
                                <Label text={'MI HOGAR'} color={colors.appColor} weight={'700'} left={10}/>
                            </TouchableOpacity>
                            <VerticalSpace space={20}/>
                        </Layout>
                    </View>
                </ScrollView> : <LoadData/>}
        </View>
    );
};

export default observer(Summary);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
        position: 'relative',
    },

    bodyView: {
        flex: 1,
        backgroundColor: colors.secondColor,
        borderTopLeftRadius: 14,
    },

    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: colors.secondColor,
        borderRadius: 10,
        paddingRight: 15,
        paddingLeft: 5,
        paddingBottom: 12,
    },

    summaryContainer: {
        flex: 1,
        borderTopRightRadius: 30,
        backgroundColor: '#FFF',
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 5,
        flexDirection: 'column',
        //justifyContent: 'space-between',
    },

    buttonsContainer: {
        paddingBottom: 15,
        width: '100%',
    },


    listContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,

    },

});
