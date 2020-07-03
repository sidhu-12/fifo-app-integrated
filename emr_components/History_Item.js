import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,  
         } from "react-native";

export default class History_Item extends React.Component {
    
    constructor(props) { 
        super(props);
        this.data = props.data ;
        this.data.emr_Id = props.emr_Id;
    }

    handlePress = () => {
        const itemData = this.data
        this.props.onPress(itemData);   // passing contaner data to the modal via HistoryScreen
    }

    render() {
        return(
            <View style={styles.mycard}>
                    
                    <View style={{width:180}}>
                    <View style={{flexDirection:'row',width:180}}>
                            <Text style={{ fontSize:16}}>Container No: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:3}}>{this.data.CONTAINER_NO}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:180}}>
                            <Text style={{ fontSize:16}}>Location: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:35}}>{this.data.PLACE_OF_DELIVARY}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:150}}>
                            <Text style={{ fontSize:16}}>Destuff Date: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:8}}>{this.data.MTY_AVALY_DATE}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:150}}>
                            <Text style={{ fontSize:16}}>Destuff Time: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:5}}>{this.data.MTY_AVALY_TIME}</Text>
                        </View>   
                        <View style={{flexDirection:'row',width:130}}>
                            <Text style={{ fontSize:16}}>Shipping Line: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:3}}>{this.data.SHIPPINGLINE_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:160}}>
                            <Text style={{ fontSize:16}}>Importer:  </Text>  
                            <Text style={{ fontSize:16 }}>{this.data.CONSIGNEE_NAME}</Text>
                        </View>
                                             
                    </View> 

                    <View style={{justifyContent:'center',width:150,paddingLeft:35}}> 

                            <TouchableOpacity style={styles.button1} 
                                              onPress={this.handlePress}>
                                <Text style={{color: "#fff", fontSize:15, fontWeight: "700", textAlign:"center"}}>View</Text>
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
        marginHorizontal: 20,
        marginVertical:8,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        width:80,
        height: 40, 
        alignItems: "center",
        justifyContent: "center"
    },
});