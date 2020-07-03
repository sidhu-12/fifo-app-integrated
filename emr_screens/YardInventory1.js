import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions,
    TextInput,
    Picker
} from "react-native";
import DatePicker from 'react-native-datepicker';
const { height } = Dimensions.get('window')
   
export default class YardInventory1 extends React.Component {

    state={
        yard_container_no:null,
        repair_container_no:null,
        date:null,
        time:null,
        // for Dropdown , here the array is hardcoded otherwise it will be empty list and the array is fetched from database in componentdidmount
        shipping_lines_array: [],
        selected_shipping_line:"",

        location_array:[],
        selected_location:"",

        equipment_type_array:[],
        selected_equip_type:"",

        equipment_size_array:[],
        selected_equip_size:"",

        emr_Id: this.props.route.params.emr_Id,
        emr_IP_Address: this.props.route.params.emr_IP_Address
    }

    ShippingLineData = async() =>{
        var res=this.state.emr_IP_Address + '/drop-down_shipping_line/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const shippingLine_list = await response.json();
        this.setState({shipping_lines_array:shippingLine_list})
    }

    LocationListData = async() =>{
        var res=this.state.emr_IP_Address + '/drop-down_location_list/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const location_list = await response.json();
        this.setState({location_array:location_list})
    }

    EquipmentTypeData = async() =>{
        var res=this.state.emr_IP_Address + '/drop-down_equipment_type_list/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const equipment_type_list = await response.json();
        this.setState({equipment_type_array:equipment_type_list})
    }

    EquipmentSizeData = async() =>{
        var res=this.state.emr_IP_Address + '/drop-down_equipment_size_list/' + this.props.route.params.emr_Id
        const response = await fetch(res) ;
        const equipment_size_list = await response.json();
        this.setState({equipment_size_array:equipment_size_list})
    }

    componentDidMount() {
        this.ShippingLineData()
        this.LocationListData()
        this.EquipmentTypeData()
        this.EquipmentSizeData()
        
    }

    move_to_yardinvetory2 = () => {
         // validating the input
        var num_pattern = /^[0-9]/;
          
        if(this.state.date == null) 
        {
            Alert.alert("Please enter the date");
        }
        else if(this.state.time == null)
        {
            Alert.alert("Please enter the time");
        }
        else if(this.state.yard_container_no == null || !num_pattern.test(this.state.yard_container_no))
        {   
            Alert.alert("Please enter the correct container Yard number");
        }
        else if(this.state.repair_container_no == null || !num_pattern.test(this.state.repair_container_no))
        {
            Alert.alert("Please enter the correct repair container number");
        }
        else
        {
            this.props.navigation.navigate("YardInventory2", this.state)
        }

    }

    load_shipping_line() {
        return this.state.shipping_lines_array.map((item ,i)=> (
            <Picker.Item key={i} label={item.SHIPPING_LINE_NAME} value={item.ID} />
         ))
    }

    load_location() {
        return this.state.location_array.map((item, i) => (
            <Picker.Item key={i} label={item.NAME} value={item.ID} />
         ))
    }

    load_equipment_size() {
        return this.state.equipment_size_array.map((item, i) => (
            <Picker.Item key={i} label={item.EQUIPMENT_SIZE} value={item.ID} />
         ))
    }

