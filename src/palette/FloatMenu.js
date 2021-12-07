import React, {useState} from 'react';
import {Text, TouchableWithoutFeedback, View, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatMenu = (props) => {

    const {buttons} = props;

    const [state, setState] = useState({animation: new Animated.Value(0)});
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        const toValue = open ? 0 : 1;

        Animated.timing(state.animation, {
            toValue,
            duration: 200,
            useNativeDriver: true,
        }).start();

        setOpen(!open);
    };

    const reloadInterpolate = state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -70],
    });

    const orderInterpolate = state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -140],
    });

    const reloadStyle = {
        transform: [
            {
                scale: state.animation,
            },
            {
                translateY: reloadInterpolate,
            },
        ],
    };

    const orderStyle = {
        transform: [
            {
                scale: state.animation,
            },
            {
                translateY: orderInterpolate,
            },
        ],
    };

    const labelPositionInterpolate = state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-30, -90],
    });

    const opacityInterpolate = state.animation.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [0, 0, 1],
    });

    const labelStyle = {
        opacity: opacityInterpolate,
        transform: [
            {
                translateX: labelPositionInterpolate,
            },
        ],
    };

    const scaleInterpolate = state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
    });

    const bgStyle = {
        transform: [
            {
                scale: scaleInterpolate,
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.background, bgStyle]}/>



            <TouchableWithoutFeedback>
                <Animated.View style={[styles.button, styles.other, orderStyle]}>
                    <Animated.Text style={[styles.label, labelStyle]}>Order</Animated.Text>
                    <Icon name="food-fork-drink" size={20} color="#555"/>
                </Animated.View>
            </TouchableWithoutFeedback>
         <TouchableWithoutFeedback>
                <Animated.View style={[styles.button, styles.other, reloadStyle]}>
                    <Animated.Text style={[styles.label, labelStyle]}>Reload</Animated.Text>
                    <Icon name="reload" size={20} color="#555"/>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={toggleOpen}>
                <View style={[styles.button, styles.pay]}>
                    <Animated.Text style={[styles.label, labelStyle]}>Pay</Animated.Text>
                    <Text style={styles.payText}>$5.00</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default FloatMenu;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },

    label: {
        color: '#333',
        position: 'absolute',
        fontSize: 10,
        backgroundColor: 'transparent',
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#333',
        shadowOpacity: 0.1,
        shadowOffset: {x: 2, y: 0},
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    payText: {
        color: '#FFF',
    },
    pay: {
        backgroundColor: '#00B15E',
    },

    other: {
        backgroundColor: '#FFF',
    },
});
