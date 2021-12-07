import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Layout} from '../../../styled-components/StyledComponents';
import Divider from '../../../palette/Divider';
import {colors} from '../../../utils/Colors';
import Label from '../../../palette/Label';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';

const MainDetailAccountStatus = () => {

    const {dataStore} = useContext(StoreContext);
    const {detailAccountStatus} = dataStore;

    return (
        <View style={styles.detailContainer}>

            {detailAccountStatus.map((items, i) => {
                return (
                    <View key={i}>
                        <Layout row center space padding={3}>
                            <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
                                <View style={styles.dotStyle}/>
                                <Label text={items.text} left={3} color={'#055782'} size={9}/>
                            </View>
                            <View style={{width: '30%', alignItems: 'flex-end'}}>
                                <Label text={items.amount} color={'#333'} size={9} weight={'700'}/>
                            </View>
                        </Layout>
                        <Divider height={1}/>
                    </View>
                );
            })}
        </View>
    );
};

export default observer(MainDetailAccountStatus);

const styles = StyleSheet.create({

    detailContainer: {
        paddingTop: 15,
        paddingHorizontal: 20,
    },

    dotStyle: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: colors.appColor,
    },
});
