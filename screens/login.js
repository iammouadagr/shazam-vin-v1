import React ,{ useState, useEffect } from 'react'
import { StyleSheet ,View, KeyboardAvoidingView} from 'react-native'
import { Button, Input, Image} from 'react-native-elements'
import   firebase  from '../firebase/firebase'
import { useDispatch } from 'react-redux'
import { setIsAdmin,setUid,setUserName } from '../redux/slices/userSlice'


const login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();


    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser)=>{
            if(authUser) {
                 navigation.replace('Dashboard');
                 
            }
        });
 
        return unsubscribe
    },[])

    const signIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((authUser)=>{
                dispatch(setUid(authUser.user.uid));
                dispatch(setUserName(authUser.user.displayName));

                if(authUser.user.displayName == "Admin") dispatch(setIsAdmin(true));
                else {
                    dispatch(setIsAdmin(false));
                }
                                    
                navigation.replace("Dashboard");
            })
            .catch((err)=>{
                alert(err.message);
            })
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image 
                source= {{
                    uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Shazam_icon.svg/1200px-Shazam_icon.svg.png"
                }}
                style={{width : 200 ,height : 200}}
            />

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} />
                <Input 
                    placeholder="Password"
                    secureTextEntry type="password"
                    value = {password}
                    onChangeText = {(text)=> setPassword(text)}
                    />
            </View>

            <Button style={styles.signInButton} title = "Se connecter" onPress={signIn}/>
            <Button style={styles.registerButton} title= "S'inscrire" onPress={()=> navigation.navigate("Register")} type="outline"/>
            <View style = {{ height : 100}}/>
            
        </KeyboardAvoidingView>
    )
}

export default login

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
    signInButton:{
        width : 200,
        marginTop: 10
    },
    registerButton:{
        width : 200,
        marginTop: 10
        
    }
});
