import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity, 
         Modal, 
         ScrollView, 
         Alert,
         FlatList, 
         Image,
         RefreshControl } from "react-native";
import axios from "axios";        
import UA_Modal from '../emr_components/UA_Modal';
import UA_Item from "../emr_components/UA_Item" ;

export default class UnassignedScreen extends React.Component {
    state={
        setModalVisible: false,
        modalItemData: {},
        data:[],
        refreshing:false,
        delcontainerkey:null,
        emr_Id: this.props.route.params.emr_Id,
        emr_IP_Address: this.props.route.params.emr_IP_Address
    }

    componentDidMount = async() => {

        this.setState({
            refreshing:true    ,
        }) 
        var res=this.props.route.params.emr_IP_Address +'/auth/unassigned_containers/' + this.props.route.params.emr_username
        // console.log(res)
        const response = await fetch(res) ;
        const containers = await response.json();
        this.setState({data:containers[0]})
        this.setState({
            refreshing:false
        }) 
    }

    handleItemDataOnPress = (itemData) => {
        this.setState({
            setModalVisible: true ,     // opening the Modal and passing specific container data to the modal
            modalItemData: itemData
        });
    }

    handleModalClose = () => {
        this.setState({
            setModalVisible: false,     // closing the modal and making modal data empty
            modalItemData: {}
        })
    } 

    onRefresh = async () => {
        this.setState({
            refreshing:true    ,    //Loadin Functionality when pull down 
        }) 
        var res=this.props.route.params.emr_IP_Address + '/auth/unassigned_containers/' + this.props.route.params.emr_username
        // console.log(res)
        const response = await fetch(res) ;
        const containers = await response.json();
        this.setState({data:containers[0]})
        this.setState({
            refreshing:false
        }) 
    };

    render() {
        return (
            <ScrollView
                refreshControl={
                    //Loading Functionality
                    <RefreshControl refreshing={this.state.refreshing} 
                                    onRefresh={this.onRefresh} 
                                    enabled={true}
                    />
                }
            >
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
                
                    
                {/* List of Unassigned Containers */}
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={({ item, index }) => 
                        <UA_Item 
                            onPress={this.handleItemDataOnPress} 
                            data={item}
                            emr_Id={this.state.emr_Id} 
                            emr_IP_Address={this.props.route.params.emr_IP_Address}
                            navigation={this.props.navigation}
                        /> 
                    }        
                />

                {/* Modal Screen of paricular container */}
                <UA_Modal
                    showModal={this.state.setModalVisible}
                    item={this.state.modalItemData}
                    onRequestClose={this.handleModalClose}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      },
});




