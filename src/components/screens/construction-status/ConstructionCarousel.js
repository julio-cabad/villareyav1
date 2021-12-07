import React, {Component, createRef, memo, useCallback, useRef, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    LayoutAnimation,
    Platform, SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    UIManager,
    View,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import FastImage from 'react-native-fast-image';
import Label from '../../../palette/Label';
import house_init_1 from '../../../../assets/images/house_init_1.jpeg';
import house_init_2 from '../../../../assets/images/house_init_2.jpeg';
import house_init_3 from '../../../../assets/images/house_init_3.jpeg';
import house_init_4 from '../../../../assets/images/house_init_4.jpeg';
import Animated from 'react-native-reanimated';
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';
import BannersCardItems, {SLIDER_WIDTH, ITEM_WIDTH} from './BannersCardItems';
import {Layout} from '../../../styled-components/StyledComponents';

const data = [
    {
        id: '1',
        image: house_init_1,
    },
    {
        id: '2',
        image: house_init_2,
    },
    {
        id: '3',
        image: house_init_3,
    },
    {
        id: '4',
        image: house_init_4,
    },
    /* {
         id: '5',
         image: null,
     },*/
];

const {width: windowWidth} = Dimensions.get('window');

import { scrollInterpolator, animatedStyles } from './Animations';

const Slide = memo(function Slide({data, imageContainer}) {

    return (
        <View style={[styles.slide, {width: imageContainer}]}>
            <FastImage style={[styles.slideImage, {width: imageContainer}]}
                       source={data.image}
                       resizeMode={FastImage.resizeMode.cover}
            />
        </View>
    );
});

function Pagination_2({index, data}) {
    return (
        <View style={styles.pagination} pointerEvents="none">
            {data.map((_, i) => {
                return (
                    <View
                        key={i}
                        style={[
                            styles.paginationDot,
                            index === i
                                ? styles.paginationDotActive
                                : styles.paginationDotInactive,
                        ]}
                    >
                        <Label text={i + 1} color={index === i ? 'white' : colors.appColor}
                               size={index === i ? 14 : 12} weight={index === i ? '800' : '600'}/>
                    </View>
                );
            })}
        </View>
    );
}

export default function App(props) {

   const {images} = props;

    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

    function stackScrollInterpolator(index, carouselProps) {
        const range = [1, 0, -1, -2, -3];
        const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
        const outputRange = range;
        return {inputRange, outputRange};
    }

    function stackAnimatedStyles(index, animatedValue, carouselProps) {
        const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
        const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

        const cardOffset = 18;
        const card1Scale = 0.9;
        const card2Scale = 0.8;

        const getTranslateFromScale = (index, scale) => {
            const centerFactor = 1 / scale * index;
            const centeredPosition = -Math.round(sizeRef * centerFactor);
            const edgeAlignment = Math.round((sizeRef - (sizeRef * scale)) / 2);
            const offset = Math.round(cardOffset * Math.abs(index) / scale);

            return centeredPosition - edgeAlignment - offset;
        };

        return {
            opacity: animatedValue.interpolate({
                inputRange: [-3, -2, -1, 0],
                outputRange: [0, 0.5, 0.75, 1],
                extrapolate: 'clamp',
            }),
            transform: [{
                scale: animatedValue.interpolate({
                    inputRange: [-2, -1, 0, 1],
                    outputRange: [card2Scale, card1Scale, 1, card1Scale],
                    extrapolate: 'clamp',
                }),
            }, {
                [translateProp]: animatedValue.interpolate({
                    inputRange: [-3, -2, -1, 0, 1],
                    outputRange: [
                        getTranslateFromScale(-3, card2Scale),
                        getTranslateFromScale(-2, card2Scale),
                        getTranslateFromScale(-1, card1Scale),
                        0,
                        sizeRef * 0.5,
                    ],
                    extrapolate: 'clamp',
                }),
            }],
        };
    }

    return (
        <View>
            <Carousel
               layout="tinder"
                layoutCardOffset={1}
                ref={isCarousel}
                data={images}
                renderItem={BannersCardItems}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
                loop={true}
                loopClonesPerSide={images.length}

              /* scrollInterpolator={scrollInterpolator}
               slideInterpolatedStyle={animatedStyles}*/
                apparitionDelay={100}
            />
            <Layout center row>
                <Pagination_2 index={index} data={images}/>
            </Layout>

        </View>
    );
}

const styles = StyleSheet.create({
    pagination: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
    },


    paginationDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDotActive: {backgroundColor: '#10AAE0'},
    paginationDotInactive: {backgroundColor: '#E3E7EA'},
});


