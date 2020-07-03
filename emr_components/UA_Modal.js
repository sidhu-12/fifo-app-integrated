import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert,FlatList, Image } from "react-native";

export default class UA_Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        return this.props.onRequestClose()  // closing the modal via UnassignedScreen
    }

    render() {
        const { showModal, item } = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true} 
                visible={showModal}
                onRequestClose={this.handleClose}
            >
                <View style={styles.modal}>
                    <View style={styles.modalView}>  
                        <View style={{ marginBottom:10 }}>
                            <Text style={{ fontSize:18}}>Container No  :   {item.CONTAINER_NO}</Text>
                        </View> 
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>B/L No             :   {item.BILL_NUMBER}</Text>
                        </View>                                 
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Location          :</Text>   
                            <Text style={{ fontSize:18,paddingLeft:13, width:150}}>{item.PLACE_OF_DELIVARY}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Shipping Line  :</Text> 
                            <Text style={{ fontSize:18,paddingLeft:15, width:150}}>{item.SHIPPINGLINE_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Importer          :</Text> 
                            <Text style={{ fontSize:18, paddingLeft:15, width:150}}>{item.CONSIGNEE_NAME}</Text>
                        </View>
                        <View style={{ marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Address          :   {item.CONSIGNEE_ADDRESS}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Equip. Size      :   {item.EQUIPMENT_SIZE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Equip. Type     :   {item.EQUIPMENT_TYPE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Destuff Date   :   {item.MTY_AVALY_DATE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Destuff Time  :   {item.MTY_AVALY_TIME}</Text>
                        </View>
                                  
                        <TouchableOpacity style={styles.button1} 
                                onPress={this.handleClose}>
                            <Text style={{color: "#fff", fontSize:18, fontWeight: "700", textAlign:"center"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    button1: {
        marginHorizontal: 20,
        marginVertical:8,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        height: 35, 
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        flex:1,
        marginTop:70,
        marginBottom:30,
        marginHorizontal:20,
        backgroundColor:"#fff",
        borderRadius:20,
    },
    modalView: {
        flex:1,
        margin:5,
        borderColor:"#00c0e2",
        borderWidth:3,
        borderRadius:20,
        paddingHorizontal:20,
        paddingVertical:15
    }
});
