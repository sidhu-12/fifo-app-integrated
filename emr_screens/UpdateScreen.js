import React from "react";
import { ScrollView, View, 
         Text, StyleSheet, 
         TouchableOpacity, Image, 
         CheckBox, Picker, Alert} from "react-native";
import DatePicker from 'react-native-datepicker';

export default class UpdateScreen extends React.Component {
    
    state = {
        // extracted from assigned container
        bill_no: this.props.route.params.BILL_NUMBER ,
        container_no: this.props.route.params.CONTAINER_NO ,
        importer_address: this.props.route.params.CONSIGNEE_ADDRESS ,
        place_of_delivery: this.props.route.params.PLACE_OF_DELIVARY ,
        shipping_line: this.props.route.params.SHIPPINGLINE_NAME ,
        equip_size: this.props.route.params.EQUIPMENT_SIZE ,
        equip_type: this.props.route.params.EQUIPMENT_TYPE ,
        destuff_date: this.props.route.params.MTY_AVALY_DATE ,
        destuff_time: this.props.route.params.MTY_AVALY_TIME ,
        emr_Id:this.props.route.params.emr_Id,
        emr_IP_Address:this.props.route.params.emr_IP_Address,

        // updated from update screen
        date: null,
        time: null,
        sweep_flag:"N",
        sweep_status:false,
        washing_flag:"N",
        washing_status:false,
        cleaning_flag:"N",
        cleaning_status:false,
        service_Id: 25,  // By Default the first damage type is selected --> Light Damage
        
    }

    check_box_sweep = () => {
        if(this.state.sweep_status == true)
        {
            this.setState({
                sweep_status: false,
                sweep_flag:"N"
            }) 
        } 
        else
        {
            this.setState({
                sweep_status: true,
                sweep_flag:"Y"
            }) 
        }
           
    }

    check_box_cleaning = () => {
        if(this.state.cleaning_status == true)
        {
            this.setState({
                cleaning_status: false,
                cleaning_flag:"N"
            }) 
        } 
        else
        {
            this.setState({
                cleaning_status: true,
                cleaning_flag:"Y"
            }) 
        }
           
    }

    check_box_washing = () => {
        if(this.state.washing_status == true)
        {
            this.setState({
                washing_status: false,
                washing_flag:"N"
            }) 
        } 
        else
        {
            this.setState({
                washing_status: true,
                washing_flag:"Y"
            }) 
        }
           
    }

    updateDetails = () => {
        
        if(this.state.date == null) 
        {
            Alert.alert("Please enter the date");
        }else if(this.state.time == null)
        {
            Alert.alert("Please enter the time");
        }
        else
        {           
        // Updating the details
            const details = {
                method:'POST' ,
                headers: {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(this.state)
            }    
                       
            fetch(this.state.emr_IP_Address + '/update_container_details',details)
            .then(() => Alert.alert('Details Updated'))
        //this.props.navigation.navigate("HistoryScreen",
                               // {emr_Id:this.state.emr_Id,
                                 //emr_IP_Address:this.state.emr_IP_Address
                                //})
            this.props.navigation.pop();
            this.props.navigation.pop();
//            this.props.navigation.navigate(" ",)


        }
        
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
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
                <View style={{ paddingLeft:25}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17 }}>B/L No. : </Text>
                        <Text style={{ fontSize:17, paddingLeft:47 }}>{this.state.bill_no}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <Text style={{ fontSize:17 }}>Container No. : </Text>
                        <Text style={{ fontSize:17 }}>{this.state.container_no}</Text>
                    </View>
                </View>
                <View style={{ paddingLeft:25 , marginBottom:10 }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17 }}>Importer Address: </Text>
                        <Text style={{ fontSize:17, width:175}}>{this.state.importer_address}</Text>  
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17}}>Location: </Text> 
                        <Text style={{ fontSize:17, width:300}}>{this.state.place_of_delivery}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17}}>Shipping Line: </Text> 
                        <Text style={{ fontSize:17, width:300}}>{this.state.shipping_line}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17}}>Equ size[Type]: </Text> 
                        <Text style={{ fontSize:17, width:300}}>{this.state.equip_size} {this.state.equip_type}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17}}>Destuff Date & Time: </Text> 
                        <Text style={{ fontSize:17, width:300}}>{this.state.destuff_date} {this.state.destuff_time}</Text>
                    </View>
                    
                </View>
                <View style={{ paddingLeft:25 }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:17}}>Mty Available Date: </Text> 
                        <DatePicker
                            style={{ width: 150 }}  date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date" format="YYYY-MM-DD" minDate="2020-01-01" maxDate="2022-12-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{ dateIcon: {position: 'absolute', right: 0, top: 4}, 
                                            dateInput: {height:40, marginRight: 36, backgroundColor: "rgba(0,0,0,0.1)",
                                            borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"} }}
                            onDateChange={date => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginTop:12}}>
                        <Text style={{ fontSize:17}}>Time: </Text> 
                        <DatePicker
                            style={{ width: 215 }}
                            date={this.state.time} //initial date from state
                            mode="time" //The enum of date, datetime and time
                            placeholder="select time"
                            showIcon={false}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    marginLeft: 101, height:40,
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"
                                },
                            }}
                            onDateChange={time => {
                                this.setState({ time: time });
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginTop:12}}>
                        <Text style={{ fontSize:17, paddingTop:5}}>Damage: </Text> 
                        <View style={{ height: 40, width: 150, marginLeft:75, 
                                       backgroundColor: "rgba(0,0,0,0.1)",
                                       paddingLeft:20 ,borderRadius: 45}}>
                            <Picker
                                selectedValue={this.state.service_Id}
                                style={{ flex:1 }}
                                onValueChange={(itemValue) => this.setState({service_Id:itemValue})}
                            >
                                {/* label indicates Damage type and value indicates service id */}
                                <Picker.Item label="Light Damage" value={25} />
                                <Picker.Item label="Heavy Damage" value={26} />
                                <Picker.Item label="Medium Damage" value={71} />
                                <Picker.Item label="Others" value={73} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginTop:12}}>
                            <Text style={{ fontSize:17}}>Sweep: </Text> 
                            <CheckBox
                                value={this.state.sweep_status}
                                style={{marginTop:-5, marginLeft:-7, marginRight:10,}}
                                onValueChange={this.check_box_sweep}
                            />
                            <Text style={{ fontSize:17}}>Washing: </Text> 
                            <CheckBox
                                value={this.state.washing_status}
                                style={{marginTop:-5, marginLeft:-7, marginRight:10}}
                                onValueChange={this.check_box_washing}
                            />
                            <Text style={{ fontSize:17}}>Cleaning: </Text> 
                            <CheckBox
                                value={this.state.cleaning_status}
                                style={{marginTop:-5, marginLeft:-7, marginRight:10}}
                                onValueChange={this.check_box_cleaning}
                            />
                    </View>
                </View>
                <TouchableOpacity style={styles.button1} 
                                      onPress={this.updateDetails}>
                        <Text style={{color: "#fff", fontSize:17, fontWeight: "700", textAlign:"center"}}
                        >Update</Text>
                </TouchableOpacity>
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
    button1: {
        marginVertical:30,
        marginHorizontal: 100,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        height: 45 , 
        alignItems: "center",
        justifyContent: "center"
    }
});