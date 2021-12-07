import React, {useContext} from 'react';
import {StyleSheet,View} from 'react-native';
import {colors} from '../../../utils/Colors';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import HelpCards from '../help/HelpCards';
import {imgOperator} from '../../../utils/Icons';

const AdvisorContact = () => {

    const {dataStore} = useContext(StoreContext);
    const {creditAdvisor} = dataStore;

    return (
        <View style={styles.mainContainer}>
           {/* <View style={styles.avatarContainer}>
                <Image source={avatar} style={{
                    width: 78, height: 78,
                    borderRadius: 39, resizeMode: 'cover',
                }}/>
            </View>*/}

            {creditAdvisor && imgOperator }

            <HelpCards title={'ASESOR DE CRÉDITO'} body={creditAdvisor.name}/>
            <HelpCards title={'TELÉFONO'} body={creditAdvisor.phone}/>

            {/*<View style={styles.headContainer}>
                <Label text={'ASESOR DE CREDITO'} color={'#FFF'} size={8} weight={'700'}/>
                <Label text={'TELÉFONO'} color={'#FFF'} size={10} weight={'700'}/>
            </View>
            <View style={styles.bodyContainer}>
                <Label text={'creditAdvisor.name 898 989898989 89 '} color={'#333'} size={10} weight={'700'}/>
                <Label text={creditAdvisor.phone} color={'#333'} size={10} weight={'700'}/>
            </View>*/}
        </View>
    );
};

export default observer(AdvisorContact);

const styles = StyleSheet.create({

    mainContainer: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        position: 'absolute',
        borderWidth: 6,
        borderColor: colors.appColor,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headContainer: {
        width: '100%',
        height: 25,
        backgroundColor: colors.appColor,
        zIndex: 999,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 30,

    },
    bodyContainer: {
        width: '100%',
        height: 35,
        backgroundColor: '#DDDDDD',
        zIndex: 999,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20,
    },

});
