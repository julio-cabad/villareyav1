import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Layout} from '../../../styled-components/StyledComponents';
import Label from '../../../palette/Label';
import {colors} from '../../../utils/Colors';
import Icon from 'react-native-vector-icons/Fontisto';
import {UpdateArray} from '../../../utils/HelpFunctions';

const ModalMenu = (props) => {

    const {
        modalVisible,
        setModalVisible,
        menu,
        textHeader,
        registerCaseValues,
        setInitialValues,
        field,
        widthMenu,
    } = props;

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        let isMounted = true;

        setMenuList([...menu]);

        return () => {
            isMounted = false;
        };

    }, [menu]);

    const handleList = (data, id) => {
        const update = UpdateArray(menu, 'id', id, 'select', true);
        setMenuList(update);
        if (field === 'priority') {
            setInitialValues({...registerCaseValues, priority: data});
            setModalVisible(false);
        }
        if (field === 'reasons') {
            setInitialValues({...registerCaseValues, reasons: data});
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {width: widthMenu ? widthMenu : '60%'}]}>
                        <Layout row center space>
                            <Label color={colors.appColor} text={textHeader} radius={30} weight={'bold'}/>
                            <Icon name={'close'} size={20} color={'gray'}
                                  onPress={() => setModalVisible(false)}/>

                        </Layout>


                        {menuList.map((items, i) => {
                            return (
                                <TouchableOpacity style={styles.buttonContainer} key={i} onPres={handleList}
                                                  onPress={() => handleList(items.text, items.id)}>
                                    {items.select ?
                                        <Icon name={'checkbox-active'} size={20} color={colors.secondColor}/> :
                                        <Icon name={'checkbox-passive'} color={'gray'} size={20}/>}
                                    <Label color={colors.appColor} text={items.text} weight={'bold'} left={10}
                                           top={2}/>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

            </Modal>
        </View>
    );
};

export default ModalMenu;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        width: '100%',
    },


});


