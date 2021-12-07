import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Label from './Label';

const RegisterButtons = (props) => {

  const {text, icon, onPress} = props;

    return (
        <View style={styles.viewContainer}>
          <LinearGradient colors={['#079CD7', '#19B7E9', '#36CFFB']} style={styles.linearGradient}>
            <Icon name={icon} color={'#FFF'} size={30}/>
          </LinearGradient>
          <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Label color={'#FFF'} size={9} weight={'700'} text={text} left={30}/>
          </TouchableOpacity>
        </View>
    );
};

export default RegisterButtons;

const styles = StyleSheet.create({

  viewContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 1000,
  },


  buttonStyle: {
    height: 40,
    borderRadius: 15,
    width: 145,
    backgroundColor: '#5EC4E8',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    marginLeft: 12,
  },
});


