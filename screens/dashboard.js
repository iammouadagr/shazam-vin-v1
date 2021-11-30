import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { 
    Button,
    Avatar,
    Text
 } from 'react-native-elements'
import firebase from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { selectAdmin,selectCurrentUser } from '../redux/slices/userSlice'


const dashboard = ({navigation}) => {

    const [avatarUri, setavatarUri] = useState("");
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isAdmin]= useState(useSelector(selectAdmin));
    const [currentUser] = useState(useSelector(selectCurrentUser));

    

    useEffect(() => {
        
      getTotalProducts();
      getTotalUsers();
        
    }, []);

   const getTotalUsers =() => {

    firebase.firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
            setTotalUsers(querySnapshot.size);
        });
   }

   const getTotalProducts = () =>{

    firebase.firestore()
        .collection('product')
        .get()
        .then(querySnapshot => {
            setTotalProducts(querySnapshot.size);
        });
   }


    const signOut = () =>{
        firebase.auth().signOut()
            .then(()=>{
            // Sign-out successful.
                navigation.replace("Login")
            })
            .catch((error) => {
                console.log(error);
            // An error happened.
          });
    }

    const showProducts = () => {
        navigation.navigate("ProductList");
    }
    const scanProduct = () =>{

    }

    return (
        isAdmin ? (
            <SafeAreaView behavior="padding" style={styles.container}>
                <View style={styles.stats}>
                    <View style={[styles.widget,styles.widgetLeft]}>
                        <Text style={styles.widgetTitle}>Utilisateurs</Text>
                        <Text style={styles.widgetContent}>{totalUsers}</Text>
                    </View>
                    <View style={[styles.widget,styles.widgetRight]}> 
                        <Text style={styles.widgetTitle}>Produits</Text>
                        <Text style={styles.widgetContent}>{totalProducts}</Text>
                    </View>
                    
                </View>
                <Avatar size="small" rounded title="ADMIN" />
                <Button style={styles.signOutButton} title = "Se déconnecter" onPress={signOut}>Se déconnecter</Button>
                <Button style={styles.signOutButton} title = "Produits" onPress={showProducts}></Button>
            </SafeAreaView>
        ):(
            <SafeAreaView behavior="padding" style={styles.container}>
            <Avatar size="small" rounded title="ADMIN" />
            <Button style={styles.signOutButton} title = "Scanner" onPress={showProducts}></Button>
            <Button style={styles.signOutButton} title = "Produits" onPress={showProducts}></Button>
            <Button style={styles.signOutButton} title = "Se déconnecter" onPress={signOut}>Se déconnecter</Button>

        </SafeAreaView>
        )
        
    )
}

export default dashboard

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center',
        justifyContent : 'center',
        padding : 10
    },
    signOutButton:{
        width : 200,
        marginTop: 10
    },
    stats :  {
        flexDirection: 'row',
        borderRadius: 20,
        height: 120,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width:400
    },
    widget:{
        width: 180,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: "#2C6BED",
        paddingVertical: 10,
    
    },
    widgetTitle:{
        fontFamily :'Helvetica Neue',
        fontSize : 16,
        fontWeight: "300",
        color: "#F5F5F5"
    },
    widgetContent:{
        paddingTop: 15,
        fontFamily :'Helvetica-Bold',
        fontSize : 32,
        fontWeight: "800",
        color: "#fff"
    },
    widgetLeft : {
        marginRight:5
    },
    widgetRight : {
        marginLeft:5
    }

})
