import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Label from '../../../palette/Label';
import RouteState from './RouteState';
import {
    resource_1, resource_10, resource_11, resource_12, resource_13, resource_14, resource_15, resource_16,
    resource_2,
    resource_3,
    resource_4,
    resource_5,
    resource_6,
    resource_7,
    resource_8, resource_9,
} from '../../../utils/Icons';
import Arrow from './Arrow';
import DownArrow from './DownArrow';

const CreditPathCat2 = (props) => {

    const {creditStep} = props;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headContainer}>
                <Label text={'RUTA DE CRÉDITO'} color={'#FFF'} size={14} weight={'700'}/>
            </View>
            <View style={{height: 15}}/>

            <View style={styles.statusContainer}>
                <View style={styles.iconContainer}>
                    <RouteState icon={resource_1} number={1} color={creditStep === '78' ? 'green' : colors.appColor}
                                left={true}
                                text={'Entrega de documentos del cliente y solicitud'}/>
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
                <DownArrow color={creditStep === '70' ? 'green' : colors.appColor} left={true}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_4} number={4} text={'Aprobación definitiva'}
                                    color={creditStep === '71' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '71' ? 'green' : colors.appColor} left={true}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_3} number={3} color={creditStep === '70' ? 'green' : colors.appColor}
                                    text={'Análisis de crédito'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                <DownArrow color={creditStep === '72' ? 'green' : colors.appColor} left={false}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_5} number={5} text={'Elección cliente'}
                                    color={creditStep === '72' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '73' ? 'green' : colors.appColor} left={false}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_6} number={6}
                                    color={creditStep === '73' ? 'green' : colors.appColor}
                                    text={'Envio doc. legales'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                <DownArrow color={creditStep === '60' ? 'green' : colors.appColor} left={true}/>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_8} number={8} color={creditStep === '63' ? 'green' : colors.appColor}
                                    text={'Cita en Notaria'}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '63' ? 'green' : colors.appColor} left={true}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_7} number={7} text={'Coordinación de avalúo'}
                                    color={creditStep === '60' ? 'green' : colors.appColor}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                <DownArrow color={creditStep === '64' ? 'green' : colors.appColor} left={false}/>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_9} number={9} text={'Firmas de las partes'}
                                    color={creditStep === '64' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '74' ? 'green' : colors.appColor} left={false}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_10} number={10}
                                    color={creditStep === '74' ? 'green' : colors.appColor}
                                    text={'Entrega matriz para liquidación'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                <DownArrow color={creditStep === '66' ? 'green' : colors.appColor} left={true}/>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_12} number={12} text={'Entrega de carta de garantía'}
                                    color={creditStep === '77' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '77' ? 'green' : colors.appColor} left={true}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_11} number={11} color={creditStep === '66' ? 'green' : colors.appColor}
                                    text={'Cierre de escrituras'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-start'}}>
                <DownArrow color={creditStep === '67' ? 'green' : colors.appColor} left={false}/>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_13} number={13} text={'Registro de la propiedad'}
                                    color={creditStep === '67' ? 'green' : colors.appColor}/>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Arrow color={creditStep === '76' ? 'green' : colors.appColor} left={false}/>
                    </View>
                    <View style={styles.iconContainer}>
                        <RouteState icon={resource_14} number={14}
                                    color={creditStep === '76' ? 'green' : colors.appColor}
                                    text={'Entrega de escritura'}/>
                    </View>
                </View>
            </View>
            <View style={{width: '100%', height: 40, alignItems: 'flex-end'}}>
                <DownArrow color={creditStep === '75' ? 'green' : colors.appColor} left={true}/>
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
                        <RouteState icon={resource_15} number={15} color={creditStep === '75' ? 'green' : colors.appColor}
                                    text={'Cita para firmas de documentos para desembolso'}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CreditPathCat2;

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
