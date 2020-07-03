import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         FlatList, 
         ScrollView, 
         Image,
         RefreshControl } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import YardInventory_Item from "../emr_components/YardInventory_Item" ;
import YardInventory_Modal from "../emr_components/YardInventory_Modal";

export default class ShowYardInventory extends React.Component {
    state={
        setModalVisible: false,
        modalItemData: {},
        data:[] , 
        refreshing: false,
        
    }

    componentDidMount = async () => {
        this.setState({
            refreshing:true ,    // Loading Functionality
        })
        var res=this.props.route.params.emr_IP_Address + '/yard_inventory_list/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const containers = await response.json();
        this.setState({data:containers})
        this.setState({
            refreshing:false
        })
    }

    handleItemDataOnPress = (itemData) => {
        this.setState({
            setModalVisible: true ,        //opening the modal and assigning the container data inside modal
            modalItemData: itemData
        });
    }

    handleModalClose = () => {
        this.setState({
            setModalVisible: false,         // closing the modal and making container data empty inside modal
            modalItemData: {}
        })
    } 

    

    onRefresh = async () => {
        this.setState({
            refreshing:true     // Loading Functionality when pull down
        }) 
        var res=this.props.route.params.emr_IP_Address + '/yard_inventory_list/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const containers = await response.json();
        this.setState({data:containers}) 
        this.setState({
            refreshing:false
        }) 
        
    };

    render() {
        // console.log(this.state.data)
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
                
                {/* List of Recently Yard Inventory Updates */}
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={({ item }) => 
                        <YardInventory_Item  
                            onPress={this.handleItemDataOnPress} 
                            data={item} 
                            emr_Id={this.props.route.params.emr_Id}
                            emr_IP_Address={this.props.route.params.emr_IP_Address}
                        />
                    }                    
                />
                 {/* Modal Screen for particular container having specific container data */}
                 <YardInventory_Modal
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


