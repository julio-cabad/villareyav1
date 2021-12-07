import React from 'react';
import {StyleSheet,View} from 'react-native';
import {Layout} from '../../../styled-components/StyledComponents';
import Label from '../../../palette/Label';
import Divider from '../../../palette/Divider';

const SummaryCards = (props) => {

    const {icon, title, money, footer} = props;

    return (
        <View style={styles.cardsContainer}>
            <Layout row center>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.moneyContainer}>
                    <Label text={title} size={9} color={'#747474'}/>
                    <Label text={money} size={10} color={'#333'} weight={'bold'}/>
                </View>
            </Layout>
            <Divider height={2} top={5}/>
            <Layout center>
                <Label text={footer} size={8} color={'#616161'} top={3}/>
            </Layout>
        </View>
    );
};

export default SummaryCards;

const styles = StyleSheet.create({
    cardsContainer: {
        width: '33%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: '#DDD'
    },

    iconContainer: {
        width: '25%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moneyContainer:{
        width: '75%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }

});
