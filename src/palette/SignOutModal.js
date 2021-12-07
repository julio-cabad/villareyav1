import React from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Label from './Label';
import {colors} from '../utils/Colors';
import {closeIcon, logoutIcon} from '../utils/Icons';

const windowWidth = Dimensions.get('window').width;

const SignOutModal = (props) => {

    const {modalVisible, setModalVisible, onPress, loading, } = props;

    const handleCancel = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            statusBarTranslucent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Label text={'CERRAR SESIÓN'} color={colors.appColor} size={14}/>
                    <Label text={'Desea salir de la aplicación ?'} color={'#333'}
                           size={14} top={15}/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={handleCancel}
                        >
                            {closeIcon}
                            <Label text={'Cancelar'} color={'gray'} weight={'700'} left={7}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.buttonStyle, {backgroundColor: colors.secondColor, width: '50%'}]}
                            onPress={onPress}
                        >
                            {loading ? <ActivityIndicator size="small" color="#fff"/> : logoutIcon}
                            <Label text={'Salir'} color={'white'} weight={'700'} left={7}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SignOutModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: windowWidth - 80,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },

    buttonStyle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },

});
