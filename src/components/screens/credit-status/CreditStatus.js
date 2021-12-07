import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, ScrollView, StyleSheet,  View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {
    creditIcon_2, imgAccountStatus, imgBackMenu, imgBuildStatus, imgCaseStatus, imgReferral,
} from '../../../utils/Icons';
import {Layout} from '../../../styled-components/StyledComponents';
import AdvisorContact from './AdvisorContact';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import CreditPathCat2 from './CreditPathCat2';
import ListButtons from '../../../palette/ListButtons';
import VerticalSpace from '../../../palette/VerticalSpace';
import CreditPathCat1 from './CreditPathCat1';
import CreditPathCat3 from './CreditPathCat3';
import Label from '../../../palette/Label';

const CreditStatus = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {bankingInstitutionCat, houseImg} = dataStore;
    const {cat} = bankingInstitutionCat;

    const [trigger, setTrigger] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {

        let isMounted = true;

        if (scrollRef && cat) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };
    }, [trigger]);

    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'}/>
            <TextScreen text={'MI HOGAR'} subText={'Estado de crédito hipotecario'} color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={creditIcon_2}/>
            {cat ? <ScrollView style={styles.bodyView} ref={scrollRef}>
                    <Layout top={3}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: houseImg}} style={{
                                width: '100%', height: '100%',
                                resizeMode: 'stretch', borderRadius: 10,
                            }}/>
                        </View>
                    </Layout>
                    <View style={styles.summaryContainer}>
                        <AdvisorContact/>
                        {cat === 1 && <CreditPathCat1 creditStep={'999'}/>}
                        {cat === 2 && <CreditPathCat2 creditStep={'999'}/>}
                        {cat === 3 && <CreditPathCat3 creditStep={'999'}/>}
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
                        <VerticalSpace space={20}/>
                    </View>
                </ScrollView> :
                <View style={styles.bodyView}>
                    <View style={[styles.summaryContainer, {marginTop: 15}]}>
                        <View style={styles.notice}>
                            <Label text={'Su negociación no amerita un proceso de trámite'} weight={'700'}
                                   color={'#795548'}/>
                        </View>
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

export default observer(CreditStatus);

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
        //justifyContent: 'space-between',
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
