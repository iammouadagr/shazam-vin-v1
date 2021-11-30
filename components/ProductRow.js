import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'

const ProductRow = ({data}) => {

    const navigation = useNavigation();
    
    return (
        <TouchableOpacity 
            style={styles.productRow}
            onPress={()=> navigation.navigate('SingleProduct',{
                data
            })} >
            <Image style={styles.productImage} source={{uri : data.embouteillage }}/>
            <Text style={styles.productName}>{data.nom}</Text>
        </TouchableOpacity>
    )
}

export default ProductRow

const styles = StyleSheet.create({
    productRow : {

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0.75,
        marginHorizontal: 30,
        marginVertical: 5,
        borderRadius: 20,
        shadowColor: "#000",
        backgroundColor: "#2C6BED",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius:1.41,
        elevation: 2,
        width : 300

    },
    productImage : {
        borderRadius : 9999,
        height : 80,
        width : 80,
        marginHorizontal : 15,
        marginVertical: 15

    },
    productName : {
        paddingTop: 5,
        paddingHorizontal: 30,
        fontFamily :'Helvetica-Bold',
        fontSize : 20,
        fontWeight: "800",
        color: "#fff"
    }
})
