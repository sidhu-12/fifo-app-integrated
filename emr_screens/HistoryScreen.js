import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import History_Modal from "./../emr_components/History_Modal";
import History_Item from "./../emr_components/History_Item";

export default class HistoryScreen extends React.Component {

    // In real time data is fetched from database
    //it will show the updated container also
    state={
        setModalVisible: false,
        modalItemData: {},
        data:[] , 
        refreshing: false,
        emr_IP_Address: this.props.route.params.emr_IP_Address
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

    componentDidMount = async () => {
        this.setState({
            refreshing:true             // Loading functionality
        })
        var res=this.state.emr_IP_Address + '/auth/history_containers/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const containers = await response.json();
        this.setState({data:containers[0]})
        this.setState({
            refreshing:false
        })
    }

    render() {
        return (
            <ScrollView>
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
                
                {/* List of containers in History Screen */}
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={({ item }) => 
                        <History_Item 
                            onPress={this.handleItemDataOnPress} 
                            data={item} 
                            emr_Id={this.props.route.params.emr_Id}    
                        />
                    }                    
                />

                {/* Modal Screen for particular container having specific container data */}
                <History_Modal
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