    load_equipment_type() {
        return this.state.equipment_type_array.map((item, i) => (
            <Picker.Item key={i} label={item.EQUIPMENT_TYPE} value={item.ID} />
         ))
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
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:8}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:35}}>Shipping Line: </Text>
                        <View style={{ height: 35, width: 160,
                                       backgroundColor: "rgba(0,0,0,0.1)",
                                       paddingLeft:10,
                                       borderRadius: 45,}}>
                            <Picker
                                selectedValue={this.state.selected_shipping_line}
                                style={{ flex:1 }}
                                onValueChange={(itemValue, itemIndex) => 
                                    this.setState({ selected_shipping_line: itemValue})}>
                                {/* Dynamically loads the dropdown values */}
                                {this.load_shipping_line()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:70}}>Location: </Text>
                        <View style={{ height: 35, width: 160, 
                                       backgroundColor: "rgba(0,0,0,0.1)",
                                       paddingLeft:10,
                                       borderRadius: 45}}>
                            <Picker
                                selectedValue={this.state.selected_location}
                                style={{ flex:1 }}
                                onValueChange={(itemValue, itemIndex) => 
                                    this.setState({ selected_location: itemValue})}>
                                {/* Dynamically loads the dropdown values */}
                                {this.load_location()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:17}}>Equipment Type: </Text>
                        <View style={{ height: 35, width: 160, 
                                       backgroundColor: "rgba(0,0,0,0.1)",
                                       paddingLeft:10,
                                       borderRadius: 45,}}>
                            <Picker
                                selectedValue={this.state.selected_equip_type}
                                style={{ flex:1 }}
                                onValueChange={(itemValue, itemIndex) => 
                                    this.setState({ selected_equip_type: itemValue})}>
                                {/* Dynamically loads the dropdown values */}
                                {this.load_equipment_type()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:21}}>Equipment Size: </Text>
                        <View style={{ height: 35, width: 160, 
                                       paddingLeft:50, 
                                       backgroundColor: "rgba(0,0,0,0.1)",
                                       borderRadius: 45,}}>
                            <Picker
                                selectedValue={this.state.selected_equip_size}
                                style={{ flex:1 }}
                                onValueChange={(itemValue, itemIndex) => 
                                    this.setState({ selected_equip_size: itemValue})}>
                                {/* Dynamically loads the dropdown values */}
                                {this.load_equipment_size()}
                            </Picker>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:41}}>Current Date: </Text>
                        <DatePicker
                            style={{ width: 150 }}  date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            Sformat="YYYY-MM-DD" minDate="2020-01-01" maxDate="2022-12-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder="YYYY-MM-DD"
                            customStyles={{ dateIcon: {position: 'absolute', right: 0, top: 4}, 
                                            dateInput: {height:35, marginRight: 36, backgroundColor: "rgba(0,0,0,0.1)",
                                            borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"} }}
                            onDateChange={date => { this.setState({ date }) }}
                        />       
                    </View>
                    <View style={{flexDirection:'row', marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:38}}>Current Time: </Text>
                        <DatePicker
                            style={{ width: 150 }}
                            date={this.state.time} //initial date from state
                            mode="time" //The enum of date, datetime and time
                            placeholder="HH-MM"
                            showIcon={false} confirmBtnText="Confirm" cancelBtnText="Cancel"
                            customStyles={{dateInput: {height:35,backgroundColor: "rgba(0,0,0,0.1)",
                            borderRadius: 45, borderColor:"rgba(0,0,0,0.1)"}}}
                            onDateChange={time => { this.setState({ time })}}
                        />        
                    </View>
                    <View style={{flexDirection:'row',marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16}}>No of Containers delivered to Yard: </Text>
                        <TextInput
                            style={styles.input2}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            onChangeText={yard_container_no => this.setState({ yard_container_no })}
                            value={this.state.yard_container_no}
                        ></TextInput>        
                    </View>
                    <View style={{flexDirection:'row', marginVertical:7}}>
                        <Text style={{color:"#010101", fontSize:16, marginRight:32}}>No of Containers under repair: </Text>
                        <TextInput
                            style={styles.input2}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            onChangeText={repair_container_no => this.setState({ repair_container_no })}
                            value={this.state.repair_container_no}
                        ></TextInput>        
                    </View>
                    <TouchableOpacity style={styles.button} 
                            onPress={this.move_to_yardinvetory2}>
                        <Text style={{color: "#fff", fontSize:18, fontWeight: "700", textAlign:"center"}}>More</Text>
                    </TouchableOpacity>
                                    
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
    input2: {
        height: 35,
        width:65,
        fontSize: 17,
        color: "#010101",
        borderRadius: 25,
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingHorizontal:15
    },
    container: {
        height:height-235,
        margin:10,
        borderColor:"#00c0e2",
        borderWidth:2,
        borderRadius:50, 
        padding:13,
    },
    button: {
        marginHorizontal: 70,
        backgroundColor: "#00c0e2",
        borderRadius:25,
        height: 45, 
        alignItems: "center",
        justifyContent: "center"
    }
});