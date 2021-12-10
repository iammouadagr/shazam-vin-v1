import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';
import MlkitOcr from 'react-native-mlkit-ocr';


const scanProduct = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const [textRecognized, setTextRecognized] = useState("");


    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    const takePicture = async () => {
        
        if(cameraRef){
            console.log('taking Picture');
            try{
                const data = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    orientation: 'portrait',
                    fixOrientation: true,
                    aspect:[4,3],
                    quality: 1,
                    base64:true
                });
                console.log(data.uri);
                runOcr(data.uri);
                return data;
            }catch(err) {
                console.log(err);
            }
        }

    }

    const runOcr = async (photoUri) => {
        
       const result = await MlkitOcr.detectFromUri(photoUri);
       console.log(result);
    }
    
    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Icon
                            raised
                            name='flip-camera-ios'
                            type='material'
                            containerStyle={styles.buttonContainer}
                            iconStyle={styles.button}
                            size={30}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                                );
                                }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                            
                            name='circle-o'
                            type='font-awesome'
                            containerStyle={styles.bottomContainer}
                            iconStyle={styles.button}
                            size={80}
                            color='white'
                            onPress={async() => {
                                await takePicture() 
                            }}/>
                    </TouchableOpacity>
                </View>
            
            
            </Camera>
           
                
           
        </SafeAreaView>
    )
}

export default scanProduct

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor:'#fff',
        height:'100%'    
    },
    camera :{
        width:'100%',
        height:'100%'
    },
    buttonContainer : {
       backgroundColor:'transparent'
    },
    bottomContainer : {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top: 600 
    },
    bottomButton:{
       
    },
    button:{
        backgroundColor:'transparent'
    }

})
