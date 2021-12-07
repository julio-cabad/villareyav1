import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import CreditStatus from './CreditStatus';
import Label from '../../../palette/Label';
import {
    resource_1,
    resource_2,
    resource_3,
    resource_4,
    resource_5,
    resource_6,
    resource_7,
    resource_8, resource_9,
} from '../../../utils/Icons';
import RouteState from './RouteState';
import Arrow from './Arrow';
import DownArrow from './DownArrow';


const CreditPath = (props) => {

    const {creditStep} = props;


    const [number, setNumber] = useState(5);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headContainer}>
                <Label text={'RUTA DE CRÉDITO'} color={'#FFF'} size={14} weight={'700'}/>
            </View>

            <View style={{height: 15}}/>
            <View style={styles.pathsContainer}>
                <View style={styles.bodyContainer}>


                    <View style={styles.statusContainer}>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_1} number={1} color={colors.appColor} left={true}
                                        text={'Elaboración de solicitud BIESS y entrega de documentación'}/>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Arrow color={colors.secondColor} left={false}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_2} number={2} text={'Coordinación de avalúo'}
                                        color={colors.appColor} left={false}/>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                    <DownArrow color={colors.secondColor} left={true}/>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.statusContainer}>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_4} number={4} text={'Cita en notaría'}
                                        color={colors.appColor}/>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Arrow color={colors.secondColor} left={true}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_3} number={3} color={colors.appColor}
                                        text={'Revisión legal estudio jurídico asignado'}/>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                    <DownArrow color={number === 5 ? 'green' : colors.appColor} left={false}/>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.statusContainer}>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_5} number={5} text={'Registro de la propiedad'}
                                        color={number === 5 ? 'green' : colors.appColor}/>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Arrow color={number === 6 ? 'green' : colors.secondColor} left={false}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_3} number={6} color={colors.appColor}
                                        text={'Cierre de escritura'}/>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                    <DownArrow color={colors.secondColor} left={true}/>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.statusContainer}>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_8} number={8} color={colors.appColor}
                                        text={'Firma de las partes'}/>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Arrow color={colors.secondColor} left={true}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_7} number={7} text={'Liquidación gastos legales'}
                                        color={colors.appColor}/>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                    <DownArrow color={number === 9 ? 'green' : colors.appColor} left={false}/>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.statusContainer}>
                        <View style={styles.iconContainer}>
                            <RouteState icon={resource_9} number={9} text={'Desembolso de cuentas'}
                                        color={colors.appColor}/>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
};

export default CreditPath;


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
        marginTop: 30,

    },
    headContainer: {
        backgroundColor: colors.appColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyContainer: {
        width: '100%',
    },

    pathsContainer: {
        width: '100%',
        padding: 10,
    },

    statusContainer: {
        width: '100%',
        flexDirection: 'row',
    },

    iconContainer: {
        width: '40%',
    },

    arrowContainer: {
        width: '20%',
    },

    downArrowContainer: {
        width: '10%',
        backgroundColor: 'red',
        height: 175,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});


