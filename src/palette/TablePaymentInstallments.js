import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {colors} from '../utils/Colors';
import VerticalSpace from './VerticalSpace';
import Label from './Label';

const TablePaymentInstallments = (props) => {

    const {paymentInstallments} = props;

    const [columns] = useState([
        'NUM.',
        'TIPO',
        'FECHA',
        'ESTADO',
        'VALORES PAGADOS',
    ]);

    const tableHeader = () => (
        <View style={styles.tableHeader}>
            <View style={{width: '10%'}}>
                <Label text={'NUM'} color={'white'} size={10} weight={'bold'} left={3}/>
            </View>

            <View style={{width: '25%', alignItems: 'center'}}>
                <Label text={'TIPO'} color={'white'} size={10} weight={'bold'} left={3}/>
            </View>

            <View style={{width: '20%', alignItems: 'center'}}>
                <Label text={'FECHA'} color={'white'} size={10} weight={'bold'} left={3}/>
            </View>

            <View style={{width: '20%', alignItems: 'center'}}>
                <Label text={'ESTADO'} color={'white'} size={10} weight={'bold'} left={3}/>
            </View>

            <View style={{width: '20%', alignItems: 'flex-end'}}>
                <Label text={'VALOR'} color={'white'} size={10} weight={'bold'} left={3}/>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={paymentInstallments}
                style={{width: '100%'}}
                keyExtractor={(item, index) => index + ''}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({item, index}) => {
                    return (

                        <View style={{...styles.tableRow, backgroundColor: index % 2 === 1 ? '#F0FBFC' : 'white'}}>
                            <View style={{width: '10%'}}>
                                <Text style={[styles.columnRowTxt, {fontWeight: '700'}]}>{item.number}</Text>
                            </View>
                            <View style={{width: '27%'}}>
                                <Text style={[styles.columnRowTxt]}>{item.type}</Text>
                            </View>
                            <View style={{width: '20%'}}>
                                <Text style={[styles.columnRowTxt]}>{item.date}</Text>
                            </View>
                            <View style={{width: '20%'}}>
                                <Text style={[styles.columnRowTxt]}>{item.status}</Text>
                            </View>
                            <View style={{width: '23%',}}>
                                <Text style={[styles.columnRowTxt, {fontWeight: '700'}]}>{`$ ${Math.abs(item.value)}`}</Text>
                            </View>
                        </View>
                    );
                }}
            />
            <VerticalSpace space={60}/>
        </View>
    );
};

export default TablePaymentInstallments;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        //borderRadius: 10,

    },
    tableHeader: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.secondColor,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50,
    },

    tableRow: {
        width: '100%',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    columnHeader: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    columnHeaderTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11,
        flexShrink: 1
    },
    columnRowTxt: {
        width: 'auto',
        textAlign: 'center',
        fontSize: 9,
    },
});
