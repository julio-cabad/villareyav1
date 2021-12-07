import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import logo from '../../../../assets/images/logo_w.png';
import {Layout} from '../../../styled-components/StyledComponents';
import {
    checkList_2, collectIcon,
    imgBackMenu, imgBuildStatus, imgCaseStatus, imgCreditStatus, imgReferral, paymentsIcon, pdfIcon,
} from '../../../utils/Icons';
import Label from '../../../palette/Label';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import MainDetailAccountStatus from './MainDetailAccountStatus';
import VerticalSpace from '../../../palette/VerticalSpace';
import ListButtons from '../../../palette/ListButtons';

const AccountStatus = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {client, payments, paymentInstallments, houseImg, typeConstruction} = dataStore;

    const [trigger, setTrigger] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {

        let isMounted = true;

        if (scrollRef.current) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };

    }, [trigger]);

    const handlePayments = () => {
        props.navigation.navigate('Payments');
    };


    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'} client={client}/>
            <TextScreen text={'MI HOGAR'} subText={'Estado de cuenta'} color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={checkList_2}/>

            <View style={styles.bodyView}>

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
                <ScrollView style={styles.bodyView} ref={scrollRef}>

                    <View style={styles.summaryContainer}>
                        <View style={{marginTop: 5, height: 'auto'}}>
                            <Layout center row space top={5}>
                                {payments?.length > 0 ?
                                    <TouchableOpacity
                                        style={{alignItems: 'center', flexDirection: 'row', marginLeft: 5}}
                                        onPress={handlePayments}>
                                        {paymentsIcon}
                                        <Label text={'Pagos'} color={colors.appColor} size={10}
                                               weight={'700'} left={5}/>
                                    </TouchableOpacity> :
                                    null}

                                {paymentInstallments?.length > 0 ?
                                    <TouchableOpacity
                                        style={{alignItems: 'center', flexDirection: 'row', marginRight: 5}}
                                        onPress={() => props.navigation.navigate('PaymentInstallments')}>
                                        {collectIcon}
                                        <View>
                                            <Label text={'Valores por pagar'} color={colors.appColor} size={10}
                                                   weight={'700'}/>
                                        </View>
                                    </TouchableOpacity> : null}
                            </Layout>
                        </View>
                        <MainDetailAccountStatus/>

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

                        <VerticalSpace space={7}/>
                        <ListButtons image={imgBackMenu} text={'VOLVER AL MENU'}
                                     onPress={() => {
                                         setTrigger(!trigger);
                                         props.navigation.navigate('Summary');
                                     }}/>
                        <VerticalSpace space={20}/>
                    </View>
                </ScrollView>

            </View>

        </View>
    );
};

export default observer(AccountStatus);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
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
        // paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 5,
        flexDirection: 'column',
        //justifyContent: 'space-between',
    },
});
