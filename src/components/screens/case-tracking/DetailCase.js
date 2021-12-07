import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../palette/Header';
import {colors} from '../../../utils/Colors';
import TextScreen from '../../../palette/TextScreen';
import {imgBack, registerIcon_2} from '../../../utils/Icons';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../../store/Context';
import CaseTrackingInfo from './CaseTrackingInfo';
import Label from '../../../palette/Label';

const DetailCase = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {detailCase} = dataStore;

    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'}/>
            <TextScreen text={'MI HOGAR'} subText={'Detalle del caso'}
                        color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={registerIcon_2}/>
            <View style={{flex: 1, backgroundColor: colors.secondColor}}>
                <View style={styles.summaryContainer}>
                    <CaseTrackingInfo detail={detailCase}/>

                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 45}}
                                      onPress={() => props.navigation.navigate('CaseList')}>
                        {imgBack}
                        <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default observer(DetailCase);

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.appColor,
    },

    summaryContainer: {
        flex: 1,
        borderTopRightRadius: 30,
        backgroundColor: '#FFF',
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 5,
        flexDirection: 'column',
        marginTop: 15,
    },

    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
        borderBottomColor: colors.secondColor,
        borderBottomWidth: 1,
    },
});
