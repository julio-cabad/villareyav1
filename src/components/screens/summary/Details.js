import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Label from '../../../palette/Label';
import Divider from '../../../palette/Divider';
import {colors} from '../../../utils/Colors';

const windowWidth = Dimensions.get('window').width;
const cardsWidth = (windowWidth / 2) - 55;

const Details = (props) => {

    const {title, rowTitle_1, rowRef_1, rowTitle_2, rowRef_2, rowTitle_3, rowRef_3, rowTitle_4, rowRef_4} = props;

    return (
        <View style={styles.listContainer}>
            <View style={styles.titleContainer}>
                <Label text={title} color={'white'} size={12} weight={'bold'}/>
            </View>
            <View style={styles.bodyContainer}>
                <Label text={rowTitle_1} color={colors.secondColor} size={10} weight={'600'}/>
                <Divider height={1} top={0}/>
                <Label text={rowRef_1} color={'#333'} size={10} weight={'700'}/>
                <Label text={rowTitle_2} color={colors.secondColor} size={10} weight={'600'} top={5}/>
                <Divider height={1} top={0}/>
                <Label text={rowRef_2} color={'#333'} size={10} weight={'700'}/>
                <Label text={rowTitle_3} color={colors.secondColor} size={10} weight={'600'} top={5}/>
                <Divider height={1} top={0}/>
                <Label text={rowRef_3} color={'#333'} size={10} weight={'700'}/>
                <Label text={rowTitle_4} color={colors.secondColor} size={10} weight={'600'} top={5}/>
                <Divider height={1} top={0}/>
                <Label text={rowRef_4} color={'#333'} size={10} weight={'700'}/>
            </View>
        </View>
    );
};

export default Details;


const styles = StyleSheet.create({
    listContainer: {
        width: '49%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: colors.secondColor,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyContainer: {
        padding: 5,
    },

});
