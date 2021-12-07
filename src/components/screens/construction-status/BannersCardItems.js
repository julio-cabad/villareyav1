import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../../../utils/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const {width: screenWidth} = Dimensions.get('window');

const BannersCardItems = ({item, index}) => {

    return (

            <FastImage style={styles.image}
                       source={{uri: item.image}}
                       key={index}
                       resizeMode={FastImage.resizeMode.cover}
            />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: ITEM_WIDTH-90,
        height: '100%',
        borderRadius: 10
    },
});

export default BannersCardItems;

