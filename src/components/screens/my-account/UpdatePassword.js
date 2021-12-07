import React, {useContext, useRef, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet, TouchableOpacity, View, Keyboard} from 'react-native';
import Header from '../../../palette/Header';
import {colors} from '../../../utils/Colors';
import TextScreen from '../../../palette/TextScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
    updatePasswordSchema,
    updatePasswordValues,
} from '../../../utils/FormsSchemas';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Edit from '../../../palette/Edit';
import VerticalSpace from '../../../palette/VerticalSpace';
import {Layout} from '../../../styled-components/StyledComponents';
import Label from '../../../palette/Label';
import {imgBack, pwdIcon_2} from '../../../utils/Icons';
import {UPDATE_PWD_URL, PROYECTO_NUMBER} from '@env';
import {StoreContext} from '../../../store/Context';
import {GenerateToken} from '../../../utils/GenerateToken';
import axios from 'axios';
import {Alerts, ErrorAlert} from '../../../palette/Alerts';
import {updateSessionStatus} from '../../../database/Schemas';

const UpdatePassword = () => {

        const {dataStore} = useContext(StoreContext);
        const {dataUser} = dataStore;


        const [loading, setLoading] = useState(false);

        const {identificacion} = dataUser;

        const formikRef = useRef();
        const navigation = useNavigation();

        const onSubmit = async (values) => {

            const {password} = values;
            Keyboard.dismiss();
            setLoading(true);

            const token = await GenerateToken();

            const data = {identificacion: identificacion, proyecto: PROYECTO_NUMBER, clave: password};
            const headers = {'Authorization': `Bearer ${token.access_token}`, 'Content-Type': 'application/json'};

            try {
                await axios.post(UPDATE_PWD_URL, data, {headers: headers});
                formikRef.current?.setSubmitting(false);
                formikRef.current?.resetForm();
                setLoading(false);
                const update = [0, '001'];
                dataStore.ResetData();
                await updateSessionStatus(update);
                navigation.navigate('Login')
                Alerts('success', 'CONTRASEÑA ACTUALIZADA', 'Su contraseña ha sido actualizada exitosamente!');
            } catch (e) {
                ErrorAlert();
                setLoading(false);
            }
        };

        return (
            <View style={styles.mainContainer}>
                <Header color={'#FFF'} picBgColor={'#FFF'} textColor={colors.appColor}/>
                <TextScreen text={'MI CUENTA'} subText={'Actualizar contraseña'} color={'#FFF'}
                            colorTextContainer={colors.secondColor}
                            colorText={'#FFF'}/>
                <View style={styles.bodyView}>
                    <KeyboardAwareScrollView contentContainerStyle={styles.formContainer} scrollEnabled
                                             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                             resetScrollToCoords={{x: 0, y: 0}}
                                             extraHeight={30} extraScrollHeight={30}
                                             enableOnAndroid={true}
                                             keyboardShouldPersistTaps="handled">
                        <Formik
                            innerRef={formikRef}
                            validateOnMount={false}
                            validationSchema={updatePasswordSchema}
                            initialValues={updatePasswordValues}
                            onSubmit={values => onSubmit(values)}
                        >
                            {({
                                  handleChange,
                                  handleSubmit,
                                  values,
                                  errors,
                              }) => {

                                return (
                                    <>
                                        <Edit field={'password'} label={'Contraseña nueva'}
                                              errors={errors.password}
                                              value={values.password} onChangeText={handleChange}/>
                                        <VerticalSpace space={5}/>
                                        <Edit field={'checkPassword'} label={'Confirmar contraseña'}
                                              errors={errors.checkPassword}
                                              value={values.checkPassword} onChangeText={handleChange}/>

                                        <VerticalSpace space={15}/>
                                        <Layout row center space>
                                            <TouchableOpacity
                                                style={{flexDirection: 'row', alignItems: 'center'}} disabled={loading}
                                                onPress={() => navigation.navigate('MyAccount')}>
                                                {imgBack}
                                                <Label text={'Volver'} color={colors.appColor} weight={'700'} left={10}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonsStyle} disabled={loading}
                                                              onPress={handleSubmit}>
                                                {loading ?
                                                    <ActivityIndicator size="small" color={'white'}/> : pwdIcon_2}
                                                <Label text={'Actualizar contraseña'} color={'#FFF'} size={11}
                                                       weight={'700'} left={5}/>
                                            </TouchableOpacity>
                                        </Layout>
                                    </>
                                );
                            }
                            }
                        </Formik>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
;

export default UpdatePassword;

const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            backgroundColor: colors.appColor,
        },

        bodyView: {
            flex: 1,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 14,
            paddingTop: 15,
            paddingRight: 15,
            paddingLeft: 5,
        },

        formContainer: {
            marginTop: 10,
            backgroundColor: '#FFF',
            flexGrow: 1,
        },

        buttonsStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
            backgroundColor: colors.secondColor,
            height: 40,
            borderRadius: 15,
            flexDirection: 'row',
        },

    },
);
