import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../utils/Colors';
import Label from './Label';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalMenu from '../components/screens/case-tracking/ModalMenu';
import {registerCaseValues} from '../utils/FormsSchemas';


const ComboBox = (props) => {

    const {
        placeholder, value, field, label, top, textArea, errors, onChangeText,
        width, menu, textHeader, registerCaseValues, setInitialValues, widthMenu,
    } = props;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={[styles.inputContainer, {width: width ? width : '100%', marginTop: top}]}>
            <Label text={label} color={colors.appColor} size={12} weight={'600'} left={5}/>
            <View style={[styles.sectionStyle, {height: textArea ? 60 : 40}]}>
                <TextInput
                    style={{flex: 1, paddingHorizontal: 3, textAlignVertical: 'top', fontSize: 12}}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                   // onChangeText={onChangeText(field)}
                    multiline={!!textArea}
                    color={'#333'}
                    editable={false}
                    placeholderTextColor={'gray'}
                    value={value}
                />

                <View>
                    <Icon name={'menu'}
                          size={25} color={colors.appColor}
                          onPress={() => setModalVisible(true)}/>
                </View>
            </View>
            {(errors !== undefined && registerCaseValues[field] === '') &&
            <Label text={errors} color={'red'} size={7} left={3}/>}
            <ModalMenu modalVisible={modalVisible} setModalVisible={setModalVisible} menu={menu}
                       textHeader={textHeader} registerCaseValues={registerCaseValues}
                       setInitialValues={setInitialValues} field={field} widthMenu={widthMenu}/>
        </View>
    );
};

export default ComboBox;

const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: 'column',
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.secondColor,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: '100%',
    },
});
