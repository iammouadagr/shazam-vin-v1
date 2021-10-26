import React ,{ useState } from 'react'
import { StyleSheet ,View, KeyboardAvoidingView, Text} from 'react-native'
import { Button, Input, Image} from 'react-native-elements'

const register = ({ navigation }) => {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView>

        <Text>Admin Register</Text>

        <View styles={styles.container}>
            <Input 
                placeholder="Full Name"
                secureTextEntry type="text"
                value = {fullName}
                onChangeText = {(text)=> setFullName(text)}
            />
             <Input 
                placeholder="username"
                secureTextEntry type="text"
                value = {userName}
                onChangeText = {(text)=> setUserName(text)}
            />
            <Input 
                placeholder="Password"
                secureTextEntry type="password"
                value = {password}
                onChangeText = {(text)=> setPassword(text)}
            />
            <Button style={styles.signInButton} title = "login" onPress={signIn}/>
        </View>
        </KeyboardAvoidingView>
    )
}

export default register

const styles = StyleSheet.create({
    container : {

    }

})
