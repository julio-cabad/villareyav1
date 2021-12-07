import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Label from '../../../palette/Label';
import Summary from '../summary/Summary';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/Colors';
import {GenerateToken} from '../../../utils/GenerateToken';
import logo from '../../../../assets/images/logo_ca.png';

const Properties = (props) => {

    const {
        project, urbanization, details, contractCode, accountStatus, houseImg, dataStore,
        contractStatus, creditAdvisor, seller, bankingInstitutionCat, typeConstruction,
    } = props;

    const navigation = useNavigation();

    const handleSummary = async (contractCode, houseImg) => {
        const accountStatusDetail = accountStatus.filter(detail => detail.contractCode === contractCode);
        const dataArray = [];
        let newObj;
        accountStatusDetail.forEach((items) => {
            items.price || items.price === '' || items.price === 0 ? newObj = {
                text: 'Precio',
                amount: `$${items.price}`,
            } : null;
            dataArray.push(newObj);
            items.initialFee || items.initialFee === '' || items.initialFee === 0 ? newObj = {
                text: 'Cuota inicial',
                amount: `$${items.initialFee}`,
            } : null;
            dataArray.push(newObj);
            items.entranceFee || items.entranceFee === '' || items.entranceFee === 0 ? newObj = {
                text: 'Cuota de entrada',
                amount: `$${items.entranceFee}`,
            } : null;
            dataArray.push(newObj);
            items.amountFinance || items.amountFinance === '' || items.amountFinance === 0 ? newObj = {
                text: 'Monto a financiar',
                amount: `$${items.amountFinance}`,
            } : null;
            dataArray.push(newObj);
            items.financialInstitution || items.financialInstitution === '' ? newObj = {
                text: 'Institución financiera',
                amount: `${items.financialInstitution}`,
            } : null;
            dataArray.push(newObj);
            items.totalPagado || items.totalPagado === 0 ? newObj = {
                text: 'Total pagado',
                amount: `$${items.totalPagado}`,
            } : null;
            dataArray.push(newObj);
            items.totalVencido || items.totalVencido === 0 ? newObj = {
                text: 'Total vencido (A+B)',
                amount: `$${items.totalVencido}`,
            } : null;
            dataArray.push(newObj);
            items.saldoVencido || items.saldoVencido === 0 ? newObj = {
                text: 'Valor por saldo capital vencido (A)',
                amount: `$${items.saldoVencido}`,
            } : null;
            dataArray.push(newObj);
            items.valorMora || items.valorMora === 0 ? newObj = {
                text: 'Valor por mora vencido (B)',
                amount: `$${items.valorMora}`,
            } : null;
            dataArray.push(newObj);
            items.saldoPorPagar || items.saldoPorPagar === 0 ? newObj = {
                text: 'Saldo por pagar',
                amount: `$${items.saldoPorPagar}`,
            } : null;
            dataArray.push(newObj);
            items.procentajeCobrado || items.procentajeCobrado === 0 ? newObj = {
                text: 'Porcentaje cobrado %',
                amount: `${items.procentajeCobrado}%`,
            } : null;
            dataArray.push(newObj);

        });
        dataStore.ResetCountInstallment(accountStatusDetail);
        dataStore.Summary(accountStatusDetail);
        dataStore.DetailAccountStatus(dataArray);
        dataStore.ContractCode(contractCode);
        dataStore.ContractStatus(contractStatus);
        dataStore.CreditAdvisor(creditAdvisor);
        dataStore.BankingInstitutionCat(bankingInstitutionCat);
        dataStore.Seller(seller);
        dataStore.TypeConstruction(typeConstruction);
        navigation.navigate('Summary');
        const token = await GenerateToken();
        dataStore.HouseImage(houseImg);
        await dataStore.Payments(contractCode, token.access_token);
        await dataStore.PaymentInstallments(contractCode, token.access_token, navigation);
        await dataStore.ConstructionStatus(contractCode, token.access_token);
        await dataStore.CreditStep(contractCode, token.access_token);
        await dataStore.CaseList(contractCode, token.access_token);
    };


    return (
        <TouchableOpacity style={styles.listButtonStyle} onPress={() => handleSummary(contractCode, houseImg)}>
            <View style={[styles.imageContainer, {borderColor: colors.appColor}]}>
                <View style={{backgroundColor: 'while', padding: 4, alignItems: 'center', justifyContent: 'center'}}>
                    {typeConstruction.toUpperCase() === 'TERRENO' ?
                        <Image source={logo} style={{
                            width: '98%', height: '98%',
                            resizeMode: 'contain',
                        }}/> :

                        <Image source={{uri: houseImg}} style={{
                            width: '100%', height: '100%',
                            resizeMode: 'stretch', borderRadius: 10,
                        }}/>}
                </View>
            </View>
            <View style={styles.detailContainers}>
                <View style={styles.descriptionContainers}>
                    <Label text={urbanization} color={'#37474f'} size={9} weight={'700'}/>
                    <Label text={details} color={'#37474f'} size={9} weight={'700'}/>
                </View>
                <View style={styles.statusContainer}>
                    <Label text={project} color={colors.appColor} size={12} weight={'bold'}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Properties;


const styles = StyleSheet.create({

    listButtonStyle: {
        width: '100%',
        height: 'auto',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        borderTopColor: colors.bgSummaryColor,
        backgroundColor: colors.bgSummaryColor,
    },


    imageContainer: {
        width: '40%',
        height: 100,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: '#FFF',
        /*borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,*/
    },
    detailContainers: {
        width: '60%',
        height: 100,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopWidth: 4,
        borderTopColor: colors.bgSummaryColor,
        borderRightWidth: 4,
        borderRightColor: colors.bgSummaryColor,
        borderBottomWidth: 2,
        borderBottomColor: colors.bgSummaryColor,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    descriptionContainers: {
        paddingLeft: 10,
        paddingBottom: 5,
        height: '60%',
        justifyContent: 'center',
        borderLeftWidth: 4,
        borderLeftColor: colors.bgSummaryColor,
    },


    statusContainer: {
        height: '40%',
        backgroundColor: colors.bgSummaryColor,
        justifyContent: 'center',
        paddingLeft: 10,
    },
});


