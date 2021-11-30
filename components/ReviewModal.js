import React,{useState, useEffect} from 'react'
import { 
    StyleSheet, 
    View,
    Modal,
    Pressable
} from 'react-native'
import { 
    Input,
    Button,
    Text
 } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/slices/userSlice'

const ReviewModal = (props) => {

    const [comment, setComment] = useState("");
    const [currentUser] = useState(useSelector(selectCurrentUser));
    const [modalVisible, setModalVisible] = useState(props.visible);
    const [product, setProduct] = useState(props.product)

    useEffect(() => {
        console.log("rendered")
        
    },[])

    const postReview = () => {
        setModalVisible(false)
    }
    
    return (
       
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Input 
                    style={styles.input} 
                    placeholder="Taper vore commentaire"
                    secureTextEntry type="text"
                    value = {comment}
                    onChangeText = {(text)=> setComment(text)}
                
                />
                <Input 
                    style={styles.input} 
                    placeholder="Taper vore commntaire"
                    secureTextEntry type="text"
                    value = {comment}
                    onChangeText = {(text)=> setPassword(text)}
                
                />
                <Button buttonStyle={styles.addReviewButton} title = "Poster" onPress={postReview}/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={postReview}
              >
                <Text style={styles.textStyle}>Ajouter</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
       
      
             
            

       
    )
}

export default ReviewModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input:{
        width : 300
    },
    addReviewButton:{
        height: 40,
        borderRadius: 30,
        backgroundColor: "#fff",
        fontWeight: "bold",
        color:"#2C6BED"
    }
})
