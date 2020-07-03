import React from "react";
import { View, 
         Text, 
         StyleSheet, 
         FlatList, 
         ScrollView, 
         Image,
         RefreshControl } from "react-native";
import Assign_Item from "./../emr_components/Assign_Item" ;

export default class UnassignedScreen extends React.Component {
 
    state= {
        data: [],
        refreshing: false,
    }

    componentDidMount= async() => {
        this.setState({
            refreshing:true    ,
        }) 
        var res=this.props.route.params.emr_IP_Address + '/auth/assigned_containers/' + this.props.route.params.emr_Id
        // console.log(res)
        const response = await fetch(res) ;
        const containers = await response.json();
        this.setState({data:containers[0]})
        this.setState({
            refreshing:false
        }) 
    }

    onRefresh = async () => {
        this.setState({
            refreshing:true     // Loading Functionality when pull down
        }) 
        var res=this.props.route.params.emr_IP_Address + '/auth/assigned_containers/' + this.props.route.params.emr_Id
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
                
                {/* List of Assigned Containers */}
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={({ item }) => 
                        <Assign_Item  
                            data={item}
                            navigation={this.props.navigation}
                            emr_Id={this.props.route.params.emr_Id}
                            emr_IP_Address={this.props.route.params.emr_IP_Address}
                        />
                    }                    
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