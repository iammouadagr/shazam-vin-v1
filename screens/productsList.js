import React,{useEffect,useState} from 'react'
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import   firebase  from '../firebase/firebase'
import ProductRow from '../components/ProductRow'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { selectAdmin,selectCurrentUser } from '../redux/slices/userSlice'



const productsList = () => {

    const [products,setProducts] = useState([]);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [totalProducts,setTotalProducts] = useState(0);
    const [isAdmin]= useState(useSelector(selectAdmin));
    const [currentUser] = useState(useSelector(selectCurrentUser));

    useEffect(() => {

        let items = [];

         firebase.firestore()
            .collection('product')
            .get()
            .then(querySnapshot => {
                setTotalProducts(querySnapshot.size);
            
                querySnapshot.forEach(documentSnapshot => {
                  //console.log('Product ID: ', documentSnapshot.id, documentSnapshot.data());
                 //console.log(documentSnapshot.data());
                 let currentID = documentSnapshot.id;
                 let item = {
                     ...documentSnapshot.data(),
                     ['id']: currentID
                 }
                  items.push(item);
                  setProducts(items);
                  setRefreshing(false);
                  
                });
               
                
            });
      
       
    }, [refreshing]);


    const handleRefresh = () =>{
        console.log("refreshing");
        setRefreshing(true);

    }
    

    const footer = () => {
        return ( 
        <TouchableOpacity style={styles.actionsSection}>
            <Icon
                raised
                name='plus'
                type='font-awesome'
                color='#2C6BED'
                style={styles.addIcone}
                onPress={()=> navigation.navigate('AddNewProduct')} />
        </TouchableOpacity>
        ) 
    }

    return (
        products.length > 0 ? (
            <View style={styles.container}>
                
                <FlatList
                style ={styles.products}
                data={products}
                keyExtractor={item => item.reference}
                renderItem={({item}) => <ProductRow data={item}/>}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.headerContent}>{totalProducts} produits trouvés.</Text>
                    </View>
                }
                ListHeaderComponentStyle={styles.headerSection}
                ListFooterComponent={isAdmin ? footer : (null)}
            
            />
            </View>
            
        ) : (
            <View>
                <Text>Pas de produits disponibles</Text>
            </View>
        )
       
    )
}

export default productsList

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 20
    },
    products : {
        height:"90%",
    },
    headerSection : {
        width: 350,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: "#F8F8F8",
        marginVertical: 10,
        paddingVertical: 20 
    },
    headerContent : {
        paddingTop: 20,
        fontFamily :'Helvetica-Bold',
        fontSize : 20,
        fontWeight: "800",
        color: "#2C6BED"
    },
    actionsSection : {
        flexDirection :"row",
        justifyContent:'center',
        width:'100%',
        position:"absolute",
        alignItems: 'center'
        
    },
    addIcone : {
        
        zIndex:3
        
    }
})
