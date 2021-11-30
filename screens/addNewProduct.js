import React ,{ useState } from 'react'
import { StyleSheet ,View, KeyboardAvoidingView, Text} from 'react-native'
import { Button, Input} from 'react-native-elements'
import firebase from '../firebase/firebase'

const addNewProduct = () => {

    const [productName, setProductName] = useState("");
    const [productRef, setProductRef] = useState("");
    const [productDomaine, setProductDomaine] = useState("");
    const [productCepage, setProductCepage] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDesc, setProductDesc] = useState("");

    



    const addProduct = () =>{
        firebase.firestore()
                .collection('product')
                .add({
                    reference : productRef,
                    nom : productName,
                    descriptif : productDesc,
                    domaine : productDomaine,
                    embouteillage : productImage,
                    prix: productPrice,
                    cepage : productCepage,
                    reviews: []

                })
                .then(()=>{
                    alert("Produit ajouté avec succès");
                })
                .catch((error)=>{
                    alert(error.message);
                });
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
            <Input 
                placeholder="Nom"
                type="text"
                value = {productName}
                onChangeText = {(text)=> setProductName(text)}
            />
            <Input 
                placeholder="reference"
                type="text"
                value = {productRef} 
                onChangeText = {(text)=> setProductRef(text)}
            />
             <Input 
                placeholder="domaine"
                type="text"
                value = {productDomaine} 
                onChangeText = {(text)=> setProductDomaine(text)}
            />
             <Input 
                placeholder="cepage"
                type="text"
                value = {productCepage} 
                onChangeText = {(text)=> setProductCepage(text)}
            />
             <Input 
                placeholder="embouteillage"
                type="text"
                value = {productImage} 
                onChangeText = {(text)=> setProductImage(text)}
            />
             <Input 
                placeholder="prix"
                type="text"
                value = {productPrice} 
                onChangeText = {(text)=> setProductPrice(text)}
            />
             <Input 
                placeholder="descriptif"
                type="text"
                value = {productDesc} 
                onChangeText = {(text)=> setProductDesc(text)}
            />
            
            
        </View>
        <Button style={styles.addButton} title = "Ajouter" onPress={addProduct}/>
    </KeyboardAvoidingView>
    )
}

export default addNewProduct

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        justifyContent : 'center',
        padding : 10
    },
    inputContainer:{
        paddingTop : 10,
        width : 300
    },
    addButton:{
        width : 200,
        marginTop: 10
    },
})
