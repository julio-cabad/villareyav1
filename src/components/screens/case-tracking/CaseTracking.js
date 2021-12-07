import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {
    caseIcon,
    imgAccountStatus, imgBackMenu, imgBuildStatus, imgCaseStatus, imgCreditStatus, imgReferral,
    registerIcon_2,
} from '../../../utils/Icons';
import {Layout} from '../../../styled-components/StyledComponents';
import RegisterCaseForm from './RegisterCaseForm';
import VerticalSpace from '../../../palette/VerticalSpace';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import Label from '../../../palette/Label';
import ListButtons from '../../../palette/ListButtons';

const CaseTracking = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {contractStatus, houseImg, contractCode, caseList, typeConstruction} = dataStore;

    const [trigger, setTrigger] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {

        let isMounted = true;

        if (scrollRef && (typeConstruction === 'VILLA' || typeConstruction === 'DEPARTAMENTO') && (contractStatus === 'ENTREGADO')) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };

    }, [trigger]);

    //console.log(typeConstruction, contractStatus)

    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'}/>
            <TextScreen text={'MI HOGAR'} subText={'Registro de casos y seguimiento post venta'}
                        color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={registerIcon_2}/>
            {((typeConstruction === 'VILLA' || typeConstruction === 'DEPARTAMENTO') && (contractStatus === 'ENTREGADO')) ?
                <ScrollView style={styles.bodyView} ref={scrollRef}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode={'on-drag'}>
                    <Layout top={3}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: houseImg}} style={{
                                width: '100%', height: '100%',
                                resizeMode: 'stretch', borderRadius: 10,
                            }}/>
                        </View>
                    </Layout>

                    <View style={styles.summaryContainer}>
                        {(caseList && caseList.length > 0) &&
                        <Layout row center positionR>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                              onPress={() => props.navigation.navigate('CaseList')}>
                                {caseIcon}
                                <Label text={'Lista de casos'} color={colors.appColor} size={14} weight={'700'}
                                       left={7}/>
                            </TouchableOpacity>
                        </Layout>}

                        {contractStatus === 'ENTREGADO' &&
                        <RegisterCaseForm contractCode={contractCode} scrollRef={scrollRef} dataStore={dataStore}/>}

                        {contractStatus === 'RESERVACION' &&
                        <View style={styles.notice}>
                            <Label text={'El contrato debe estar entregado'} weight={'700'}
                                   color={'#795548'}/>
                        </View>
                        }


                        {contractStatus === 'RESERVACION' &&
                        <VerticalSpace space={7}/>}

                        {contractStatus === 'RESERVACION' &&
                        <Layout>
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
                            <ListButtons image={imgReferral} text={'REFERIDOS'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('Referred');
                                         }}
                            />
                            <VerticalSpace space={7}/>
                            <ListButtons image={imgBackMenu} text={'VOLVER AL MENU'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('Summary');
                                         }}/>
                        </Layout>
                        }
                        <VerticalSpace space={contractStatus === 'RESERVACION' ? 50 : 20}/>
                    </View>

                </ScrollView> :
                <View style={styles.bodyView}>
                    <View style={[styles.summaryContainer, {marginTop: 15}]}>
                        {(contractStatus === 'RESERVACION' && typeConstruction === 'TERRENO') ?
                            <View style={styles.notice}>
                                <Label text={'No aplica para terreno'} weight={'700'} color={'#795548'}/>
                            </View> :
                            <View style={styles.notice}>
                                {(contractStatus === 'RESERVACION') &&
                                <Label text={'El contrato debe estar entregado'} weight={'700'} color={'#795548'}/>}

                                {(typeConstruction === 'TERRENO') &&
                                <Label text={'No aplica para terreno'} weight={'700'} color={'#795548'}/>}
                            </View>
                        }
                        <View style={{paddingVertical: 15}}/>

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
                    </View>
                </View>
            }
        </View>
    );
};

export default observer(CaseTracking);

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
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 5,
        flexDirection: 'column',
    },

    notice: {
        paddingHorizontal: 2,
        width: '100%',
        borderRadius: 5,
        borderColor: '#EF5350',
        height: 50,
        marginTop: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(229,115,115, 0.5)',
    },


});
