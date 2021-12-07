import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {
    buildIcon_2,
    imgAccountStatus, imgBackMenu, imgCaseStatus, imgCreditStatus, imgReferral,
} from '../../../utils/Icons';
import {Layout} from '../../../styled-components/StyledComponents';
import ConstructionCarousel from './ConstructionCarousel';
import Charts from './Charts';
import DatesDetails from './DatesDetails';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import ListButtons from '../../../palette/ListButtons';
import VerticalSpace from '../../../palette/VerticalSpace';
import house from '../../../../assets/images/house_init_1.jpeg';
import Label from '../../../palette/Label';

const ConstructionStatus = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {thickWork, equipment, constructionStatus, detailConstructionDates, typeConstruction, images} = dataStore;
    const {fechaInicioOG,} = constructionStatus;

    //No aplica para terreno

    //console.log(typeConstruction, fechaInicioOG)

    const [trigger, setTrigger] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {

        let isMounted = true;

        if (scrollRef && (typeConstruction === 'VILLA' || typeConstruction === 'DEPARTAMENTO')
            && (fechaInicioOG !== '01/01/1753')) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };

    }, [trigger]);

    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'}/>
            <TextScreen text={'MI HOGAR'} subText={'Estado de construcción'} color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={buildIcon_2}/>

            {(typeConstruction === 'VILLA' || typeConstruction === 'DEPARTAMENTO') && (fechaInicioOG !== '01/01/1753') ?
                <ScrollView style={styles.bodyView} ref={scrollRef}>
                    <Layout top={3}>
                        {images && images.length > 0 ? <View style={styles.imageContainer}>
                                <ConstructionCarousel images={images}/>
                            </View> :
                            <View style={styles.imageContainer}>
                                <Image source={house} style={{
                                    width: '100%', height: '100%',
                                    resizeMode: 'stretch', borderRadius: 10,
                                }}/>
                            </View>
                        }
                    </Layout>

                    <View style={styles.summaryContainerChart_1}>
                        <Charts title={'AVANCE DE OBRA GRUESA'} data={thickWork}/>
                        <View style={{paddingVertical: 10}}/>
                    </View>
                    <View style={styles.summaryContainerChart_2}>
                        <Charts title={'AVANCE DE EQUIPAMIENTO'} data={equipment}/>
                    </View>

                    <View style={{backgroundColor: '#FFF'}}>
                        <DatesDetails detailConstructionDates={detailConstructionDates}/>
                        <View style={styles.buttonsContainer}>
                            <ListButtons image={imgAccountStatus} text={'ESTADO DE CUENTA'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('AccountStatus');
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
                    </View>
                </ScrollView> :
                <View style={styles.bodyView}>
                    <View style={[styles.summaryContainer, {marginTop: 15}]}>
                        <View style={styles.notice}>
                            {(typeConstruction === 'TERRENO' && fechaInicioOG !== '01/01/1753') &&
                            <Label text={'No aplica para terreno'} weight={'700'} color={'#795548'}/>}
                            {(typeConstruction !== 'TERRENO' && fechaInicioOG !== '01/01/1753') &&
                            <Label text={'Obra gruesa no iniciada'} weight={'700'} color={'#795548'}/>}
                            {(typeConstruction === 'TERRENO' && fechaInicioOG === '01/01/1753') &&
                            <Label text={'No aplica para terreno'} weight={'700'} color={'#795548'}/>}
                            {((typeConstruction === 'VILLA' || typeConstruction === 'DEPARTAMENTO')
                                && fechaInicioOG === '01/01/1753') &&
                            <Label text={'Obra gruesa no iniciada'} weight={'700'} color={'#795548'}/>}
                        </View>
                        <View style={styles.buttonsContainer}>
                            <ListButtons image={imgAccountStatus} text={'ESTADO DE CUENTA'}
                                         onPress={() => {
                                             setTrigger(!trigger);
                                             props.navigation.navigate('AccountStatus');
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
                    </View>
                </View>}
        </View>
    );
};

export default observer(ConstructionStatus);

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

    summaryContainerChart_1: {
        borderTopRightRadius: 30,
        backgroundColor: '#FFF',
        paddingRight: 15,
        paddingLeft: 5,
        flexDirection: 'column',
        height: 260,
    },

    summaryContainerChart_2: {
        backgroundColor: '#FFF',
        paddingRight: 15,
        paddingLeft: 5,
        flexDirection: 'column',
        height: 260,
    },

    summaryContainer: {
        flex: 1,
        borderTopRightRadius: 30,
        backgroundColor: '#FFF',
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 5,
        //justifyContent: 'space-between',
    },

    buttonsContainer: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 5,
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
