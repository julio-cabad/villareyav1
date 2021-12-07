import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Animated, View, Dimensions, StyleSheet} from 'react-native';
import banner_1 from '../../../assets/images/banner_1.png';
import banner_2 from '../../../assets/images/banner_2.png';
import Label from '../../palette/Label';
import {colors} from '../../utils/Colors';
//import axios from "axios";
//import {GenerateToken} from "../../utils/GenerateToken";

const data = [
    {
        id: '1',
        image: banner_1,
    },
    {
        id: '2',
        image: banner_2,
    },
];

function useInterval(callback, delay) {

    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

const {width: windowWidth} = Dimensions.get('window');

const ImageLoader = (props) => {

    const [state] = useState({
        opacity: new Animated.Value(1),
    });

    const onLoad = () => {
        Animated.timing(state.opacity, {
            toValue: 20,
            duration: 3500,
            useNativeDriver: true,
        }).start();
    };
    return (
        <Animated.Image
            onLoad={onLoad}
            {...props}
            style={[
                {
                    opacity: state.opacity,
                    transform: [
                        {
                            scale: state.opacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.99, 1],
                            }),
                        },
                    ],
                },
                props.style,
            ]}
        />
    );
};


const Slide = memo(function Slide({data}) {
    return (
        <View style={styles.slide}>
            <ImageLoader source={data.image} style={styles.slideImage}/>
        </View>
    );
});

function Pagination({index}) {
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

//const url = 'https://api.ciudadceleste.com/APIImagen/banners/'

export default function Carousel() {

    const [counter, setCounter] = useState(0);

    const indexRef = useRef(counter);
    const flatListRef = useRef(null);

    indexRef.current = counter;

    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setCounter(roundIndex);
        }
    }, []);

    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 2,
        keyExtractor: useCallback(s => String(s.id), []),
        getItemLayout: useCallback(
            (_, index) => ({
                index,
                length: windowWidth,
                offset: index * windowWidth,
            }),
            [],
        ),
    };

    const renderItem = useCallback(function renderItem({item}) {
        return <Slide data={item}/>;
    }, []);

    /*useEffect(() => {
       const GetBanners = async ()=>{
             try {
                 const token =GenerateToken()
                 const headers = {'Authorization': `Bearer ${token}`};
                 const res = await axios.get(url, {headers: headers})
                 console.log(res.data)
             }catch (e) {
                 console.log(e)
             }
         }
         GetBanners().catch(()=>{})
    }, [])*/

    useInterval(() => {
        const arr = [data[counter]]
        if (counter === Object.entries(arr).length) {
            setCounter(0);
            flatListRef.current.scrollToIndex({animated: true, index: 0});
        } else {
            setCounter(counter + 1);
            flatListRef.current.scrollToIndex({animated: true, index: counter});
        }
    }, 7000);

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={[data[counter]]}
                style={styles.carousel}
                renderItem={renderItem}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={onScroll}
                getItemLayout={(data, index) => ({
                    length: 50,
                    offset: 50 * index,
                    index,
                })}
                {...flatListOptimizationProps}
            />
            <Pagination index={counter}/>
        </>
    );
}


const styles = StyleSheet.create({
    slide: {
        width: windowWidth,
        backgroundColor: colors.appColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    slideImage: {width: windowWidth, height: '100%', resizeMode: 'cover'},

    pagination: {
        position: 'absolute',
        bottom: 8,
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
    paginationDotActive: {backgroundColor: colors.appColor},
    paginationDotInactive: {backgroundColor: '#E3E7EA'},
    carousel: {flex: 1},
});





