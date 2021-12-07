import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {colors} from '../utils/Colors';
import VerticalSpace from './VerticalSpace';


export default function DataTable(props) {

    const {payments} = props;

    const [columns] = useState([
        'NUM.',
        'RECIBO',
        'FECHA',
        'FORMA DE PAGO',
        'VALOR',
    ]);


    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeader}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>
                                    {column + ' '}
                                </Text>
                            </TouchableOpacity>
                        );
                    }
                })
            }
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={payments}
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
                            <View style={{width: '20%'}}>
                                <Text style={[styles.columnRowTxt]}>{item.document}</Text>
                            </View>
                            <View style={{width: '20%'}}>
                                <Text style={[styles.columnRowTxt]}>{item.date}</Text>
                            </View>
                            <View style={{width: '30%'}}>
                                <Text style={[styles.columnRowTxt]}>{item.wayPay}</Text>
                            </View>
                            <View style={{width: '20%',}}>
                                <Text style={[styles.columnRowTxt, {fontWeight: '700'}]}>{`$ ${Math.abs(item.value)}`}</Text>
                            </View>
                        </View>
                    );
                }}
            />
            <VerticalSpace space={60}/>
        </View>
    );
}

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
        justifyContent: 'space-between',
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
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    columnHeaderTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11,
    },
    columnRowTxt: {
        width: 'auto',
        textAlign: 'center',
        fontSize: 9,
    },
});
