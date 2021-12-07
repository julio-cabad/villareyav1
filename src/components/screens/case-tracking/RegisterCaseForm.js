import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Keyboard, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Layout} from '../../../styled-components/StyledComponents';
import {
    imgAccountStatus,
    imgBackMenu,
    imgBuildStatus,
    imgCreditStatus,
    imgReferral,
    sendIcon,
} from '../../../utils/Icons';
import {registerCaseSchema, registerCaseValues} from '../../../utils/FormsSchemas';
import {Formik} from 'formik';
import Edit from '../../../palette/Edit';
import VerticalSpace from '../../../palette/VerticalSpace';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Label from '../../../palette/Label';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/Colors';
import ComboBox from '../../../palette/ComboBox';
import {CREATE_CASE_URL, PROYECTO, } from '@env';
import {GenerateToken} from '../../../utils/GenerateToken';
import axios from 'axios';
import ListButtons from '../../../palette/ListButtons';
import {Alerts, ErrorAlert} from '../../../palette/Alerts';

const priority = [
    {id: 1, text: 'Alta', select: false},
    {id: 2, text: 'Media', select: false},
    {id: 3, text: 'Baja', select: false},
];

const reasons = [
    {id: 1, text: 'Anaqueles', select: false},
    {id: 2, text: 'Closet', select: false},
    {id: 3, text: 'Filtraciones en paredes y cubierta', select: false},
    {id: 4, text: 'Fisuras', select: false},
    {id: 5, text: 'Fugas de agua', select: false},
    {id: 6, text: 'Instalaciones electricas', select: false},
    {id: 7, text: 'Perfileria PVC o ALUMINIO', select: false},
    {id: 8, text: 'Pintura elastomerica', select: false},
    {id: 9, text: 'Puertas de madera, jambas y rastreas', select: false},
    {id: 10, text: 'Puertas metalicas y tapas de cisternas', select: false},
    {id: 11, text: 'Recubrimiento de pisos y paredes', select: false},
    {id: 12, text: 'Tumbado falso', select: false},
];


const RegisterCaseForm = (props) => {

    const {scrollRef, contractCode, dataStore} = props;

    const formikRef = useRef();
    const navigation = useNavigation();

    const [initialValues, setInitialValues] = useState(registerCaseValues);
    const [trigger, setTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [menuReasons, setMenuReasons] = useState(reasons);
    const [menuPriority, setMenuPriority] = useState(priority);

    useEffect(() => {

        let isMounted = true;

        if (scrollRef) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
            formikRef.current?.setSubmitting(false);
            formikRef.current?.resetForm();
            Keyboard.dismiss();
        }

        return () => {
            isMounted = false;
        };

    }, [trigger]);

    const onSubmit = async (values) => {

        const url = `${CREATE_CASE_URL}${contractCode}&${PROYECTO}&descripcion=''&prioridad=${values.priority}&razon=${values.reasons}&asunto=${values.issues}`;

        setLoading(true);
        Keyboard.dismiss();

        const token = await GenerateToken();

        const headers = {'Authorization': `Bearer ${token.access_token}`};

        try {
            await axios.get(url, {headers: headers});
            await dataStore.CaseList(contractCode, token.access_token);
            Alerts('success', 'CASO CREADO', 'Caso creado exitosamente');
            setMenuReasons([...reasons]);
            setMenuPriority([...priority]);
            setInitialValues({...registerCaseValues, priority: '', reasons: ''});
            setTrigger(!trigger);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setTrigger(!trigger);
            setInitialValues({...registerCaseValues, priority: '', reasons: ''});
            ErrorAlert();
        }
    };


    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} scrollEnabled
                                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                 resetScrollToCoords={{x: 0, y: 0}}
            //extraHeight={30} extraScrollHeight={30}
                                 enableOnAndroid={true}
                                 keyboardShouldPersistTaps="handled"
        >

            <Formik
                innerRef={formikRef}
                validateOnMount={false}
                validationSchema={registerCaseSchema}
                initialValues={initialValues}
                onSubmit={values => onSubmit(values)}
            >
                {({
                      handleChange,
                      handleSubmit,
                      values,
                      errors,
                  }) => {

                    initialValues.priority !== '' ? values.priority = initialValues.priority : values.priority = '';
                    initialValues.reasons !== '' ? values.reasons = initialValues.reasons : values.reasons = '';

                    return (
                        <>
                            <VerticalSpace space={5}/>
                            <ComboBox field={'priority'} value={values.priority} label={'PRIORIDAD'}
                                      textHeader={'PRIORIDAD'} placeholder={'SELECCIONAR PRIORIDAD'} menu={menuPriority}
                                      registerCaseValues={initialValues} setInitialValues={setInitialValues}
                                      errors={errors.priority} onChangeText={handleChange}/>

                            <ComboBox field={'reasons'} value={values.reasons} label={'RAZONES'}
                                      widthMenu={'90%'} errors={errors.reasons} onChangeText={handleChange}
                                      textHeader={'RAZONES'} placeholder={'SELECCIONAR LA RAZON'} menu={menuReasons}
                                      registerCaseValues={initialValues} setInitialValues={setInitialValues}/>

                            <Edit field={'issues'} label={'ASUNTO'} errors={errors.issues}
                                  value={values.issues} onChangeText={handleChange} textArea={true}/>
                            <Layout center top={20}>
                                <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}
                                                  disabled={loading}>
                                    {loading ?
                                        <ActivityIndicator size="small" color={'white'}/> : sendIcon}
                                    <Label text={'ENVIAR'} size={12} color={'#FFF'} weight={'700'}
                                           left={10}/>
                                </TouchableOpacity>
                                <VerticalSpace space={10}/>
                            </Layout>
                        </>
                    );
                }
                }</Formik>
            {/* <CaseTrackingInfo/>*/}
            <VerticalSpace space={15}/>
            <Layout>
                <ListButtons image={imgAccountStatus} text={'ESTADO DE CUENTA'}
                             onPress={() => {
                                 setTrigger(!trigger);
                                 navigation.navigate('AccountStatus');
                             }}/>
                <VerticalSpace space={7}/>
                <ListButtons image={imgBuildStatus} text={'ESTADO DE CONSTRUCCION'}
                             onPress={() => {
                                 setTrigger(!trigger);
                                 navigation.navigate('ConstructionStatus');
                             }}/>
                <VerticalSpace space={7}/>
                <ListButtons image={imgCreditStatus} text={'ESTADO DE CREDITO HIPOTECARIO'}
                             onPress={() => {
                                 setTrigger(!trigger);
                                 navigation.navigate('CreditStatus');
                             }}/>

                <VerticalSpace space={7}/>
                <ListButtons image={imgReferral} text={'REFERIDOS'}
                             onPress={() => {
                                 setTrigger(!trigger);
                                 navigation.navigate('Referred');
                             }}
                />
                <VerticalSpace space={7}/>
                <ListButtons image={imgBackMenu} text={'VOLVER AL MENU'}
                             onPress={() => {
                                 setTrigger(!trigger);
                                 navigation.navigate('Summary');
                             }}/>
            </Layout>
            <VerticalSpace space={7}/>
        </KeyboardAwareScrollView>
    );
};


export default RegisterCaseForm;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFF',
        flexGrow: 1,
        padding: 5,
    },

    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '50%',
        height: 35,
        backgroundColor: colors.secondColor,
        borderRadius: 15,
    },
});
