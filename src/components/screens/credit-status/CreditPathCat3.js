import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Label from '../../../palette/Label';
import RouteState from './RouteState';
import {
    resource_1, resource_10, resource_11, resource_13, resource_15, resource_16, resource_17, resource_18,
    resource_2,
    resource_3,
    resource_4,
    resource_5,
    resource_5_1,
    resource_6, resource_8, resource_9,
} from '../../../utils/Icons';
import Arrow from './Arrow';
import DownArrow from './DownArrow';

const CreditPathCat3 = (props) => {

    const {creditStep} = props;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headContainer}>
                <Label text={'RUTA DE CRÉDITO'} color={'#FFF'} size={14} weight={'700'}/>
            </View>
            <View style={{height: 15}}/>

            <View style={styles.statusContainer}>
                <View style={styles.iconContainer}>
                    <RouteState icon={resource_1} number={1} color={creditStep === '58' ? 'green' : colors.appColor}
                                left={true}
                                text={'Elaboración solicitud BIESS y entrega de documentación'}/>
                </View>
                <View style={styles.arrowContainer}>
                    <Arrow color={creditStep === '59' ? 'green' : colors.appColor} left={false}/>
                </View>
                <View style={styles.iconContainer}>
                    <RouteState icon={resource_2} number={2} text={'Revisión y envío de documentos'}
                                color={creditStep === '59' ? 'green' : colors.appColor} left={false}/>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                <DownArrow color={creditStep === '60' ? 'green' : colors.appColor} left={true}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_4} number={4} text={'Aprobación definitiva BIEES'}
                                    color={creditStep === '61' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '61' ? 'green' : colors.appColor} left={true}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_3} number={3} color={creditStep === '60' ? 'green' : colors.appColor}
                                    text={'Análisis de crédito'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                <DownArrow color={creditStep === '62' ? 'green' : colors.appColor} left={false}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>

                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_5_1} number={5} text={'Revisión legal estudio jurídico asignado'}
                                    color={creditStep === '62' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '63' ? 'green' : colors.appColor} left={false}/>
                    </View>

                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_8} number={6}
                                    color={creditStep === '63' ? 'green' : colors.appColor}
                                    text={'Cita en Notaria'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                <DownArrow color={creditStep === '64' ? 'green' : colors.appColor} left={true}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_17} number={8} text={'Liquidación gastos legales'}
                                    color={creditStep === '65' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '65' ? 'green' : colors.appColor} left={true}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_9} number={7} color={creditStep === '64' ? 'green' : colors.appColor}
                                    text={'Firmas de las partes'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                <DownArrow color={creditStep === '66' ? 'green' : colors.appColor} left={false}/>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_11} number={9} text={'Cierre de Escrituras'}
                                    color={creditStep === '66' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '67' ? 'green' : colors.appColor} left={false}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_13} number={10}
                                    color={creditStep === '67' ? 'green' : colors.appColor}
                                    text={'Registro de la propiedad'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                <DownArrow color={creditStep === '68' ? 'green' : colors.appColor} left={true}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_16} number={16} text={'Desembolso en cuentas'}
                                    color={creditStep === '69' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '69' ? 'green' : colors.appColor} left={true}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_18} number={15} color={creditStep === '68' ? 'green' : colors.appColor}
                                    text={'Revisión y entrega al BIESS'}/>
                    </View>
                </View>
            </View>


        </View>
    );
};

export default CreditPathCat3;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        //height: 800,
        backgroundColor: '#FFF',
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
        //padding: 10,
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
