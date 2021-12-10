import { useRoute } from '@react-navigation/core'
import React,{ useState } from 'react'
import { SafeAreaView, ScrollView} from 'react-native'
import { StyleSheet,
    Text, 
    View, 
    Modal, 
    Pressable,
    Picker 
} from 'react-native'
import { 
    Image,
    Button,
    Input
    
} from 'react-native-elements'
import { FlatList } from 'react-native'
import   firebase  from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { selectAdmin,selectCurrentUser } from '../redux/slices/userSlice'
import ReviewRow from '../components/ReviewRow'




const singleProduct = () => {
    
    const {params} = useRoute();
    const {data} = params;
    const [isAdmin]= useState(useSelector(selectAdmin));
    const [currentUser] = useState(useSelector(selectCurrentUser));
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const editProduct  = () => {
        console.log("edit");
    }

    const openReviewModal = () => {
        setModalVisible(true);
    }


   

    
    const postReview = () => {

        setModalVisible(!modalVisible);
        
        firebase.firestore()
                    .collection('product')
                    .doc(data.id)
                    .update({
                        reviews: firebase.firestore.FieldValue.arrayUnion({
                            id:currentUser.uid+data.id+rating,
                            comment: comment,
                            rating: rating,
                            user: currentUser.uid
                        })

                    });
    }

    const deleteProduct = () => {
        firebase.firestore()
                    .collection('product')
                    .doc(data.id)
                    .delete()
                    .then(()=>{
                        alert("Produit supprimé avec succès ");
                    })
                    .catch((error)=>{
                        alert(error.message);
                    })
    }

   

    const reviewsHeader = () => {

       return (
        <View >
            <Button buttonStyle={styles.button} title = "Ajouter" onPress={openReviewModal}/>
            
        </View>
       )
   }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.firstSection}>
                    <Image style={styles.productImage} source={{uri : data.embouteillage }}/>
                    <Text style={styles.productName}>{data.nom}</Text>
                    <Text style={styles.productPrice}>{data.prix} €</Text>
                </View>
                <View style={styles.secondSection}>
                    <View style={[styles.widget,styles.widgetLeft]}>
                        <Text style={styles.widgetTitle}>Domaine</Text>
                        <Text style={styles.widgetContent}>{data.domaine}</Text>
                    </View>
                    <View style={[styles.widget,styles.widgetRight]}> 
                        <Text style={styles.widgetTitle}>Cepage</Text>
                        <Text style={styles.widgetContent}>{data.cepage}</Text>
                    </View>
                    
                </View>
                <View style={styles.descSection}>
                    <Text style={styles.descContent}>Blablbablablablablablalblalblalblla blabla blaaaaaa</Text>
                </View>
                <View style={styles.reviewsSection}> 
                    <FlatList
                        data={data.reviews}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={isAdmin ? (null) : reviewsHeader }
                        ListHeaderComponentStyle={styles.reviewHeader}
                        renderItem={({item}) => {
                            if(data.reviews.length > 0) return <ReviewRow key={item.id} data={item} product={data.id}/>

                            return null;
                        }
                        }
                            
                    />
                </View>
                {isAdmin ? (
                      <View style={styles.actionSection}>
                      <Button buttonStyle={styles.editButton} title = "Modifier" onPress={editProduct}/>
                      <Button buttonStyle={styles.deleteButton} title = "Supprimer" onPress={deleteProduct}/>
                  </View>
                ) : (null)}
              
            </ScrollView>

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
                            type="text"
                            value = {comment}
                            onChangeText = {(text)=> setComment(text)}
                        
                        />
                         <Picker
                            selectedValue={rating}
                            style={styles.ratingPicker}
                            onValueChange={(itemValue) => setRating(itemValue)}
                        >
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5" value={5} />
                        </Picker>
                        <Button
                            buttonStyle={[styles.button,styles.postButton]}
                            title = "Poster"
                            onPress={postReview}
                        />

                    </View>
                </View>
            </Modal>
            
          
        </SafeAreaView>
    )
}

export default singleProduct
 
const styles = StyleSheet.create({
    firstSection : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20
    },
    secondSection : {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 20,
        height: 120,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },

    descSection : {
        backgroundColor: "#fff",
        borderRadius: 20,
        height: 100,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingTop: 10,
        paddingHorizontal:10
    },
    reviewsSection:{
        backgroundColor: "#fff",
        borderRadius: 20,
        height: 120,
        marginHorizontal: 10,
        paddingTop: 10,
        paddingHorizontal:10
    },
    reviewHeader:{
        marginHorizontal: 10,
        paddingHorizontal:10,
        flexDirection:'row',
        height: 50
    },
    actionSection:{
        backgroundColor: "#fff",
        borderRadius: 20,
        height: 100,
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal:10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    productImage : {
        borderRadius : 9999,
        height : 180,
        width : 180,
        marginHorizontal : 15,
        marginVertical: 15
    },
    productName:{
        width : 300,
        height: 80,
        color:"black",
        fontFamily :'Helvetica Neue',
        fontSize : 22,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical : 10,
    
    },
    productPrice:{
        width : 300,
        height: 80,
        color:"#2C6BED",
        fontFamily :'Helvetica-Bold',
        fontSize : 22,
        fontWeight: '900',
        textAlign: 'center',
        paddingVertical : 10,
    },
    widget:{
        width: 180,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: "#2C6BED",
        paddingVertical: 10
    
    },
    widgetLeft : {
        marginRight:5
    },
    widgetRight : {
        marginLeft:5
    },
    widgetTitle:{
        fontFamily :'Helvetica Neue',
        fontSize : 16,
        fontWeight: "300",
        color: "#F5F5F5"
    },
    widgetContent:{
        paddingTop: 25,
        fontFamily :'Helvetica-Bold',
        fontSize : 20,
        fontWeight: "800",
        color: "#fff"
    },
    descContent:{
        paddingHorizontal: 10,
        fontFamily :'Helvetica Neue',
        fontSize : 18,
        fontWeight: "300",
        color: "black"  
    },
    editButton:{
        height: 40,
        marginTop: 10,
        borderRadius: 30
    },
    deleteButton:{
        width : 100,
        marginTop: 10,
        backgroundColor: "#FC4A4A",
        color:"#fff",
        borderRadius: 30
    },
    addIcone : {
        
        zIndex:3
        
    },
    addButton:{
        height: 40,
        borderRadius: 30,
        backgroundColor: "#fff",
        color:"#2C6BED"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 300,
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
    postButton: {
        backgroundColor: "#2C6BED",
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
    },
    ratingPicker:{
        width:150,
        borderRadius:30,
        borderWidth:0
    }
})

 