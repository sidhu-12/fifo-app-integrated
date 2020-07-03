import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    Alert
} from "react-native";
import DatePicker from 'react-native-datepicker';
import axios from "axios";
const { height } = Dimensions.get('window')

var currentdate = new Date();       //getting current date

var tomorrowdate = new Date();  //getting next date
tomorrowdate.setDate(tomorrowdate.getDate() + 1);

var day_after_tomorrowdate = new Date();        //getting day after tomorrow date
day_after_tomorrowdate.setDate(day_after_tomorrowdate.getDate() + 2);
   
export default class YardInventory2 extends React.Component {

    state={
        current_date: null,
        unit_current_date:null,
        current_date_1:null,
        unit_current_date_1:null,
        current_date_2:null,
        unit_current_date_2:null,

        //received from yard inventory 1
        selected_shipping_line: null,
        selected_location:null,
        selected_equip_type:null,
        selected_equip_size:null,
        yard_container_no:null,
        repair_container_no:null,
        date:null,
        time:null,
        emr_Id: this.props.route.params.emr_Id,
        emr_IP_Address: this.props.route.params.emr_IP_Address
         
    }

    componentDidMount() {
        // extracting from YardInventory1

        this.setState({
            selected_shipping_line: this.props.route.params.selected_shipping_line,
            selected_location: this.props.route.params.selected_location,
            selected_equip_type: this.props.route.params.selected_equip_type,
            selected_equip_size: this.props.route.params.selected_equip_size,
            yard_container_no: this.props.route.params.yard_container_no,
            repair_container_no: this.props.route.params.repair_container_no,
            date: this.props.route.params.date,
            time: this.props.route.params.time,
            current_date:currentdate ,
            current_date_1: tomorrowdate,
            current_date_2: day_after_tomorrowdate
        })
    }

    submit = async () => {
        // validating the input
        var num_pattern = /^[0-9]/;
        if(this.state.current_date == null) 
        {
            Alert.alert("Please enter current date");
        }
        else if(this.state.unit_current_date == null || !num_pattern.test(this.state.unit_current_date))
        {   
            Alert.alert("Please enter correct unit for current date");
        }
        else if(this.state.current_date_1 == null)
        {
            Alert.alert("Please enter current date +1");
        }
        else if(this.state.unit_current_date_1 == null || !num_pattern.test(this.state.unit_current_date_1))
        {   
            Alert.alert("Please enter correct unit for current date +1");
        }
        else if(this.state.current_date_2 == null)
        {
            Alert.alert("Please enter the current date +2");
        }
        else if(this.state.unit_current_date_2 == null || !num_pattern.test(this.state.unit_current_date_2))
        {   
            Alert.alert("Please enter correct unit for current date +2");
        }
        else{
            var total_unit_containers = parseInt(this.state.unit_current_date) 
                                        + parseInt(this.state.unit_current_date_1) 
                                        + parseInt(this.state.unit_current_date_2) 
                                 
            if(total_unit_containers == this.state.repair_container_no)
            {
                const details = {
                    method:'POST' ,
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify(this.state)
                }    
                           
                const response = await fetch(this.state.emr_IP_Address + '/check_entry_in_yard_inventory_list',details)
                const res = await response.json() ;
                
                if(res[0].count == 0)
                {
                    //Inserting the YardInventory Details
                    const details1 = {
                        method:'POST' ,
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body:JSON.stringify(this.state)
                    }    
                               
                    fetch(this.state.emr_IP_Address + '/insert_yard_inventory',details1)
                    .then(() => Alert.alert('YardInventory Inserted')) 
                    
                    this.props.navigation.navigate('ShowYardInventory',
                                                {emr_Id:this.state.emr_Id,
                                                 emr_IP_Address:this.state.emr_IP_Address})
                }
                else{
                    //Updating the YardInventory Details
                    const details1 = {
                        method:'POST' ,
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body:JSON.stringify(this.state)
                    }    
                               
                    fetch(this.state.emr_IP_Address + '/update_yard_inventory',details1)
                    .then(() => Alert.alert('YardInventory Updated'))
    
                    this.props.navigation.navigate('ShowYardInventory',
                                                {emr_Id:this.state.emr_Id,
                                                 emr_IP_Address:this.state.emr_IP_Address
                                                })
                }
    
            }
            else
            {
                Alert.alert("Enter Correct Container Units" )
            }
        }

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
            
                <View style={styles.container}>
                    <View style={{flexDirection:'row',marginTop:15,marginBottom:12}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:77}}>Current Date: </Text>
                        <DatePicker
                            style={{ width: 166 }}  date={this.state.current_date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            Sformat="YYYY-MM-DD" minDate="2020-01-01" maxDate="2022-12-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder="YYYY-MM-DD"
                            showIcon={false}
                            customStyles={{ dateInput: {
                                                height:35, marginRight: 36, 
                                                backgroundColor: "rgba(0,0,0,0.1)",
                                                borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"} }}
                        />  
                    </View>
                    <View style={{flexDirection:'row',marginVertical:12}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:24}}>Unit for current date: </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            onChangeText={unit_current_date => this.setState({ unit_current_date })}
                            value={this.state.unit_current_date}
                        ></TextInput>        
                    </View>
                    <View style={{flexDirection:'row', marginVertical:12}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:57}}>Current date +1: </Text>
                        <DatePicker
                            style={{ width: 166 }}  date={this.state.current_date_1} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            Sformat="YYYY-MM-DD" minDate="2020-01-01" maxDate="2022-12-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder="YYYY-MM-DD"
                            showIcon={false}
                            customStyles={{ dateInput: {
                                                height:35, marginRight: 36, 
                                                backgroundColor: "rgba(0,0,0,0.1)",
                                                borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"} }}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginVertical:12}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:3}}>Unit for current date +1: </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            onChangeText={unit_current_date_1 => this.setState({ unit_current_date_1 })}
                            value={this.state.unit_current_date_1}
                        ></TextInput>        
                    </View>
                    <View style={{flexDirection:'row', marginVertical:12}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:57}}>Current date +2: </Text>
                        <DatePicker
                            style={{ width: 166 }}  date={this.state.current_date_2} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            Sformat="YYYY-MM-DD" minDate="2020-01-01" maxDate="2022-12-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder="YYYY-MM-DD"
                            showIcon={false}
                            customStyles={{ dateInput: {
                                                height:35,marginRight: 36, 
                                                backgroundColor: "rgba(0,0,0,0.1)",
                                                borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"} }}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginVertical:12}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:2}}>Unit for current date +2: </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            onChangeText={unit_current_date_2 => this.setState({ unit_current_date_2 })}
                            value={this.state.unit_current_date_2}
                        ></TextInput>        
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:20}}>
                        <TouchableOpacity style={styles.button} 
                                onPress={this.submit}>
                            <Text style={{color: "#fff", fontSize:18, fontWeight: "700", textAlign:"center"}}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} 
                                onPress={()=> this.props.navigation.navigate("YardInventory1",{emr_Id: this.state.emr_Id})}>
                            <Text style={{color: "#fff", fontSize:18, fontWeight: "700", textAlign:"center"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                                    
                </View>
            </ScrollView>
    );
        ;
    }
}


const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    input: {
        marginTop: -4,
        width:130,
        height: 35,
        fontSize: 17,
        color: "#010101",
        borderRadius: 25,
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingHorizontal:15
    },
    container: {
        height:height-250,
        margin:10,
        borderColor:"#00c0e2",
        borderWidth:2,
        borderRadius:50, 
        padding:13,
    },
    button: {
        width:130,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        height: 50, 
        alignItems: "center",
        justifyContent: "center"
    }
});