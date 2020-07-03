import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
const { height } = Dimensions.get('window')

var prop1, emr_Id, emr_name, emr_username, emr_IP_Address ;     //Initialising the variables
const Drawer=createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView>
        <DrawerItem
          label="Dashboard"
          onPress={()=>{prop1.navigation.toggleDrawer()}}
        />
        <DrawerItem
          label="History-My Containers"
          onPress={()=>{prop1.navigation.navigate("HistoryScreen",{emr_Id:emr_Id,emr_IP_Address:emr_IP_Address});prop1.navigation.toggleDrawer()}}
        />
         <DrawerItem
          label="Yard Inventory"
          onPress={()=>{prop1.navigation.navigate("ShowYardInventory",{emr_Id:emr_Id,emr_IP_Address:emr_IP_Address});prop1.navigation.toggleDrawer()}}
        />
        <DrawerItem label="Logout" onPress={() => prop1.navigation.popToTop()} />
      </DrawerContentScrollView>
    );
  }

const HomeDrawer=(props)=>{
    emr_Id=props.route.params.id;            //EMR ID OF USER
    emr_name=props.route.params.name;       //EMR NAME OF USER 
    emr_username=props.route.params.username;   // EMR USERNAME OF USER  
    emr_IP_Address = 'http://192.168.43.233:4545'    //IP Address for loading the data
    
    props.navigation.setOptions({
        headerLeft:()=>(
        <View style={{padding:10}}>
            <Ionicons name="md-menu" size={30} onPress={()=> prop1.navigation.toggleDrawer()}/>
        </View>
        )
  
    })
   
    return (
        <Drawer.Navigator  drawerType="front" drawerPosition="left" drawerContent={(props)=><CustomDrawerContent/>}>
            <Drawer.Screen name="Dashboard2" component={HomeScreen} 
                            options={{
                                title: "Dashboard",
                            }}
            />
        </Drawer.Navigator>
  );
}
   
const HomeScreen = (props) => { 
    prop1=props;
        return (
            <View>
                <View style={styles.imageContainer}>
                    <Image
                    style={{ resizeMode: "stretch" }}
                    source={require("./../components/fifo.png")}
                    />
                    <View>
                    <Text style={{ fontSize: 15 }}>
                        Driven by <Text style={{ color: "#00c0e2" }}>Technology</Text> ,
                        Defined By <Text style={{ color: "#00c0e2" }}>Humanity</Text>
                    </Text>
                    </View>
                </View>
            
                <View style={styles.container}>

                    <Text style={{textAlign:"center",marginBottom:20,fontSize:25}}>Welcome {emr_name}</Text>
                    <TouchableOpacity style={styles.button} 
                                      onPress={()=> props.navigation.navigate('Unassigned',
                                                        {emr_Id:emr_Id, 
                                                         emr_username:emr_username,
                                                         emr_IP_Address:emr_IP_Address})}
                    >
                        <Text style={{color: "#fff", fontSize:20, fontWeight: "700", textAlign:"center"}}>Unassigned Container</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                       onPress={()=> props.navigation.navigate('Assigned',
                                                        {emr_Id:emr_Id,
                                                         emr_IP_Address:emr_IP_Address
                                                        })}
                    >
                        <Text style={{color: "#fff", fontSize:20 , fontWeight: "700", textAlign:"center"}}>Assigned Container</Text>
                    </TouchableOpacity>
                        
                </View>
            </View>
    );

}


const styles = StyleSheet.create({
    image: {
        height: 100, 
        width: 150, 
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
    text: { 
        color: "black", 
        fontWeight: "500" ,
        fontSize:15
    },
    container: {
        height:height-250,
        margin:10,
        borderColor:"#00c0e2",
        borderWidth:2,
        borderRadius:50, 
        justifyContent:"center",
    },
    button: {
        marginHorizontal: 50,
        marginVertical:10,
        backgroundColor:"#00c0e2",
        borderRadius:20,
        height: 65,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default HomeDrawer ;



