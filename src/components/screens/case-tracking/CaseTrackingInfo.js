import React from 'react';
import {StyleSheet, View} from 'react-native';
import Label from '../../../palette/Label';
import {colors} from '../../../utils/Colors';
import {Layout} from '../../../styled-components/StyledComponents';
import Divider from '../../../palette/Divider';
import VerticalSpace from '../../../palette/VerticalSpace';

const CaseTrackingInfo = (props) => {

    const {detail} = props;
    const {
        subject,
        caseNumber,
        fecha_Aceptacion__c,
        fecha_inicio_trabajo1__c,
        fecha_de_Terminaci_n_de_Trabajos__c,
        fecha_Inspeccion__c,
        fecha_de_creacion__c,
    } = detail;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Label text={'SEGUIMIENTO DEL CASO'} color={'white'} size={12} weight={'bold'} left={5}/>
                <Label text={caseNumber} color={'white'} size={12} weight={'bold'} left={5}/>
            </View>
            <VerticalSpace space={5}/>

            <Layout row center space padding={3}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.dotStyle}/>
                    <Label text={'Fecha de inspección'} left={3} color={'#055782'} size={11}/>
                </View>
                <Label text={fecha_Inspeccion__c ? fecha_Inspeccion__c : 'En espera'} color={'#333'} size={10}
                       weight={'700'}/>
            </Layout>
            <Divider height={1}/>
            <Layout row center space padding={3}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.dotStyle}/>
                    <Label text={'Fecha de aceptación'} left={3} color={'#055782'} size={11}/>
                </View>
                <Label text={fecha_Aceptacion__c ? fecha_Aceptacion__c : 'En espera'} color={'#333'} size={10}
                       weight={'700'}/>
            </Layout>
            <Divider height={1}/>
            <Layout row center space padding={3}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.dotStyle}/>
                    <Label text={'Fecha inicio trabajo'} left={3} color={'#055782'} size={11}/>
                </View>
                <Label text={fecha_inicio_trabajo1__c ? fecha_inicio_trabajo1__c : 'En espera'} color={'#333'} size={10}
                       weight={'700'}/>
            </Layout>
            <Divider height={1}/>
            <Layout row center space padding={3}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.dotStyle}/>
                    <Label text={'Fecha terminación de trabajo'} left={3} color={'#055782'} size={11}/>
                </View>
                <Label text={fecha_de_Terminaci_n_de_Trabajos__c ? fecha_de_Terminaci_n_de_Trabajos__c : 'En espera'}
                       color={'#333'} size={10}
                       weight={'700'}/>
            </Layout>
            <Divider height={1}/>

            <Layout top={10}>
                <Label text={'Asunto'} left={3} color={'#055782'} size={11}/>
                <Label text={subject} left={3} color={'#333'} size={11} top={3}/>
            </Layout>

            <Layout top={20}>
                <Label text={'Creado el'} left={3} color={'#055782'} size={11}/>
                <Label text={fecha_de_creacion__c} left={3} color={'#333'} size={11} top={3} weight={'700'}/>
            </Layout>
        </View>
    );
};

export default CaseTrackingInfo;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 'auto',
        marginTop: 15,
    },
    titleContainer: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: colors.appColor,
        padding: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    dotStyle: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: colors.appColor,
    },
});
