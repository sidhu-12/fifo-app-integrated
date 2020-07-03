import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert,FlatList, Image } from "react-native";

export default class History_Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    check_cleaning = (service) => {
        if(service == '') 
        {
            return '---'
        }
        else
        {
            return service
        }
    }
   

    check_service_ID = (service_ID) => {
        if(service_ID == 73)
        {
            return 'Others'
        }
        else if(service_ID == 71)
        {
            return "Medium Damage"
        }
        else if(service_ID == 26)
        {
            return "Heavy Damage"
        }
        else if(service_ID == 25)
        {
            return "Light Damage"
        }
    }

    handleClose = () => { 
        return this.props.onRequestClose()     // closing the modal via HistoryScreen
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
                        <View style={{ marginBottom:4 }}>
                            <Text style={{ fontSize:18}}>Container No  :   {item.CONTAINER_NO}</Text>
                        </View>
                        <View style={{ marginBottom:4 }}>
                            <Text style={{ fontSize:18}}>B/L No             :   {item.BILL_NUMBER}</Text>  
                        </View>                              
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18 }}>Location          :</Text>
                            <Text style={{ fontSize:18,paddingLeft:13, width:120}}>{item.PLACE_OF_DELIVARY}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Shipping Line  :</Text> 
                            <Text style={{ fontSize:18,paddingLeft:12, width:120}}>{item.SHIPPINGLINE_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Importer          :</Text> 
                            <Text style={{ fontSize:18, paddingLeft:13, width:120}}>{item.CONSIGNEE_NAME}</Text>
                        </View>
                        <View style={{ marginBottom:4 }}>
                            <Text style={{ fontSize:18}}>Address          :   {item.CONSIGNEE_ADDRESS}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Equip. Size      :   {item.EQUIPMENT_SIZE}</Text> 
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Equip. Type     :   {item.EQUIPMENT_TYPE}</Text> 
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Destuff Date   :   {item.MTY_AVALY_DATE}</Text> 
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Destuff Time</Text> 
                            <Text style={{ fontSize:18, paddingLeft:10}}>:</Text> 
                            <Text style={{ fontSize:18, paddingLeft:13, width:120}}>{item.MTY_AVALY_TIME}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Services          :</Text> 
                            <Text style={{ fontSize:18, paddingLeft:15, width:160}}>{this.check_cleaning(item.CLEANING)}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:4}}>
                            <Text style={{ fontSize:18}}>Damage Type :   {this.check_service_ID(item.SERVICE_ID)}</Text> 
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