import React,{useEffect,useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import   firebase  from '../firebase/firebase'


const ReviewRow = ({data}) => {

    const [user, setUser] = useState({});
    console.log(data.user);

    useEffect(() => {
      firebase.firestore()
                    .collection('users')
                    .doc(data.user)
                    .get()
                    .then(documentSnapshot => {
                        console.log('User exists: ', documentSnapshot.exists);
                    
                        if (documentSnapshot.exists) {
                          console.log('User data: ', documentSnapshot.data());
                          setUser(documentSnapshot.data());

                        }
                    })
                    .catch()
    }, [])
    return (
        <TouchableOpacity style={styles.reviewRow}>
            <Image style={styles.userAvatar} source={require('../assets/avatar.png')}/>
            <Text style={styles.userName}>{user.displayName}</Text>
            <View style={styles.userStarSection}>
                <Text style={styles.userStars}>{data.rating}/5</Text>
            </View>
            
            
        </TouchableOpacity>
    )
}

export default ReviewRow

const styles = StyleSheet.create({

    reviewRow : {

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 20,
        shadowColor: "#000",
        backgroundColor: "#F6F6F8",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius:1.41,
        elevation: 2

    },
    userAvatar : {
        borderRadius : 9999,
        height : 40,
        width : 40,
        marginHorizontal : 15,
        marginVertical: 15

    },
    userName : {
        fontFamily :'Helvetica-Bold',
        fontSize : 18,
        fontWeight: "400", 
    },
    userStarSection : {
        textAlign:'right',
        paddingLeft:180
    },
    userStars : {
        color:"#2C6BED",
        fontFamily :'Helvetica-Bold',
        fontSize : 22,
        fontWeight: '900'
        
    }


})
