import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import Label from '../../../palette/Label';

const HelpCards = (props) => {

    const {title, body} = props;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.titleContainer}>
                <Label text={title} color={'white'} size={12} weight={'bold'}/>
            </View>
            <View style={styles.bodyContainer}>
                <Label text={body} color={'#333'} size={14} weight={'600'}/>
            </View>
        </View>
    );
};

export default HelpCards;


const styles = StyleSheet.create({
    cardContainer: {
        width: '70%',
        height: 'auto',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#DDDDDD',
    },

    bodyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 5
    },

    titleContainer: {
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: colors.secondColor,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
