import React ,{ useState, useLayoutEffect } from 'react'
import { StyleSheet ,View, KeyboardAvoidingView, Text} from 'react-native'
import { Button, Input, Image} from 'react-native-elements'
import firebase from '../firebase/firebase'

const register = ({ navigation }) => {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    
    const addUser = (user) => {
        firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set({
                        email: user.email,
                        displayName: fullName,
                        photoURL :  "https://ph-files.imgix.net/2fb378d7-0035-4a85-817c-e819d8f5dbaa.png?auto=format&auto=compress&codec=mozjpeg&cs=strip"
                    })
                    .then(()=>{
                        alert("Utilisateur crée avec succès.");
                        navigation.replace('Login');
                    });
    }

    const signUp = () =>{
        firebase.auth().createUserWithEmailAndPassword(userName,password)
            .then((authUser)=>{
                authUser.user.updateProfile({
                    displayName: fullName,
                    photoURL :  "https://ph-files.imgix.net/2fb378d7-0035-4a85-817c-e819d8f5dbaa.png?auto=format&auto=compress&codec=mozjpeg&cs=strip"
                });
                addUser(authUser.user);
            })
            .catch((error)=>{
                alert(error.message);
            })
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Nom Prenom"
                    type="text"
                    value = {fullName}
                    onChangeText = {(text)=> setFullName(text)}
                />
                <Input 
                    placeholder="identifiant"
                    type="text"
                    value = {userName} 
                    onChangeText = {(text)=> setUserName(text)}
                />
                <Input 
                    placeholder="mot de passe"
                    secureTextEntry type="password"
                    value = {password}
                    onChangeText = {(text)=> setPassword(text)}
                />
                
            </View>
            <Button style={styles.signUpButton} title = "S'inscrire" onPress={signUp}/>
        </KeyboardAvoidingView>
    )
}

export default register

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center',
        justifyContent : 'center',
        padding : 10
    },
    inputContainer:{
        paddingTop : 10,
        width : 300
    },
    signUpButton:{
        width : 200,
        marginTop: 10
    },

})
