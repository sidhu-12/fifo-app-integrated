import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,  
         Alert } from "react-native";
import axios from 'axios';

export default class UA_Item extends React.Component {
    
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.data = props.data ;
        this.emr_Id = props.emr_Id;
        this.emr_IP_Address = props.emr_IP_Address;
        this.emr_username=props.emr_username;
        this.containerkey = props.index ;
    }

    handlePress = () => { 
        const itemData = this.data      // Assigning specific container data to the modal via UnassignedScreen
        this.props.onPress(itemData);
    }

    addContainer = () => {
            const container = this.data     // adding the container to the assigned container list
            container.emr_Id = this.emr_Id  // adding the emr_Id to the assigned container list
            // console.log(container)

            const details = {
                method:'POST' ,
                headers: {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(container)
            }    
                    
            fetch(this.emr_IP_Address + '/transfer_to_my_container',details)
            .then(() => {
                Alert.alert('Container added')
            })
                
            //this.navigation.navigate('Unassigned',{emr_Id:this.emr_Id,emr_IP_Address:this.emr_IP_Address})
            this.navigation.pop();
            //this.navigation.navigate('Unassigned',{emr_Id:this.emr_Id,emr_IP_Address:this.emr_IP_Address})

            
    }

    render() {
        return(
            <View style={styles.mycard}>
                        
                <View style={{width:180}}>
                <View style={{flexDirection:'row',width:170}}>
                        <Text style={{ fontSize:16}}>Container No: </Text>  
                        <Text style={{ fontSize:16, paddingLeft:3}}>{this.data.CONTAINER_NO}</Text>
                    </View>
                    <View style={{flexDirection:'row',width:170}}>
                        <Text style={{ fontSize:16}}>Location: </Text>  
                        <Text style={{ fontSize:16, paddingLeft:35}}>{this.data.PLACE_OF_DELIVARY}</Text>
                    </View>
                    <View style={{flexDirection:'row',width:150}}>
                        <Text style={{ fontSize:16}}>Destuff Date: </Text>  
                        <Text style={{ fontSize:16, paddingLeft:7}}>{this.data.MTY_AVALY_DATE}</Text>
                    </View>
                    <View style={{flexDirection:'row',width:150}}>
                        <Text style={{ fontSize:16}}>Destuff Time: </Text>  
                        <Text style={{ fontSize:16, paddingLeft:3}}>{this.data.MTY_AVALY_TIME}</Text>
                    </View>     
                    <View style={{flexDirection:'row',width:130}}>
                        <Text style={{ fontSize:16}}>Shipping Line: </Text>  
                        <Text style={{ fontSize:16, paddingLeft:2}}>{this.data.SHIPPINGLINE_NAME}</Text>
                    </View>
                    <View style={{flexDirection:'row',width:160}}>
                        <Text style={{ fontSize:16}}>Importer: </Text>  
                        <Text style={{ fontSize:16, paddingLeft:5}}>{this.data.CONSIGNEE_NAME}</Text>
                    </View>                    
                </View>

                <View style={{paddingLeft:30,justifyContent:'center',width:150,marginLeft:5}}> 
                    <View>
                        <TouchableOpacity style={styles.button1} 
                                          onPress={this.handlePress}>
                            <Text style={{color: "#fff", fontSize:15, fontWeight: "700", textAlign:"center"}}
                            >View</Text>
                        </TouchableOpacity>
                    
                    </View>
                    
                    <TouchableOpacity style={styles.button2}>
                        <Text style={{color: "#fff", fontSize:15, fontWeight: "700", textAlign:"center"}}
                            onPress={this.addContainer}
                        >Add</Text>
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
        width:80,
        marginHorizontal: 20,
        marginVertical:8,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        height: 40, 
        alignItems: "center",
        justifyContent: "center"
    },
    button2: {
        padding:5,
        marginHorizontal: 20,
        marginVertical:8,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        height: 40,
        width:80, 
        alignItems: "center",
        justifyContent: "center"
    }
});