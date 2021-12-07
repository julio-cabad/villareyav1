import React, {useContext, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {queryAvatar} from '../../../database/Schemas';
import {StoreContext} from '../../../store/Context';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';

function TakePicture() {

    const {dataStore} = useContext(StoreContext);
    const {profilePicture} = dataStore;

    const navigation = useNavigation();

    const [state, setState] = useState({type: RNCamera.Constants.Type.front});

    const camera = useRef();

    const flipCamera = () =>
        setState({
            type:
                state.type === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
        });

    const takePhoto = async () => {

        const options = {
            quality: 0.5,
            base64: true,
            width: 300,
            height: 300,
        };

        if (camera.current) {
            const data = await camera.current.takePictureAsync(options);
            const result = await queryAvatar();
            if (result.length === 0) {
                const dataInsert = ['001', data.uri];
                await dataStore.InsertProfilePhoto(dataInsert);
                await dataStore.ProfilePicture();
                navigation.navigate('MyAccount');
                setState({
                    type:
                        state.type === RNCamera.Constants.Type.back
                            ? RNCamera.Constants.Type.front
                            : RNCamera.Constants.Type.back,
                });
            } else {
                const update = [data.uri, '001'];
                await dataStore.UpdateProfilePicture(update);
                await dataStore.ProfilePicture();
                navigation.navigate('MyAccount');
                setState({
                    type:
                        state.type === RNCamera.Constants.Type.back
                            ? RNCamera.Constants.Type.front
                            : RNCamera.Constants.Type.back,
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={camera}
                type={state.type}
                captureAudio={false}
                style={styles.preview}
            />
            <View style={styles.topButtons}>
                <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
                    <Icon name="refresh" size={35} color="orange"/>
                </TouchableOpacity>
            </View>

            {profilePicture &&
            <View style={styles.avatar}>
                <Image source={{uri: profilePicture}}
                       style={{width: 60, height: 60, borderRadius: 30, resizeMode: 'cover'}}/>
            </View>}

            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={takePhoto} style={styles.recordingButton}>
                    <Icon name="camera" size={50} color="orange"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default observer(TakePicture);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        position: 'relative',
        zIndex: 999,
    },

    preview: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        zIndex: 999,
    },

    avatar: {
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
        top: 10,
        left: 5,
        width: 80,
        height: 80,
        borderRadius: 40,

    },

    topButtons: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'flex-start',
        position: 'absolute',
        zIndex: 1000,
        right: 10
    },
    bottomButtons: {
        flex: 1,
        width: Dimensions.get('window').width,

        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
       marginLeft: 50
    },

    flipButton: {
        flex: 1,
        marginTop: 20,
        right: 20,
        alignSelf: 'flex-end',
    },
    recordingButton: {
        marginBottom: 10,
    },
});
