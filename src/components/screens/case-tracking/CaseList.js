import React, {useContext, useEffect, useRef} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import {colors} from '../../../utils/Colors';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {
    backIcon,
    backIcon_2, backIcon_3,
    forwardIcon_2, imgBack,
    imgBackMenu,
    imgCaseList,
    imgCaseStatus,
    registerIcon_2,
} from '../../../utils/Icons';
import Label from '../../../palette/Label';
import ListButtons from '../../../palette/ListButtons';
import ActionButton from '../../../palette/ActionButton';

const CaseList = (props) => {

    const {dataStore} = useContext(StoreContext);
    const {caseList} = dataStore;

    const handleDetail = (item) => {
        dataStore.DetailCase(item);
        props.navigation.navigate('DetailCase');
    };

    const renderItem = ({item}) => (
        <>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => handleDetail(item)}>
                <View style={{flexDirection: 'row', width: '85%', alignItems: 'center'}}>
                    <View style={{width: '10%'}}>
                        {imgCaseList}
                    </View>
                    <View style={{marginLeft: 10, width: '90%'}}>
                        <Label text={item.subject} color={colors.appColor} weight={'700'}/>
                        <Label text={item.caseNumber} color={'gray'} size={10}/>
                    </View>
                </View>
                <View style={{width: '15%', alignItems: 'flex-end'}}>
                    {forwardIcon_2}
                </View>
            </TouchableOpacity>
        </>
    );


    const onHandlePress = () => {
        return (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                              onPress={() => props.navigation.navigate('CaseTracking')}>
                {imgBack}
                <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.mainContainer}>
            <Header color={colors.secondColor} picBgColor={colors.secondColor} textColor={'#FFF'}/>
            <TextScreen text={'MI HOGAR'} subText={'Lista de casos registrados'}
                        color={colors.secondColor}
                        colorTextContainer={'#FFF'} colorText={colors.appColor} icon={registerIcon_2}/>
            <View style={{flex: 1, backgroundColor: colors.secondColor}}>
                <View style={styles.summaryContainer}>
                    <FlatList
                        data={caseList}
                        renderItem={renderItem}
                        keyExtractor={item => item.caseNumber}
                        ListFooterComponent={onHandlePress}
                    />
                </View>
            </View>
        </View>
    );
};

export default observer(CaseList);

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

