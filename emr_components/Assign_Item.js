import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,  
         Alert } from "react-native";

export default class Assign_Item extends React.Component {
    
    constructor(props) {
        super(props);
        this.data = props.data ;        // Assigning specific container data
        this.data.emr_Id = props.emr_Id;
        this.data.emr_IP_Address=props.emr_IP_Address;
        this.navigation = props.navigation  // Assigning Navigation for navigating to UpdateScreen
    }
 
    render() {
        return(
            <View style={styles.mycard}>
                    
                    <View style={{width:180}}>
                        <View style={{flexDirection:'row',width:180}}>
                            <Text style={{ fontSize:16}}>Container No: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:2}}>{this.data.CONTAINER_NO}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:180}}>
                            <Text style={{ fontSize:16}}>Location: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:34}}>{this.data.PLACE_OF_DELIVARY}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:150}}>
                            <Text style={{ fontSize:16}}>Destuff Date: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:7}}>{this.data.MTY_AVALY_DATE}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:150}}>
                            <Text style={{ fontSize:16}}>Destuff Time: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:3}}>{this.data.MTY_AVALY_TIME}</Text>
                        </View> 
                        <View style={{flexDirection:'row',width:130}}>
                            <Text style={{ fontSize:16}}>Shipping Line: </Text>  
                            <Text style={{ fontSize:16,}}>{this.data.SHIPPINGLINE_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:127}}>
                            <Text style={{ fontSize:16}}>Importer Name: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:5}}>{this.data.CONSIGNEE_NAME}</Text>
                        </View>                       
                    </View>

                    <View style={{justifyContent:'center',width:150,paddingLeft:30}}> 

                            <TouchableOpacity style={styles.button1} 
                                              onPress={()=> this.navigation.navigate("UpdateScreen", this.data)}>
                                <Text style={{color: "#fff", fontSize:15, fontWeight: "700", textAlign:"center"}}>Update</Text>
                            </TouchableOpacity>
             
                    </View>

                  </View>
                
        )

    }
}

const styles = StyleSheet.create({
    mycard:{
        flexDirection:"row",
        borderColor:"#00c0e2",
        borderWidth:3,
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:2,
        padding:10
      },
      button1: {
        marginHorizontal: 25,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        width:80,
        height: 40, 
        alignItems: "center",
        justifyContent: "center"
    },
});