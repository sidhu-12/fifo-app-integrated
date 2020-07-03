import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,  
         } from "react-native";
var moment = require('moment');         

export default class YardInventory_Item extends React.Component {
    
    constructor(props) {
        super(props);
        this.data = props.data ;
        this.data.emr_Id = props.emr_Id ;
        this.data.emr_IP_Address = props.emr_IP_Address
    }

    handlePress = () => {
        const itemData = this.data
        this.props.onPress(itemData);   // passing container data to the modal via ShowYardInventory
    }

    render() {
        return(
            <View style={styles.mycard}>
                    <View style={{width:180}}>
                        <View style={{flexDirection:'row',width:180}}>
                            <Text style={{ fontSize:16}}>Location: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:35}}>{this.data.LOCATION_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:135}}>
                            <Text style={{ fontSize:16}}>Shipping Line: </Text>  
                            <Text style={{ fontSize:16}}>{this.data.SHIPPING_LINE_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:120}}>
                            <Text style={{ fontSize:16}}>Equip Type: </Text>  
                            <Text style={{ fontSize:16,paddingLeft:18}}>{this.data.EQUIPMENT_TYPE}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:150}}>
                            <Text style={{ fontSize:16}}>Equip Size:          {this.data.EQUIPMENT_SIZE}</Text>
                        </View>
                        <View style={{flexDirection:'row',width:190}}>
                            <Text style={{ fontSize:16}}>Modified Time:   {this.data.LAST_MODIFIED_TIME}</Text>
                        </View> 
                        <View style={{flexDirection:'row',width:210}}>
                            <Text style={{ fontSize:16}}>Modified Date:    {moment(this.data.LAST_MODIFIED_DATE).format('YYYY-MM-DD')}</Text>
                        </View>                        
                    </View>

                    <View style={{justifyContent:'center',width:150,paddingLeft:35}}> 

                            <TouchableOpacity style={styles.button1} 
                                              onPress={this.handlePress}>
                                <Text style={{color: "#fff", fontSize:15, fontWeight: "700", textAlign:"center"}}
                                >View</Text>
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
        height: 40,
        width:80, 
        alignItems: "center",
        justifyContent: "center"
    }
});
