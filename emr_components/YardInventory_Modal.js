import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert,FlatList, Image } from "react-native";

export default class YardInventory_Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        return this.props.onRequestClose()     // closing the modal via ShowYardInventory
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
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Location         :</Text>  
                            <Text style={{ fontSize:18,paddingLeft:16, width:150}}>{item.LOCATION_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Shipping Line :</Text> 
                            <Text style={{ fontSize:18,paddingLeft:15, width:150}}>{item.SHIPPING_LINE_NAME}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Equip Type      :</Text> 
                            <Text style={{ fontSize:18, paddingLeft:15, width:150}}>{item.EQUIPMENT_TYPE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Equip Size       :          {item.EQUIPMENT_SIZE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <Text style={{ fontSize:18}}>Yard Containers    :   {item.TOTAL_CONTAINER_DELIVERED_TO_YARD}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:15}}>
                            <Text style={{ fontSize:18}}>Repair Containers :  {item.CONTAINERS_UNDER_REPAIR}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:2}}>
                            <Text style={{ fontSize:18}}>Day-1 Date             :   {item.DAY1_DATE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:15}}>
                            <Text style={{ fontSize:18}}>Day-1 Containers  :   {item.DAY1_CONTAINER_NOS}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:2}}>
                            <Text style={{ fontSize:18}}>Day-2 Date             :   {item.DAY2_DATE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:15}}>
                            <Text style={{ fontSize:18}}>Day-2 Containers  :   {item.DAY2_CONTAINER_NOS}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:2}}>
                            <Text style={{ fontSize:18}}>Day-3 Date             :   {item.DAY3_DATE}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:15}}>
                            <Text style={{ fontSize:18}}>Day-3 Containers  :   {item.DAY3_CONTAINER_NOS}</Text>
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
        marginVertical:70,
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