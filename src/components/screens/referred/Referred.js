import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {imgBack, imgReferral_2, registerIcon_2} from '../../../utils/Icons';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import Label from '../../../palette/Label';
import LoadData from '../../../palette/LoadData';
import Divider from '../../../palette/Divider';
import VerticalSpace from '../../../palette/VerticalSpace';

const Referred = (props) => {

    const {dataStore} = useContext(StoreContext);

    const {referred} = dataStore;

    const renderItem = ({item}) => {
        return (
            <View style={styles.listContainer}>
                <View style={{width: '10%'}}>
                    {imgReferral_2}
                </View>
                <View style={{width: '80%', marginLeft: 20}}>
                    <Label text={item.nombre} color={'#333'} size={10} weight={'700'}/>
                    <Label text={item.celular} color={'gray'} size={10}/>
                    <Label text={item.email} color={'gray'} size={10}/>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'}/>
            <TextScreen text={'REFERIDOS'} color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={registerIcon_2}/>
            <View style={{flex: 1, backgroundColor: colors.secondColor}}>
                <View style={styles.summaryContainer}>
                    <TouchableOpacity style={{
                        flexDirection: 'row', alignItems: 'center', marginTop: 5,
                        paddingLeft: 5,
                    }}
                                      onPress={() => props.navigation.navigate('Summary')}>
                        {imgBack}
                        <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                    </TouchableOpacity>
                    <VerticalSpace space={5}/>
                    {referred?.length === 0 &&
                    <View style={styles.notice}>
                        <Label text={'No dispone de referidos'} weight={'700'}
                               color={'#795548'}/>
                    </View>}

                    {referred?.length > 0 &&
                    <FlatList
                        data={referred}
                        renderItem={renderItem}
                        keyExtractor={item => item.idReferido}
                    />
                    }

                    {referred === null && <LoadData/>}

                </View>
            </View>
        </View>
    );
};

export default observer(Referred);

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

    listContainer: {
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
