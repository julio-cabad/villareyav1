import React, {useContext, useEffect, useRef} from 'react';
import {TouchableOpacity, Platform, ScrollView, StyleSheet, View, BackHandler} from 'react-native';
import Header from '../../../palette/Header';
import TextScreen from '../../../palette/TextScreen';
import {colors} from '../../../utils/Colors';
import {myAccountSchema, myAccountValues} from '../../../utils/FormsSchemas';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import Edit from '../../../palette/Edit';
import VerticalSpace from '../../../palette/VerticalSpace';
import {Layout} from '../../../styled-components/StyledComponents';
import Label from '../../../palette/Label';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';

const MyAccount = () => {

    const {dataStore} = useContext(StoreContext);
    const {dataUser} = dataStore;
    // const {identificacion, nombres, email, telefono, direccion, nacionalidad} = dataUser;

    const formikRef = useRef();
    const navigation = useNavigation();
    const scrollRef = useRef(null);

    const route = useRoute();

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return route.name === 'MyAccount';
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [route]),
    );

    useEffect(() => {

        let isMounted = true;

        if (scrollRef) {
            scrollRef.current.scrollTo({animated: false, x: 0, y: 0});
        }

        return () => {
            isMounted = false;
        };

    }, []);

    const onSubmit = () => {

    };

    return (
        <View style={styles.mainContainer}>
            <Header color={'#FFF'} picBgColor={'#FFF'} textColor={colors.appColor} myAccount={true}/>
            <TextScreen text={'MI CUENTA'} color={'#FFF'} colorTextContainer={colors.secondColor}
                        colorText={'#FFF'}/>
            <ScrollView style={styles.bodyView} ref={scrollRef}>
                <KeyboardAwareScrollView contentContainerStyle={styles.formContainer} scrollEnabled
                                         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                         resetScrollToCoords={{x: 0, y: 0}}
                                         extraHeight={30} extraScrollHeight={30}
                                         enableOnAndroid={true}
                                         keyboardShouldPersistTaps="handled">

                    <Formik
                        innerRef={formikRef}
                        validateOnMount={false}
                        validationSchema={myAccountSchema}
                        initialValues={dataUser}
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
                                    <Edit field={'identification'} label={'IDENTIFICACIÓN'}
                                          errors={errors.identification} disabled={false}
                                          value={values?.identificacion} onChangeText={handleChange}/>
                                    <VerticalSpace space={5}/>
                                    <Edit field={'names'} label={'NOMBRES Y APELLIDOS'} errors={errors.names}
                                          value={values?.nombres} onChangeText={handleChange} disabled={false}/>
                                    <VerticalSpace space={5}/>
                                    <Edit field={'email'} label={'E-MAIL'} errors={errors.email} disabled={false}
                                          value={values?.email} onChangeText={handleChange}/>
                                    <VerticalSpace space={5}/>
                                    <Edit field={'phone'} label={'TELÉFONO'} errors={errors.phone} disabled={false}
                                          value={values?.telefono} onChangeText={handleChange}/>
                                    <VerticalSpace space={5}/>
                                    <VerticalSpace space={5}/>
                                    <Edit field={'direction'} label={'DIRECCIÓN'} errors={errors.direction}
                                          value={values?.direccion} onChangeText={handleChange} textArea={true}
                                          disabled={false}/>
                                    <VerticalSpace space={15}/>
                                    <Layout row center positionR>
                                        {/*<TouchableOpacity style={styles.buttonsStyle} onPress={handleSubmit}>
                                            <Label text={'Editar perfil'} color={'#FFF'} size={11} weight={'700'}/>
                                        </TouchableOpacity>*/}
                                        <TouchableOpacity style={styles.buttonsStyle}
                                                          onPress={() => navigation.navigate('UpdatePassword')}>
                                            <Label text={'Cambio de contraseña'} color={'#FFF'} size={11}
                                                   weight={'700'}/>
                                        </TouchableOpacity>
                                    </Layout>
                                </>
                            );
                        }
                        }
                    </Formik>
                </KeyboardAwareScrollView>
            </ScrollView>
        </View>
    );
};

export default observer(MyAccount);

const styles = StyleSheet.create({
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
        width: '49%',
        backgroundColor: colors.secondColor,
        height: 40,
        borderRadius: 15,
    },
});
