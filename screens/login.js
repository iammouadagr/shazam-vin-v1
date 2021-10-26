import React ,{ useState } from 'react'
import { StyleSheet ,View, KeyboardAvoidingView} from 'react-native'
import { Button, Input, Image} from 'react-native-elements'


const login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {

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

            <Button style={styles.signInButton} title = "login" onPress={signIn}/>
            <Button style={styles.registerButton} title= "register" onPress={()=> navigation.navigate("Register")} type="outline"/>
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
